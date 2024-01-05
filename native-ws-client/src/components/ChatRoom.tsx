import { useState } from "react";
import ChatMessage from "./ChatMessage";

import ChatInput from "./ChatInput";

export interface Nickname {
  current: string;
  new: string;
}

export interface Message {
  author: string;
  content: string;
}

const SAMPLE_NICKNAME: Nickname = {
  current: "익명",
  new: "",
};

export default function ChatRoom() {
  const [nickname, setNickname] = useState<Nickname>(SAMPLE_NICKNAME);
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <div className="w-[30rem] h-[80rem] flex justify-center items-center flex-col">
      <h2 className="text-2xl font-bold text-white">웹소켓 채팅방</h2>
      {/* 닉네임 박스 */}
      <div className="w-full flex justify-center my-5 gap-5">
        <h2 className="text-white">닉네임: {nickname.current}</h2>
        <input
          type="text"
          onChange={(e) => setNickname({ ...nickname, new: e.target.value })}
          value={nickname.new}
          placeholder="사용할 닉네임을 입력..."
        />
        <button
          className="bg-green-500 px-3 text-white"
          type="button"
          onClick={() => {
            setNickname({ ...nickname, current: nickname.new, new: "" });
          }}
        >
          결정
        </button>
      </div>

      <div className="p-2 w-full h-full bg-slate-600">
        {messages.map((message, idx) => {
          return <ChatMessage key={idx} message={message} />;
        })}
      </div>
      <ChatInput currentNickname={nickname.current} setMessages={setMessages} />
    </div>
  );
}
