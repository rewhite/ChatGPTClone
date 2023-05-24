import { MessageType } from "./enums";

type Chat = {
    // userName: string;
    // profilePic: string;
    // chats: {
        chatId: number;
        version: text; //"gpt-4" : "gpt-3.5"
        messages: Array<Message>
    // }
}

type Message = {
    createdAt: number;
    sender : MessageType;
    text: string;
}

// name
// profile pic
// chats
// - chatId
// - createdAt
//  - messages
//  - createdAt
//  - type : Q or A
