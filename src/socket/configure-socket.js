import { Server } from 'socket.io';

class SocketManager {
  #io;
  #sockets = [];
  constructor(httpServer) {
    this.#io = new Server(httpServer);
    this.#configure();
  }

  #configure() {
    this.#io.on('connection', (socket) => this.configureSocket(socket));
  }

  configureSocket(socket) {
    let credencial = `socket-${socket.id}`;
    this.#sockets.push({ socket, credencial });
    socket.on('mensaje', (data) => {
      this.#io.emit('mensaje_recibido', {
        credencial,
        mensaje: data,
      });
    });
  }

  getSocketServer() {
    return this.io;
  }
  getSocket(credencial) {
    return this.#sockets.find((c) => c.credencial === credencial);
  }
}

export let socketManager = undefined;

export default function configureSocket(httpServer) {
  if (socketManager === undefined) {
    socketManager = new SocketManager(httpServer);
  }
  return socketManager;
}
