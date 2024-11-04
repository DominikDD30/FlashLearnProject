import { io, Socket } from 'socket.io-client';

// Adres serwera WebSocket
const SERVER_URL = 'https://memorygameserver-6f9w.onrender.com/'; // Upewnij się, że adres jest poprawny

const socket: Socket = io(SERVER_URL);

export default socket;
