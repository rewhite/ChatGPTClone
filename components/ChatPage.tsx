import InputBar from "./Right/InputBar";
import Logo from "./Right/Logo";
import VersionSelector from "./Right/VersionSelector";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-screen">
      <VersionSelector />
      <Logo />
      <InputBar />
    </div>
  );
}
