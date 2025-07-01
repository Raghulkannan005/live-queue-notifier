
import { io } from "socket.io-client";

let socket;

export const connectSocket = (token) => {
  if (!socket && token) {
    socket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
      auth: { token },
      transports: ["websocket"]
    });
  }
  return socket;
};

export const getSocket = () => socket;
