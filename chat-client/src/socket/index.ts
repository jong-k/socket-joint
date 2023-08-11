import { io } from "socket.io-client";
import { SERVER_URL } from "../enums";

export const socket = io(SERVER_URL);
