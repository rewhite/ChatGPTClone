import Sidebar from "@/components/Sidebar";
import "./globals.css";
import { Inter } from "next/font/google";
import { ChatContextProvider, useChatContext } from "./Context/ChatContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
          <div className="flex">
            <Sidebar />
            <div className="h-screen w-screen">{children}</div>
          </div>
        </ChatContextProvider>
      </body>
    </html>
  );
}
