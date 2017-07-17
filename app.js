const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

//serve static files with express
app.use(express.static(path.join(__dirname, 'public')));

//setup middleware
app.use(bodyParser.urlencoded({	extended: true }));
app.use(bodyParser.json());

var numPlayers = 0;

io.on('connection', (socket) => {
	//attach a unique id to the socket
	socket.id = numPlayers;
	console.log("player has joined the game");
	numPlayers++;
	//send the game state via
	//socket.emit();
	socket.on('disconnect', () => {
		console.log('a user has disconnected from the game');
		numPlayers--;
	});

	socket.on('sendPoint', (data) => {
		//get the point from the client
		console.log(data);
	});
	console.log('their are now '+numPlayers+" players in the game");
});

server.listen(port, ()=> {
  console.log('Example app listening on port 3000!')
});

//every couple of seconds recalcuate 