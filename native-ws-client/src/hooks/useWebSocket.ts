import { useEffect } from "react";
import { socket } from "../socket";

export function useWebSocket() {
  useEffect(() => {
    socket.onopen = () => {
      console.log("server connected");
    };

    socket.onmessage = (e) => {
      console.log(e.data);
    };
  }, []);
}
