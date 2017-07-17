var io = require('socket.io-client');
class Socket {
	constructor() {
		//set up the connection
		this.socket = io();
	}

	/*
		sends a point to the server to be validated
	*/
	sendPoint(data) {
		this.socket.emit('sendPoint', data);
	}

	/*
		disconnects from the server
	*/
	disconnect() {

	}
}

module.exports = Socket;