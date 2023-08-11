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
// const messages: Message[] = [];

io.on("connection", (socket) => {
  socket.emit("activeUsers", activeUsers);

  socket.on("enter", (name: string) => {
    if (!activeUsers.includes(name)) {
      const newActiveUsers = [...activeUsers, name];
      activeUsers = newActiveUsers;
    }
    io.emit("activeUsers", activeUsers);
  });

  socket.on("leave", (name: string) => {
    if (activeUsers.includes(name)) {
      const newActiveUsers = activeUsers.filter(
        (username) => username !== name,
      );
      activeUsers = newActiveUsers;
    }
    // sender 이외 전체에 event 발신
    socket.broadcast.emit("activeUsers", activeUsers);
  });

  // socket.on("messageFromClient", (data) => {
  //   const messageObj = data;
  //   messages.push(messageObj);
  //   io.emit("messageFromServer", messages);
  // });
});
