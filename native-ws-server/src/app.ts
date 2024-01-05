import express from "express";
import { WebSocketServer } from "ws";

interface Message {
  author: string;
  content: string;
}

const app = express();

const expressServer = app.listen(4004); // server: "ws://localhost:4004"
const wss = new WebSocketServer({
  server: expressServer,
  clientTracking: true,
});

let authenticated = false;
const messages: Message[] = [];

wss.on("headers", (headers) => {
  console.log(headers);
});

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    if (authenticated) {
      const rawData = data.toString();
      const message = JSON.parse(rawData) as Message;
      messages.push(message);
      console.log("클라:" + rawData);
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
