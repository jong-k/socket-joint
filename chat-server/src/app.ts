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

let activeUsers: string[] = [];

io.on("connection", (socket) => {
  // 현재 접속자 수
  io.emit("activeUserNum", activeUsers.length);

  socket.on("enter", (name: string) => {
    if (!activeUsers.includes(name)) {
      console.log(`${name} 님이 채팅을 시작했습니다.`);
      activeUsers.push(name);
    }
    io.emit("activeUsers", JSON.stringify(activeUsers));
  });

  socket.on("leave", (name: string) => {
    if (activeUsers.includes(name)) {
      console.log(`${name} 님이 채팅을 종료했습니다.`);
      const newActiveUsers = activeUsers.filter((user) => user !== name);
      activeUsers = newActiveUsers;
      io.emit("activeUsers", JSON.stringify(activeUsers));
    }
  });

  // socket.on("leave", (data: string) => {
  //   const leavedUser = JSON.parse(data) as ActiveUser;
  //   console.log(`${leavedUser.name} 님이 채팅을 종료하셨습니다`);
  //   const newActiveUsers = activeUsers.filter(
  //     (activeUser) => activeUser.id !== leavedUser.id,
  //   );
  //   activeUsers = newActiveUsers;
  //   io.emit("activeUsers", JSON.stringify(activeUsers));
  // });
});
