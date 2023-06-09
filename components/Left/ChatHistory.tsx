"use client";
import { FunctionComponent, use, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Chat } from "@/typings";
import { usePathname, useRouter } from "next/navigation";
import { useChatContext } from "@/app/Context/ChatContext";
import dayjs from "dayjs";
import relativetime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import { useSidebarContext } from "@/app/Context/SidebarContext";
dayjs.extend(duration);
dayjs.extend(relativetime);

export default function ChatHistory() {
  const db = useChatContext();

  const chatsArray = Object.keys(db.chats)
    .sort()
    .map((key) => db.chats[key])
    .reverse();

  return (
    //old scroll area
    // <ScrollArea className="flex-1 bg-red-300">
    //   <p className="px-4 pt-2 text-xs text-slate-400">Today</p>
    //   {chatsArray.map((chat) => (
    //     <Cell key={chat.chatId} chatId={chat.chatId} messages={chat.messages} />
    //   ))}
    // </ScrollArea>

    <div className="flex-1 overflow-y-hidden hover:overflow-y-auto">
      <p className="px-4 pt-2 text-xs text-slate-400">History</p>
      {chatsArray.map((chat) => (
        <Cell
          key={chat.chatId}
          chatId={chat.chatId}
          messages={chat.messages}
          version={chat.version}
        />
      ))}
    </div>
  );
}

const Cell: FunctionComponent<Chat> = ({ chatId, messages, version }) => {
  const router = useRouter();
  const pathname = usePathname();
  const sidebarContext = useSidebarContext();

  return (
    <Button
      variant="ghost"
      className={`flex gap-3 w-full py-6 text-sm justify-start ${
        pathname.includes(chatId.toString()) && "bg-gray-700"
      }`}
      onClick={() => {
        if (sidebarContext.isSidebarOpen) {
          sidebarContext.setIsSidebarOpen(false);
        }
        router.push(`/chat/${chatId}`);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-4 w-4 shrink-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
        />
      </svg>

      <p className="truncate">
        {messages.length >= 2 ? messages[messages.length - 2].text : "New Chat"}
      </p>
    </Button>

    //delete soon
    // <Button
    //   variant="ghost"
    //   className={`justify-start gap-3 py-6 text-sm bg-yellow-300 ${
    //     pathname.includes(chatId.toString()) && "bg-gray-700"
    //   }`}
    //   onClick={() => router.push(`/chat/${chatId}`)}
    // >
    //   <svg
    //     xmlns="http://www.w3.org/2000/svg"
    //     fill="none"
    //     viewBox="0 0 24 24"
    //     strokeWidth={1.5}
    //     stroke="currentColor"
    //     className="h-4 w-4"
    //   >
    //     <path
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //       d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
    //     />
    //   </svg>
    //   ttdfvsdfsdgsdfdsglmsdklgmsdklgmkldfgklmdflkmgkdflkglkdfglkmdfklgldfkg
    //   {/* {messages.length >= 2 ? messages[messages.length - 2].text : "New Chat"} */}
    // </Button>
  );
};
