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
io.on("connection", (socket) => {
    console.log(`서버: 소켓 ${socket.id} 가 연결되었습니다.`);
    socket.emit("msgFromServer", { data: "서버: 클라이언트 응답하라" });
    socket.on("msgFromClient", (data) => {
        console.log(data);
    });
});
