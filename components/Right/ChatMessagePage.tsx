"use client";

import { MessageType } from "@/enums";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useRef } from "react";

export default function ChatMessagePage(props: {
  type: MessageType;
  text: string;
  isLoading?: boolean;
  blinking?: boolean;
}) {
  const spanRef = useRef<HTMLParagraphElement>(null);
  const cursorInterval = useRef<NodeJS.Timeout | null>(null);
  //cursor blink

  useEffect(() => {
    if (!props.isLoading && props.blinking) {
      cursorInterval.current = setInterval(() => {
        if (spanRef.current) {
          spanRef.current.classList.toggle("bg-slate-500");
        }
      }, 500); // Blink interval in milliseconds
    }

    return () => {
      if (cursorInterval.current) {
        clearInterval(cursorInterval.current); // Clean up the interval on component unmount
      }
    };
  }, [props.isLoading]);

  return (
    <div
      className={`flex w-full justify-center border-b border-slate-200 ${
        props.type === MessageType.USER ? "bg-white" : "bg-slate-100"
      }`}
    >
      <div className="flex w-full max-w-2xl gap-5 p-10">
        {/* profile image */}

        <Avatar className="h-10 w-10">
          {props.type === MessageType.USER ? (
            <>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </>
          ) : (
            <>
              <AvatarImage src="https://github.com/shadcn.pngs" alt="@shadcn" />
              <AvatarFallback className="bg-teal-300">AI</AvatarFallback>
            </>
          )}
        </Avatar>

        {/* text */}

        {!props.isLoading ? (
          <div className="">
            <p className="break-words leading-relaxed">
              {props.text ?? "This is a test messages"}
              <span
                ref={spanRef}
                className="bg-slate-500 ml-1"
                hidden={!props.blinking}
              >
                &nbsp;
              </span>
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-1.5 w-full">
            <Skeleton className="bg-slate-300 w-full h-[20px] rounded-full" />
            <Skeleton className="bg-slate-300 w-[80%] h-[20px] rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
}
