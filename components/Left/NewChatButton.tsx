import { Button } from "../ui/button";

export default function NewChatButton() {
  return (
    <Button
      variant="outline"
      className="my-2 justify-start gap-3 py-6 text-sm font-normal"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="h-4 w-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
      <span className="text-sm">New Chat</span>
    </Button>
  );
}
