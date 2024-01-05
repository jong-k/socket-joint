const SERVER_URL = "ws://localhost:4004";
export const socket = new WebSocket(SERVER_URL);
const TEMP_TOKEN = "1234567890";

export function useWebSocket() {
  const initWebSocket = () => {
    socket.onopen = () => {
      socket.send(`Bearer ${TEMP_TOKEN}`);
      console.log("클라: 서버에 연결되었습니다");
    };

    socket.onclose = () => {
      console.log("클라: 서버 연결이 끊겼습니다");
    };

    socket.onerror = (err) => {
      console.error(err);
    };

    socket.onmessage = (e) => {
      console.log(e.data);
    };
  };

  return {
    initWebSocket,
  };
}
