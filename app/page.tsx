"use client";
import ChatPage from "@/components/ChatPage";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const appHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty("--app-height", `${window.innerHeight}px`);
    };
    window.addEventListener("resize", appHeight);
    appHeight();
  }, []);

  return <ChatPage />;
}
