var express = require('express');
var socket = require('socket.io');
var app = express();
var server = app.listen(4000, function(){
    console.log('listening to requests on port 4000')
});

app.use(express.static('public')); //to serve the index.html(in the public folder) to the browser by the server

//need to install socket.io in both client and server side, then only we establish a connection and listen to it

//Socket setup

var io = socket(server); //invoke the function, and parameter is what server we want to work with socket.io
// now socket.io(server) will be waiting for a client to setup a connection with the server and set up a websocket between th e two.

io.on('connection', function(socket){
    console.log('made socket connection', socket.id);
    //listening for ('chat') from particular instance of socket sending the message from client to server .and pass the data into the callback function.
    socket.on('chat', function(data){   
        console.log(data, "listening data on server")
        //now send out the message to all the sockets thats connected to the server
        io.sockets.emit('chat', data) //refer to all the sockets connected to the server

    });

    socket.on('typing', function(data){
        console.log('listening for typing message on server', socket.id)
        socket.broadcast.emit('typing', data); //will emit the typing event to all client except sending client.
    });

});
//once a connection is made from client, callback func will be fired.
//socket parameter is the instance of socket for a particular socket connection between client and server 
