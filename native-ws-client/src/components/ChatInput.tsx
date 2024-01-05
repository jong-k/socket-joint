import { useState } from "react";
import type { Message } from "./ChatRoom";

interface ChatInputProps {
  currentNickname: string;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export default function ChatInput({
  currentNickname,
  setMessages,
}: ChatInputProps) {
  const [chatText, setChatText] = useState("");

  return (
    <div className="w-full h-[3rem] bg-slate-400 flex justify-center items-center">
      <input
        className="w-full h-full mx-5"
        type="text"
        value={chatText}
        onChange={(e) => setChatText(e.target.value)}
      />
      <button
        onClick={() => {
          const newMessage = {
            author: currentNickname,
            content: chatText,
          };
          setMessages((prev) => [...prev, newMessage]);
          setChatText("");
        }}
        type="button"
        className="w-[4rem] h-full bg-slate-50"
      >
        전송
      </button>
    </div>
  );
}
