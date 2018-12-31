var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/reciept', function(req, res){
    res.sendFile(__dirname + '/views/reciept.html');
});

app.get('/random-name-picker', function(req, res){
    res.sendFile(__dirname + '/views/randomname.html');
});






http.listen(process.env.PORT || 3000, function(){
    console.log('listening on '+process.env.PORT || 3000);
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
    });
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        //io.emit('chat message', msg);
        socket.broadcast.emit('chat message', msg);
    });
});

io.on('connection',function(socket){
   // io.emit('chat message', "user connected");
    io.emit('connection message', "user connected");
    socket.on('disconnect', function(){
        io.emit('chat message', socket.name + " disconnected");
       // io.emit('disconnection message', "user disconnected");
    });

    socket.on('connection response', function(user_name){  socket.name=user_name; io.emit('chat message', socket.name + " connected");});

   // socket.on('disconnection response', function(user_name){io.emit('chat message', user_name + " disconnected");});

});



io.on('connection', function(socket){
    socket.on('is typing', function(user_name){
        console.log('typing: ' + user_name);
        socket.broadcast.emit('is typing', user_name);
    });
});

io.on('connection', function(socket){
    socket.on('no longer typing', function(user_name){
        console.log('not typing: ' + user_name);
        socket.broadcast.emit('no longer typing', user_name);
    });
});


