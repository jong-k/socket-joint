import type { Message } from "./ChatRoom";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className="text-white">
      <p>{message.author}</p>
      <p>{message.content}</p>
    </div>
  );
}
