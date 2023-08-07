import http from "http";
import express from "express";
import { Server } from "socket.io";
import { router } from "./router";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

app.use(router);

io.on("connection", (socket) => {
  console.log("enter");
  io.emit("enter", "Welcome everybody!");
  socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", message);
  });
  socket.on("disconnect", () => {
    console.log("exit");
  });
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
