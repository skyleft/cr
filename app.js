/**
 * Created by andy on 14-6-7.
 */

var ss = require('./simpleServer');
var si = require('socket.io');

var server = ss.simpleServer;
server.listen(8888);

si.listen(server).on('connection', function (socket) {
    var address = socket.handshake.address.address;
    socket.on('message', function (msg) {
        console.log('message in from: ', msg);
        socket.broadcast.emit('message', msg);
    });
});