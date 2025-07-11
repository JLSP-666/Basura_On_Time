import { io } from "socket.io-client";

export const socket = io('https://express-latest-6gmf.onrender.com', {
  // Opcional: Si quieres reconexiones automáticas.
  reconnection: true,
  reconnectionAttempts: 5,
  transports: ["websocket"], 
});
