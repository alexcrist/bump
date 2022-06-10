export const initGame = (io) => {
  io.on('connection', (socket) => {
    socket.on('shot', (data) => {
      socket.broadcast.emit('other player shot', data);
    });
  });
};