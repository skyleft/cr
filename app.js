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
    var address = socket.handshake.address.address;
    socket.on('message', function (msg) {
        console.log('message in from: ', address,msg);
        socket.broadcast.emit('message', '['+address+']说: '+msg);
    });
});