"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const router_1 = require("./router");
const ALLOWED_ORIGINS = ["http://localhost:3000"];
const app = (0, express_1.default)();
app.use(router_1.router);
const expressServer = app.listen(4000);
const io = new socket_io_1.Server(expressServer, {
    cors: {
        origin: ALLOWED_ORIGINS,
    },
});
let activeUsers = [];
// const messages: Message[] = [];
io.on("connection", (socket) => {
    // socket.emit("activeUserNum", activeUsers.length);
    // socket.emit("activeUsers", activeUsers);
    // socket.emit("messageFromServer", messages);
    socket.on("enter", (name) => {
        if (!activeUsers.includes(name)) {
            const newActiveUsers = [name, ...activeUsers];
            activeUsers = newActiveUsers;
        }
        io.emit("activeUsers", activeUsers);
        io.emit("activeUserNum", activeUsers.length);
    });
    // 현재 접속중인 유저 업데이트
    socket.on("queryActiveUsers", () => {
        io.emit("activeUsers", activeUsers);
    });
    socket.on("queryJoinedUser", (data) => {
        socket.emit("isJoined", activeUsers.includes(data));
    });
    // socket.on("leave", (name: string) => {
    //   if (activeUsers.includes(name)) {
    //     console.log(`${name} 님이 채팅을 종료했습니다.`);
    //     const newActiveUsers = activeUsers.filter(
    //       (username) => username !== name,
    //     );
    //     activeUsers = newActiveUsers;
    //     io.emit("activeUsers", activeUsers);
    //     io.emit("activeUserNum", activeUsers.length);
    //   }
    // });
    // socket.on("messageFromClient", (data) => {
    //   const messageObj = data;
    //   messages.push(messageObj);
    //   io.emit("messageFromServer", messages);
    // });
});
