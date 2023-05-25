import Sidebar from "@/components/Sidebar";
import "./globals.css";
import { Inter } from "next/font/google";
import { ChatContextProvider, useChatContext } from "./Context/ChatContext";
import TopMenuBar from "@/components/Right/TopMeneBar";
import { SidebarContextProvider } from "./Context/SidebarContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ChatGPT Clone",
  description: "Created and maintained by Hyun Bang",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChatContextProvider>
          <SidebarContextProvider>
            <TopMenuBar />
            <div className="relative md:flex">
              <Sidebar />
              <div className="w-full h-my-screen">{children}</div>
            </div>
          </SidebarContextProvider>
        </ChatContextProvider>
      </body>
    </html>
  );
}
