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
import { usePathname } from "next/navigation";
import { useChatContext } from "@/app/Context/ChatContext";

export default function InputBar(props: {
  setTempUserText: Dispatch<SetStateAction<string>>;
}) {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const db = useChatContext();
  const pathName = usePathname();
  const currentChat = pathName.includes("chat")
    ? db.chats[pathName.split("/")[2]]
    : null;

  const buttonClicked = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const message: Message = {
      text: text,
      sender: MessageType.USER,
      createdAt: new Date().getTime(),
    };

    if (!currentChat) return;

    // Add Temp Message
    props.setTempUserText(text);

    // currentChat.messages.push(message);
    // const tempChats = {
    //   ...db.chats,
    //   [currentChat.chatId]: currentChat,
    // };

    // db.updateChats(tempChats);
    // console.log(db.chats);
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
          placeholder="Send a message."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button type="submit" disabled={!(text.trim().length > 0) || isLoading}>
          Send
        </Button>
      </form>

      <div>
        <p className="pt-2 text-center text-xs text-muted-foreground">
          ChatGPT may produce inaccurate information about people, places, or
          facts. ChatGPT May 12 Version
        </p>
      </div>
    </div>
  );
}
