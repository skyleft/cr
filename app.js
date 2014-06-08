/**
 * Created by andy on 14-6-7.
 */
var fs = require('fs');
var ss = require('./simpleServer');
var si = require('socket.io');
var url = require('url');

var server = ss.simpleServer;
server.listen(8888);

si.listen(server).on('connection', function (socket) {
    socket.on('message', function (msg) {
        console.log('Message Received: ', msg);
        socket.broadcast.emit('message', msg);
    });
});