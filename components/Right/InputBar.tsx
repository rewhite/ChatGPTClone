import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function InputBar() {
  return (
    <div className=" w-full items-center justify-center border-t p-4">
      {/* max-w-3xl  */}
      <div className="m-auto flex max-w-3xl space-x-2 ">
        <Input
          type="text"
          placeholder="Send a message."
          //   value={message}
          //   onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit">Send</Button>
      </div>

      <div>
        <p className="pt-2 text-center text-xs text-muted-foreground">
          ChatGPT may produce inaccurate information about people, places, or
          facts. ChatGPT May 12 Version
        </p>
      </div>
    </div>
  );
}
