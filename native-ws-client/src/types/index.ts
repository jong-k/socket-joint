export interface Nickname {
  current: string;
  new: string;
}

type MessageTypes = "chat" | "allMessages";

export interface Message {
  type: MessageTypes;
}

export interface ChatMessageData extends Message {
  caller: string;
  content: string;
}
