"use client";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Chat, Message } from "@/typings";
import { MessageType } from "@/enums";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useChatContext } from "@/app/Context/ChatContext";
import useLLM from "usellm";
import Link from "next/link";

export default function InputBar(props: {
  setTempUserText: Dispatch<SetStateAction<string>>;
  setTempAIText: Dispatch<SetStateAction<string>>;
}) {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const db = useChatContext();
  const pathName = usePathname();
  const currentChat = pathName.includes("chat")
    ? db.chats[pathName.split("/")[2]]
    : null;

  const llm = useLLM({ serviceUrl: "https://usellm.org/api/llm" });

  const searchParams = useSearchParams();
  const isGPT4 = searchParams.get("v") === "gpt-4"; //gpt-3.5 gpt-4
  const router = useRouter();

  useEffect(() => {
    const text = searchParams.get("q");
    if (text) {
      // 검색 자동 실행
      requestAI(text);
    }

    router.replace(pathName);
  }, []);

  const buttonClicked = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Need to refactor this
    if (!currentChat) {
      // if it's a root page, make a chat session and redirect to the chat page with textparam
      const chat: Chat = {
        chatId: new Date().getTime(),
        version: isGPT4 ? "gpt-4" : "gpt-3.5",
        messages: [],
      };

      const tempChat = { ...db.chats };
      tempChat[chat.chatId] = chat;
      db.updateChats(tempChat);

      router.push(
        `/chat/${chat.chatId}/?v=${searchParams.get("v") ?? ""}&q=${text}`
      );

      return;
    } else {
      requestAI(text);
    }
  };

  const requestAI = async (text: string) => {
    props.setTempUserText(text);

    const userMessage: Message = {
      text: text,
      sender: MessageType.USER,
      createdAt: new Date().getTime(),
    };

    setText("");
    setIsLoading(true);

    try {
      await llm.chat({
        messages: [{ role: "user", content: text }],
        stream: true,
        onStream: ({ message, isFirst, isLast }) => {
          props.setTempAIText(message.content);

          if (isLast) {
            //update the value to the db
            const aiMessage: Message = {
              text: message.content,
              sender: MessageType.AI,
              createdAt: new Date().getTime(),
            };

            if (!currentChat) return;
            currentChat.messages.push(userMessage);
            currentChat.messages.push(aiMessage);
            const tempChats = {
              ...db.chats,
              [currentChat.chatId]: currentChat,
            };

            db.updateChats(tempChats);

            props.setTempUserText("");
            props.setTempAIText("");
            setIsLoading(false);
          }
        },
      });
    } catch (error) {
      console.error("Something went wrong!", error);
    }
  };

  return (
    <div className=" w-full items-center justify-center border-t p-4">
      {/* max-w-3xl  */}
      <form
        className="m-auto flex max-w-3xl space-x-2"
        onSubmit={buttonClicked}
      >
        <Input
          type="text"
          placeholder="Send a message..."
          value={text}
          className="text-base text-slate-800"
          onChange={(e) => setText(e.target.value)}
        />
        <Button type="submit" disabled={!(text.trim().length > 0) || isLoading}>
          Send
        </Button>
      </form>

      <div>
        <p className="pt-2 text-center text-xs text-muted-foreground ">
          This is a clone of the ChatGPT website, powered by the ChatGPT API and
          developed by{" "}
          <Link
            href={"https://www.linkedin.com/in/hyunbangxr/"}
            target="_blank"
            className="underline"
          >
            Hyun Bang.
          </Link>
        </p>
      </div>
    </div>
  );
}
