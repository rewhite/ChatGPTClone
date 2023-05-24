"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import {
  ArrowUpRightFromCircle,
  FileKey,
  Key,
  Linkedin,
  LogOut,
  Settings,
  Trash2,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useChatContext } from "@/app/Context/ChatContext";
import Link from "next/link";

export default function ProfileButton() {
  const db = useChatContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="my-2 flex w-full justify-start gap-3 border-transparent py-6 text-sm font-normal"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <span className="grow text-left text-sm">{db.username}</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[260px]">
        <DropdownMenuLabel className="text-slate-400 font-medium">
          ChatGPT Clone V0.8
        </DropdownMenuLabel>
        <DropdownMenuItem
          className="my-2"
          onClick={() => {
            window.open("https://chat.openai.com/", "_blank");
          }}
        >
          <ArrowUpRightFromCircle className="mr-2 h-4 w-4" />
          <span>Open Official ChatGPT</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="my-2"
          onClick={() => {
            window.open("https://www.linkedin.com/in/hyunbangxr/", "_blank");
          }}
        >
          <User className="mr-2 h-4 w-4" />
          <span>Open Developer&apos;s LinkedIn</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="my-2" onClick={() => {}}>
          <FileKey className="mr-2 h-4 w-4" />
          <span>Edit OpenAI Key</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="my-2">
          <Settings className="mr-2 h-4 w-4" />
          <span>Change Username</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem className="my-2 text-red-500 focus:text-red-500"> */}
        {/* <Trash2 className="mr-2 h-4 w-4" /> */}
        {/* <span>Clear conversations</span> */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start p-2 font-normal h-9 text-red-500 hover:text-red-500 "
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Clear Chat History</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete your chat history from your
                browser. (We do not store your chat in server).
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 text-white"
                onClick={() => {
                  window.open("/", "_self");
                  db.clearData();
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {/* </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
