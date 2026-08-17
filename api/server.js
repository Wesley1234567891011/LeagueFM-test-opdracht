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

let counter = 0;

io.on('connection', (socket) => {
  socket.emit('counter:update', counter);

  socket.on('counter:increment', () => {
    counter++;
    io.emit('counter:update', counter);
  });

  socket.on('counter:decrement', () => {
    counter--;
    io.emit('counter:update', counter);
  });
});

server.listen(3002, () => {
  console.log('Server gestart op port 3002');
});
