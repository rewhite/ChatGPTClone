import { useEffect, useState } from "react";
import ChatHistory from "./Left/ChatHistory";
import NewChatButton from "./Left/NewChatButton";
import ProfileButton from "./Left/ProfileButton";
import { Separator } from "./ui/separator";

export default function Sidebar() {
  return (
    <div className="flex flex-col px-2 h-screen w-[275px] flex-none bg-gray-800 text-white">
      <NewChatButton />
      <ChatHistory />
      <Separator />
      <ProfileButton />
    </div>
  );
}
