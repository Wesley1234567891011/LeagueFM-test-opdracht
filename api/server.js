const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

let aantal = 0;

io.on('connection', (socket) => {
  socket.emit('update', aantal);

  socket.on('hoger', () => {
    aantal++;
    io.emit('update', aantal);
  });

  socket.on('lager', () => {
    aantal--;
    io.emit('update', aantal);
  });
});

server.listen(3002, () => {
  console.log('Server draait op poort 3002');
});
