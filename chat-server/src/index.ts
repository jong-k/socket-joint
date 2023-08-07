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
  socket.emit("INIT", "Welcome!");

  socket.on("SEND_MESSAGE", (data) => {
    console.log(data);
    io.emit("RECEIVE_MESSAGE", data);
  });
});

// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
