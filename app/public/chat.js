const socket = io.connect('http://localhost:3000');

const message = document.getElementById('message');
const handle = document.getElementById('handle');
const btn = document.getElementById('send');
const output = document.querySelector('.message-box');

btn.addEventListener('click', () =>{
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
})

socket.on('chat', (data) => {
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
})