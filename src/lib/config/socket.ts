import { io } from "socket.io-client";

const socketUrl = process.env.BACKEND_URL as string;
console.log(socketUrl);

const socket = io(socketUrl, {
  autoConnect: false,
});

export default socket;
