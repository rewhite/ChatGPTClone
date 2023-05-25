import { CalendarDays, Link2, Linkedin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import Link from "next/link";

export default function Logo() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <h1 className="flex items-center gap-2 text-4xl font-semibold text-gray-200">
        ChatGPT
        <span className="rounded-md bg-rose-500 px-1.5 py-0.5 text-xs text-white">
          <HoverCard>
            <HoverCardTrigger className="uppercase">
              <button>Clone</button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 font-normal mt-1">
              <div className="flex justify-between space-x-4">
                <Avatar>
                  <AvatarImage src="/dev_avatar.jpg" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">ChatGPT Clone</h4>
                  <p className="text-sm">Created and maintained by @hyun.</p>
                  <div className="flex items-center pt-2">
                    <Link2 className="mr-2 h-4 w-4 opacity-70" />{" "}
                    <span className="text-xs text-muted-foreground underline">
                      <Link href="https://www.linkedin.com/in/hyunbangxr/">
                        Visit My LinkedIn
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </span>
      </h1>
    </div>
  );
}
