const http = require("http");
const websocket = require("ws");
const server = http.createServer((req, res) => {
  res.end("finally connected!");
});

// const wss = new websocket.WebSocketServer({ server: server });
const wss = new websocket.WebSocketServer({ server });

wss.on("headers", (headers, req) => {
  console.log(headers);
});
/*
[
  'HTTP/1.1 101 Switching Protocols',
  'Upgrade: websocket',
  'Connection: Upgrade',
  'Sec-WebSocket-Accept: HgWnnw2jKQx6+t+h5NSXfp47BgU='
]
 */

wss.on("connection", (ws, req) => {
  ws.send("웹소켓 서버가 부릅니다");
  // 문자열로 바꾸기 전에는 Buffer 형태
  ws.on("message", (data) => console.log(data.toString()));
});

server.listen(8000);
