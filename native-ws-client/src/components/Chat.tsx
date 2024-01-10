import type { ChatMessage } from "../types";

interface ChatMessageProps {
  chatMessage: ChatMessage;
}

export default function Chat({ chatMessage }: ChatMessageProps) {
  return (
    <div className="text-white">
      <p>{chatMessage.author}</p>
      <p>{chatMessage.content}</p>
    </div>
  );
}
