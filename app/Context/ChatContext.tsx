"use client";
import { Chat, Message } from "@/typings";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ChatContextProviderProps {
  username: string;
  updateUsername: (username: string) => void;
  profilePic: string;
  updateProfilePic: (url: string) => void; //Dispatch<SetStateAction<string>>;
  chats: { [key: string]: Chat };
  updateChats: (chats: { [key: string]: Chat }) => void; //Dispatch<SetStateAction<{ [key: string]: Message[] }>>;
  clearData: () => void;
}

const ChatContext = createContext<ChatContextProviderProps>({
  username: "",
  updateUsername: (username: string) => {},
  profilePic: "",
  updateProfilePic: (url: string) => {},
  chats: {},
  updateChats: (chats: { [key: string]: Chat }) => {},
  clearData: () => {},
});

export const useChatContext = () => useContext(ChatContext);

export const ChatContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [chats, setChats] = useState<{ [key: string]: Chat }>({});

  //initial value
  useEffect(() => {
    const username = !!localStorage.getItem("username")
      ? localStorage.username
      : "Guest";
    const profilePic = !!localStorage.getItem("profilePic")
      ? localStorage.profilePic
      : "/Sample.jpg";
    const chats: { [key: string]: Chat } = JSON.parse(
      localStorage.getItem("chats") || "{}"
    );

    // initial set of username and profile pic
    if (!(username && profilePic && chats)) {
      localStorage.setItem("username", username);
      localStorage.setItem("profilePic", profilePic);
      localStorage.setItem("chats", JSON.stringify(chats));
    }

    if (username && profilePic && chats) {
      setUsername(username);
      setProfilePic(profilePic);
      setChats(chats);
    }
  }, []);

  const updateUsername = (username: string) => {
    setUsername(username);
    localStorage.setItem("username", username);
  };

  const updateProfilePic = (url: string) => {
    setProfilePic(url);
    localStorage.setItem("profilePic", url);
  };

  const updateChats = (chats: { [key: string]: Chat }) => {
    setChats(chats);
    localStorage.setItem("chats", JSON.stringify(chats));
  };

  const clearData = () => {
    setUsername("Guest");
    setProfilePic("");
    setChats({});
    localStorage.clear();
  };

  return (
    <ChatContext.Provider
      value={{
        username,
        updateUsername,
        profilePic,
        updateProfilePic,
        chats,
        updateChats,
        clearData,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
