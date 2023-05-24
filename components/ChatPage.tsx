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
