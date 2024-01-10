import { useRef, useState, useEffect } from "react";
import { useWebSocket } from "../hooks/useWebSocket";
import Chat from "./Chat";
import ChatInput from "./ChatInput";
import type { Nickname, ChatMessage } from "../types";

const SAMPLE_NICKNAME: Nickname = {
  current: "익명",
  new: "",
};

export default function ChatRoom() {
  const socketRef = useRef<WebSocket | null>(null);
  const [nickname, setNickname] = useState<Nickname>(SAMPLE_NICKNAME);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const { socketState, initWebSocket } = useWebSocket(setChatMessages);

  useEffect(() => {
    initWebSocket(socketRef);

    // getAllChatMessages({ type: "allMessages" });
    // initWebSocket 함수에서 onmessage 이벤트 핸들러를 등록했기 때문에 콘솔에 출력되는지만 확인해보자
  }, []);

  useEffect(() => {
    // 왜 두번 치냐 => strict mode 끄면 해결됨
    // console.log("소켓 라이프사이클 확인:", socketState, socketRef.current);
    if (socketState === "closed") {
      initWebSocket(socketRef);
    }
  }, [socketState]);

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
      {/* 채팅 메시지 박스 */}
      <div className="p-2 w-full h-full bg-slate-600">
        {chatMessages.map((chatMessage, idx) => {
          return <Chat key={idx} chatMessage={chatMessage} />;
        })}
      </div>

      <ChatInput
        socketRef={socketRef}
        currentNickname={nickname.current}
        setMessages={setChatMessages}
      />
    </div>
  );
}
