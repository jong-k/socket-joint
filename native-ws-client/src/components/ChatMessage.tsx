import type { ChatMessageData } from "../types";

interface ChatMessageProps {
  chatMessage: ChatMessageData;
}

export default function ChatMessage({ chatMessage }: ChatMessageProps) {
  return (
    <div className="text-white">
      <p>{chatMessage.caller}</p>
      <p>{chatMessage.content}</p>
    </div>
  );
}
