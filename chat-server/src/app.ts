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
const messages: Message[] = [];
let objectHovered = false;

io.on("connection", (socket) => {
  socket.on("queryActiveUsers", () => {
    socket.emit("activeUsers", activeUsers);
  });

  socket.on("enter", (name: string) => {
    socket.emit("messages", messages);
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

  socket.on("addMessage", (message: Message) => {
    messages.push(message);
    io.emit("messages", messages);
  });

  socket.on("justHovered", (data: boolean) => {
    objectHovered = data;
    io.emit("objectHovered", objectHovered);
  });
});
