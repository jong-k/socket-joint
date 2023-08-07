import express from "express";
import { Server } from "socket.io";

const app = express();
app.use(express.static("public"));

const expressServer = app.listen(3000);
const io = new Server(expressServer, {});

io.on("connection", (socket) => {
  // id 는 서버가 실행될 때마다 랜덤 문자열로 지정됨
  console.log(socket.id, "has connected");
  // socket.emit("msgFromServer", { data: "서버: 클라이언트 응답하라" });
  socket.emit("msgFromServer", "서버: 클라이언트 응답하라");
  socket.on("msgFromClient", (data) => {
    console.log(data);
  });
});