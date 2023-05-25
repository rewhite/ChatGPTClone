"use client"; // remove later
import ChatHistory from "./Left/ChatHistory";
import NewChatButton from "./Left/NewChatButton";
import ProfileButton from "./Left/ProfileButton";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import { useSidebarContext } from "@/app/Context/SidebarContext";

export default function Sidebar() {
  const sidebarContext = useSidebarContext();
  const sideBarRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  function OpenNav() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div
        className={`${
          !sidebarContext.isSidebarOpen
            ? "-translate-x-[100%]"
            : "-translate-x-[0%]"
        } md:translate-x-[0%] md:transition-none absolute z-20 md:flex md:static transition-transform duration-300 ease-in-out`}
      >
        <div
          ref={sideBarRef}
          className="flex flex-col px-2 w-[275px] h-screen flex-none bg-gray-800 text-white" //
        >
          {/* <Button onClick={OpenNav}>Test</Button> */}
          <NewChatButton />
          <ChatHistory />
          <Separator />
          <ProfileButton />
        </div>
      </div>
      {/* overlay */}
      <div
        className={`bg-black/30 fixed h-screen w-screen z-10 transition-opacity ease-in-out duration-300 transition- ${
          sidebarContext.isSidebarOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
        onClick={() => {
          sidebarContext.setIsSidebarOpen(false);
        }}
      ></div>
    </>
  );
}
