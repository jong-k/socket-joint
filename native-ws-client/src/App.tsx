import { useEffect } from "react";
import EchoRoom from "./EchoRoom";
import { socket } from "./socket";

export default function App() {
  useEffect(() => {
    socket.onopen = () => {
      console.log("server connected");
    };
  }, []);

  return (
    <div>
      <EchoRoom />
    </div>
  );
}
