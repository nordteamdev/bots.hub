var scribe = require('scribe-js')(),
    app = require('express')(),
    server = require('http').Server(app),
	io = require('socket.io', { rememberTransport: false, transports: ['WebSocket', 'Flash Socket', 'AJAX long-polling'] })(server),
    requestify = require('requestify');
var schedule = require('node-schedule');
server.listen(2020);

io.sockets.on('connection', function (socket) {
	console.log('Connected ' + Object.keys(io.sockets.adapter.rooms).length + ' client');
	//getDrop();
	updateStatus();
    socket.on('disconnect', function () {
        console.log('Disconnected');
		updateStatus();
    });
	socket.on('update', function () {
        console.log('Update');
		updateStatus();
    });
	socket.on('newDrop', function(id) {
		newDrop(id);
	});
});
function updateStatus() {
    requestify.post('http://localhost/api/stats', {})
        .then(function (response) {
            data = JSON.parse(response.body);
            var online = Object.keys(io.sockets.adapter.rooms).length;
            var users = data.users;
			var win = data.win;
            var opened = data.drops;
            var data = [online, users, win, opened];
            io.sockets.emit('statbox', data);
            console.log(data);
        }, function (err) {

	});
}
function getDrop()
{
	requestify.post('http://localhost/api/get_drop', {})
	.then(function (response) {
            data = response.body;
			console.log('LOADDROP');
            io.sockets.emit('loaddrop', data);
        }, function (err) {
		console.log(err);
	});
}
function newDrop(did)
{
	requestify.post('http://localhost/api/drop', {id: did})
	.then(function (response) {
            data = response.body;
			console.log('NEWDROP' + data);
            io.sockets.emit('getDrop', data);
        }, function (err) {
		console.log(err);
	});
}