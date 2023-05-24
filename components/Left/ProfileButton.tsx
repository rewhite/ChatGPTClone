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
  Edit,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfileButton() {
  const db = useChatContext();
  const [username, setUsername] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUsernameDialog, setShowUserameDialog] = useState(false);
  const [showOpenAIDialog, setShowOpenAIDialog] = useState(false);

  useEffect(() => {
    setUsername(db.username);
  }, []);

  useEffect(() => {
    setUsername(db.username);
  }, [db.username]);

  return (
    <>
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
          {/* <DropdownMenuItem
            className="my-2"
            onClick={() => {
              setShowOpenAIDialog(true);
            }}
          >
            <FileKey className="mr-2 h-4 w-4" />
            <span>Edit OpenAI Key</span>
          </DropdownMenuItem> */}
          <DropdownMenuItem
            className="my-2"
            onClick={() => {
              setShowUserameDialog(true);
            }}
          >
            <Edit className="mr-2 h-4 w-4" />
            <span>Change Username</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="my-2 text-red-500 focus:text-red-500"
            onClick={() => {
              setShowDeleteDialog(true);
            }}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Clear Conversations</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your chat history from your browser.
              (We never store your data in server).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => {
                setShowDeleteDialog(false);
                window.open("/", "_self");
                db.clearData();
              }}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showUsernameDialog} onOpenChange={setShowUserameDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Username</DialogTitle>
            <DialogDescription>
              Click save when you&apos;re done. All data is stored locally.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={username.trim().length === 0}
              onClick={() => {
                db.updateUsername(username);
                setShowUserameDialog(false);
              }}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showOpenAIDialog} onOpenChange={setShowOpenAIDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit OpenAI Key</DialogTitle>
            <DialogDescription>
              Enter your OpenAI API key. You can find your key{" "}
              <Link
                href="https://platform.openai.com/account/api-keys"
                target="_blank"
                className="underline"
              >
                here
              </Link>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="username" className="flex-none">
                API Key
              </Label>
              <Input
                id="username"
                type="password"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className=""
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={username.trim().length === 0}
              onClick={() => {
                db.updateUsername(username);
                setShowUserameDialog(false);
              }}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
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
