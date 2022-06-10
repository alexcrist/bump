import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (_, res) => res.send('hi'));

app.use(express.static('../frontend'));

io.on('connection', (socket) => {
  socket.on('shot', (data) => {
    socket.broadcast.emit('other player shot', data);
  });
});

server.listen(PORT, () => {
  console.log('Express server running...');
}); 