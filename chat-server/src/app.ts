import express from "express";
import { Server } from "socket.io";
import { router } from "./router";

const ALLOWED_ORIGINS = ["http://localhost:3000"];

const app = express();
app.use(router);

const expressServer = app.listen(4000);
const io = new Server(expressServer, {
  cors: {
    origin: ALLOWED_ORIGINS,
  },
});

io.on("connection", (socket) => {
  console.log(`서버: 소켓 ${socket.id} 가 연결되었습니다.`);

  socket.emit("msgFromServer", { data: "서버: 클라이언트 응답하라" });

  socket.on("msgFromClient", (data) => {
    console.log(data);
  });
});
