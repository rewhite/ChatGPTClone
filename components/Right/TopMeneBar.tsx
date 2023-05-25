"use client";
import { useChatContext } from "@/app/Context/ChatContext";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Link, Menu, Plus } from "lucide-react";
import { useSidebarContext } from "@/app/Context/SidebarContext";

export default function TopMenuBar() {
  const sidebarContext = useSidebarContext();
  const db = useChatContext();
  const router = useRouter();

  const pathname = usePathname();
  const chat = pathname.includes("chat")
    ? db.chats[pathname.split("/")[2]]
    : null;

  return (
    <div className="px-2 z-10 bg-slate-800 w-full h-10 absolute top-0 md:hidden flex text-slate-200 items-center justify-center">
      <button
        className="p-1 rounded-md hover:bg-slate-500/50 "
        onClick={() => {
          sidebarContext.setIsSidebarOpen(!sidebarContext.isSidebarOpen);
        }}
      >
        <Menu className="w-5 h-5" />
      </button>
      <h1 className="text-sm truncate flex-1 text-center px-2">
        {chat && chat.messages.length >= 2
          ? chat.messages[chat.messages.length - 2].text
          : "New Chat"}
      </h1>
      <button
        className="p-1 rounded-md hover:bg-slate-500/50 "
        onClick={() => {
          router.replace("/");
        }}
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );
}
