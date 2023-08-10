import { io } from "socket.io-client";
import { SERVER_URL } from "../enums";

export const socket = io(SERVER_URL);

// eslint-disable-next-line @typescript-eslint/ban-types
export const queryActiveUsers = (
  fn: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  socket.emit("queryActiveUsers");
  socket.on("activeUsers", (data: string[]) => {
    fn(data);
  });
};

export const queryJoinedUser = (
  name: string,
  fn: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  socket.emit("queryJoinedUser", name);
  socket.on("isJoined", (data: boolean) => {
    fn(data);
  });
};
