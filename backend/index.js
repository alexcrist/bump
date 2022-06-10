import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { initGame } from './game.js';

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (_, res) => res.send('hi'));

app.use(express.static('../frontend'));

initGame(io);

server.listen(PORT, () => {
  console.log('Express server running...');
}); 