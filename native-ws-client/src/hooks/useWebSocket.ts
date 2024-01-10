import { useState } from "react";
import type { ChatMessage, SocketState } from "../types";

const SERVER_URL = "ws://localhost:4004";
const TEMP_TOKEN = "1234567890";

export function useWebSocket(
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
) {
  // TODO: socket state 로 바꾸기
  const [socketState, setSocketState] = useState<SocketState | null>(null);
  const initWebSocket = (
    socketRef: React.MutableRefObject<WebSocket | null>,
  ) => {
    setSocketState("connecting");
    // 웹소켓 생성
    socketRef.current = new WebSocket(SERVER_URL);
    const socket = socketRef.current;
    if (socket) {
      socket.onerror = (err) => {
        console.error("클라: 웹소켓 에러 발생", err);
      };
      socket.onmessage = (e) => {
        const message = JSON.parse(e.data);
        if (
          message.type === "noti" &&
          message.content == "인증에 성공했습니다"
        ) {
          setSocketState("connected");
        }
        // if (message.type === "allMessages") {
        //   setChatMessages(data.data);
        // }
      };
      socket.onopen = () => {
        console.log("클라: 웹소켓 서버 연결을 시도합니다");
        socket.send(JSON.stringify({ type: "auth", data: TEMP_TOKEN }));

        // console.log("클라: 서버에 연결되었습니다");
        // socket.send(JSON.stringify({ type: "allMessages" }));
      };
      socket.onclose = () => {
        console.log("클라: 서버 연결이 끊겼습니다");
        closeWebSocket(socketRef);
      };
    }
  };

  const closeWebSocket = (
    socketRef: React.MutableRefObject<WebSocket | null>,
  ) => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
      setSocketState("closed");
      console.log("소켓 클로즈 테스트:", socketRef.current);
    }
  };

  return {
    socketState,
    initWebSocket,
    closeWebSocket,
  };
}
