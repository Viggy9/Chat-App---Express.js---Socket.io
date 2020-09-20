//Make connection 

var socket = io.connect('http://localhost:4000') //to make connection from client to server

//Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

//Emit events
//name of the message is chat
btn.addEventListener('click', function () {
    socket.emit('chat', { //that particular socket emits the chat message, it is listened by the server and emitted back to all clients connected to the server through socket.
        message: message.value,
        handle: handle.value
    });
    console.log(message, "message")
    message.value = ""; //emit the message down the websocket to the server.
});

message.addEventListener('keypress', function () {
    console.log('key press event')
    socket.emit('typing', handle.value);
});

//Listen for events

socket.on('chat', function (data) {
    feedback.innerHTML = '';

    console.log('listening on client', data)
    output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
});

socket.on('typing', function (data) {
    console.log(data, 'listening on all other clients')
    feedback.innerHTML = '<p><em>' + data + ' is typing a message..</em></p>';
});