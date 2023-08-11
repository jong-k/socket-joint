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
    socket.emit("activeUsers", activeUsers);
    socket.on("enter", (name) => {
        if (!activeUsers.includes(name)) {
            const newActiveUsers = [...activeUsers, name];
            activeUsers = newActiveUsers;
        }
        io.emit("activeUsers", activeUsers);
    });
    socket.on("leave", (name) => {
        if (activeUsers.includes(name)) {
            const newActiveUsers = activeUsers.filter((username) => username !== name);
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
