"use client";
import { usePathname, useSearchParams } from "next/navigation";
import InputBar from "./Right/InputBar";
import Logo from "./Right/Logo";
import VersionSelector from "./Right/VersionSelector";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { use, useEffect, useRef, useState } from "react";
import { Chat, Message } from "@/typings";
import ChatMessagePage from "./Right/ChatMessagePage";
import { MessageType } from "@/enums";
import { useChatContext } from "@/app/Context/ChatContext";
import path from "path";

export default function ChatPage() {
  const db = useChatContext();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [tempUserText, setTempUserText] = useState("");
  const [tempAIText, setTempAIText] = useState("");
  //새로운 도전
  const [oldScrollTop, setOldScrollTop] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);

  const pathname = usePathname();
  const chat = pathname.includes("chat")
    ? db.chats[pathname.split("/")[2]]
    : null;

  function scrollToBottom() {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }
  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    if (autoScroll) {
      scrollToBottom();
    }
  }, [tempAIText]);

  useEffect(() => {
    if (tempUserText.length > 0) {
      scrollToBottom();
    }
  }, [tempUserText]);

  function scrollEvent() {
    if (chatContainerRef.current) {
      setOldScrollTop(chatContainerRef.current.scrollTop);

      const isScrollingUp =
        oldScrollTop - chatContainerRef.current.scrollTop > 0;

      if (isScrollingUp) {
        setAutoScroll(false);
      }

      if (
        chatContainerRef.current.scrollHeight -
          chatContainerRef.current.scrollTop ===
        chatContainerRef.current.clientHeight
      ) {
        setAutoScroll(true);
      }
    }
  }

  return (
    <div className="flex flex-col h-screen">
      {!!chat &&
      chat.messages.length + tempUserText.length + tempAIText.length > 0 ? (
        <div
          className="flex flex-col h-full w-full overflow-y-scroll"
          ref={chatContainerRef}
          onScroll={scrollEvent}
        >
          <div className="flex flex-none bg-slate-100 bo h-11 border-b justify-center items-center gap-1">
            {chat.version === "gpt-4" ? (
              <>
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`h-4 w-4 fill-slate-500`}
                >
                  <path
                    fillRule="evenodd"
                    d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
                    clipRule="evenodd"
                  />
                </svg>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`h-4 w-4 fill-slate-500`}
                >
                  <path
                    fillRule="evenodd"
                    d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
                    clipRule="evenodd"
                  />
                </svg>
              </>
            )}
            <p className="text-center text-sm text-slate-500">
              Model: {chat.version == "gpt-4" ? "GPT-4" : "Default (GPT-3.5)"}
            </p>
          </div>
          {chat.messages.map((message) => (
            <ChatMessagePage
              key={message.createdAt}
              type={message.sender}
              text={message.text}
            />
          ))}
          {tempUserText.length > 0 && (
            <>
              <ChatMessagePage type={MessageType.USER} text={tempUserText} />
              <ChatMessagePage
                type={MessageType.AI}
                text={tempAIText}
                isLoading={tempAIText.length <= 0}
                blinking={true}
              />
            </>
          )}
        </div>
      ) : (
        <>
          <VersionSelector /> <Logo />
        </>
      )}
      <InputBar
        setTempUserText={setTempUserText}
        setTempAIText={setTempAIText}
      />
    </div>
  );
}
