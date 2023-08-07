const http = require("http");
const websocket = require("ws");
const server = http.createServer((req, res) => {
  res.end("finally connected!");
});

const wss = new websocket.WebSocketServer({ server });

wss.on("connection", (ws, req) => {
  ws.send("웹소켓 서버가 부릅니다");
  ws.on("message", (data) => console.log(data.toString()));
});

server.listen(8000);
