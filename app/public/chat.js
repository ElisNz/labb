const chatRoom = "main room";
const waitingRoom = "waiting room";
let usersInChat = 0;
var socket = io.connect('http://localhost:3000');

/* const btnSend = document.querySelector('#send-button');
const messageBox = document.querySelector('.message-box');

btnSend.addEventListener('click', () => {
  const input = document.querySelector('#message-input');
  socket.emit('chat message', input.value)
})

socket.on('chat message', message => {
  messageBox.innerHTML += `<div class="message">${message}</div>`
})

socket.on('server message', message => {
  messageBox.innerHTML += `<div class="message">${message}</div>`
}) */



var message = document.getElementById('message');
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.querySelector('.message-box');

btn.addEventListener('click', () =>{
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
})

socket.on('chat', (data) => {
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
})