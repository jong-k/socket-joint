import { useState } from "react";
import type { ChatMessage } from "../types";

interface ChatInputProps {
  socketRef: React.MutableRefObject<WebSocket | null>;
  currentNickname: string;
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

export default function ChatInput({
  socketRef,
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
          const socket = socketRef.current;
          if (socket === null) return;
          const newMessage = {
            type: "chat",
            author: currentNickname,
            content: chatText,
          } as ChatMessage;
          // 서버로 메시지 전송
          socket.send(JSON.stringify(newMessage));
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
