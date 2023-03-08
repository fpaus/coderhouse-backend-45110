import { Server } from 'socket.io';
const connections = [];
export default function configureSocket(httpServer) {
  const io = new Server(httpServer);
  io.on('connection', (socket) => {
    let credencial = `socket-${socket.id}`;
    connections.push({ socket, credencial });
    socket.on('mensaje', (data) => {
      console.log({
        credencial,
        mensaje: data,
      });
      io.emit('mensaje_recibido', {
        credencial,
        mensaje: data,
      });
    });
  });
}
