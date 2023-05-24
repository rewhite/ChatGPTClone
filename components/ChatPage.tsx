"use client";
import { usePathname } from "next/navigation";
import InputBar from "./Right/InputBar";
import Logo from "./Right/Logo";
import VersionSelector from "./Right/VersionSelector";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { use, useEffect, useState } from "react";
import { Chat, Message } from "@/typings";
import ChatMessagePage from "./Right/ChatMessagePage";
import { MessageType } from "@/enums";
import { useChatContext } from "@/app/Context/ChatContext";
import path from "path";

export default function ChatPage() {
  const db = useChatContext();

  const [tempUserText, setTempUserText] = useState("");
  const [tempAIText, setTempAIText] = useState("");

  const pathname = usePathname();
  const chat = pathname.includes("chat")
    ? db.chats[pathname.split("/")[2]]
    : null;

  return (
    <div className="flex flex-col h-screen">
      {!!chat &&
      chat.messages.length + tempUserText.length + tempAIText.length > 0 ? (
        <div className="flex flex-col h-full w-full overflow-y-scroll">
          {chat.messages.map((message) => (
            <ChatMessagePage
              key={message.createdAt}
              type={message.sender}
              text={message.text}
            />
          ))}
          {tempUserText.length > 0 && (
            <ChatMessagePage type={MessageType.USER} text={tempUserText} />
          )}
          {tempAIText.length > 0 && (
            <ChatMessagePage type={MessageType.AI} text={tempAIText} />
          )}
        </div>
      ) : (
        <>
          <VersionSelector /> <Logo />
        </>
      )}
      <InputBar setTempUserText={setTempUserText} />
    </div>
  );
}
