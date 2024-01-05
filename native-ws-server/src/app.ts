import express from "express";
import WebSocket, { WebSocketServer } from "ws";

type MessageTypes = "chat" | "allMessages";

interface Message {
  type: MessageTypes;
}

interface ChatMessage extends Message {
  caller: string;
  content: string;
}

const app = express();

const expressServer = app.listen(4004); // server: "ws://localhost:4004"
const wss = new WebSocketServer({
  server: expressServer,
  clientTracking: true,
});

let authenticated = false;
const chatMessages: ChatMessage[] = [
  {
    type: "chat",
    caller: "손흥민",
    content: "1골",
  },
  {
    type: "chat",
    caller: "황희찬",
    content: "2골",
  },
  {
    type: "chat",
    caller: "이강인",
    content: "3골",
  },
];

wss.on("headers", (headers) => {
  console.log(headers);
});

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    if (authenticated) {
      const rawData = data.toString();
      const message = JSON.parse(rawData) as Message;

      if (message.type === "chat") {
        chatMessages.push(message as ChatMessage);
        console.log("클라:" + rawData);
        // 자기 자신을 제외하고 보내기
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(rawData);
          }
        });
      }
      if (message.type === "allMessages") {
        const data = {
          type: "allMessages",
          data: chatMessages,
        };
        ws.send(JSON.stringify(data));
      }
    } else {
      const token = data.toString().split(" ")[1];
      // 토큰이 맞지 않으면 연결 끊기
      if (token !== "1234567890") {
        ws.send("서버: 인증에 실패하여 연결을 종료합니다");
        console.log("서버: 인증에 실패하여 연결을 종료합니다");
        ws.close();
      }
      authenticated = true;
      ws.send("서버: 인증에 성공했습니다");
      console.log("서버: 인증에 성공했습니다");
    }
  });

  ws.on("error", (err) => {
    console.error(err);
  });

  // 문자열로 바꾸기 전에는 Buffer 형태
  // ws.on("message", (data) => console.log(data.toString()));
});
