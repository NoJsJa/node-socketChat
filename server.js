var express = require('express');
var sio = require('socket.io');
var http = require('http');

var app = module.exports = express();
app.configure(function(){
    app.use(express.bodyParser());
    app.use(express.static('./public'));
});

var server = http.createServer(app);
server.listen(3000);

//创建socket.io监听
var io = sio.listen(server);

//设置连接监听器
io.sockets.on('connection',function(socket){
    console.log('someone connected!');
    socket.on('join', function(name){
        //设置socket的name属性
        socket.nickname = name;
        /*broadcast是一种标志信息，它改变了emit函数的行为*/
        socket.broadcast.emit('announcement', name+' joined the chat.');
    });

    socket.on('text', function (msg) {
       socket.broadcast.emit('text', socket.nickname, msg);
    });
});

