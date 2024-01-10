export interface Nickname {
  current: string;
  new: string;
}

export type SocketState = "closed" | "connecting" | "connected";
