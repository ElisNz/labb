const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socket = require('socket.io');


app.use(express.static('public'));
const port = 3000;

server.listen(port, () => {
  console.log('http server listening on port: ' + port)
});

var io = socket(server, {
  cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
      transports: ['websocket', 'polling'],
  },
  allowEIO3: true
});

io.on('connection', (socket) => {

  console.log('Made socket connection', socket.id);

  socket.on('chat', (data) => {

      io.sockets.emit('chat', data);
      
      console.log(data);
  })
});