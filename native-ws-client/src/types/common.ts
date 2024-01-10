// 서버와 공통으로 사용할 타입 정의
type MessageTypes = "auth" | "chat" | "allMessages" | "noti";

export interface Message {
  type: MessageTypes;
}

export interface AuthMessage extends Message {
  token: string;
}

export interface ChatMessage extends Message {
  author: string;
  content: string;
}

export interface NotiMessage extends Message {
  content: string;
}
