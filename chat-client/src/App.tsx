import { useEffect } from "react";
import { io } from "socket.io-client";
import { SERVER_URL } from "./enums";

export default function App() {
  useEffect(() => {
    const socket = io(SERVER_URL);

    socket.on("connect", () => {
      console.log(`클라이언트: 소켓 ${socket.id} 가 연결되었습니다.`);
    });

    socket.emit("msgFromClient", { data: "클라이언트: 서버 응답하라" });

    socket.on("msgFromServer", (data) => {
      console.log(data);
    });
  }, []);

  return (
    <div>
      <h2>Hello from App</h2>
    </div>
  );
}
