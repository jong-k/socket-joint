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
  socket.on("enter", ({ name }: { name: string }) => {
    console.log(`${name} 님이 접속하셨습니다.`);
    activeUsers.push(name);
    activeUsers = [...new Set(activeUsers)];
    io.emit("activeUsers", activeUsers);
  });
});
