const chatRoom = "main room";
const waitingRoom = "waiting room";
let usersInChat = 0;
var socket = io.connect('http://localhost:3000');

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