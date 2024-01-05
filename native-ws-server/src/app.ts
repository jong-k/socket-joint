import express from "express";
import { WebSocketServer } from "ws";

const app = express();

const expressServer = app.listen(4004); // server: "ws://localhost:4004"
const wss = new WebSocketServer({
  server: expressServer,
  clientTracking: true,
});

wss.on("headers", (headers, req) => {
  console.log(headers);
});

wss.on("connection", (ws) => {
  ws.on("error", (err) => {
    console.error(err);
  });

  ws.send("Hello from server!");
  // 문자열로 바꾸기 전에는 Buffer 형태
  // ws.on("message", (data) => console.log(data.toString()));
});
