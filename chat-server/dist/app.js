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
io.on("connection", (socket) => {
    // 현재 접속자 수
    io.emit("activeUserNum", activeUsers.length);
    socket.on("enter", (name) => {
        if (!activeUsers.includes(name)) {
            console.log(`${name} 님이 채팅을 시작했습니다.`);
            activeUsers.push(name);
        }
        io.emit("activeUsers", JSON.stringify(activeUsers));
    });
    socket.on("leave", (name) => {
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
