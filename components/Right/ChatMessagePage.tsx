import { MessageType } from "@/enums";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function ChatMessagePage(props: {
  type: MessageType;
  text: string;
}) {
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
        <div className="">
          <p className="break-words leading-relaxed">
            {props.text ?? "This is a test messages"}
          </p>
        </div>
      </div>
    </div>
  );
}
