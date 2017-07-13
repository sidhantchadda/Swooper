const Config = require('../config/Config.js');
const Player = require('./Player.js');
const MainPlayer = require('./MainPlayer.js');
/*
	client side Utility class that controls player array 
	and asset allocation for each player
*/
class Util {
	constructor(PIXI, stage) {
		this.PIXI = PIXI;
		this.stage = stage;
		this.resources = PIXI.loader.resources;
		this.players = new Array(Config.max_players);
		this.skins = [];
		this.color = [];
		this.colorAlpha = [];

		//store resources in appropriate arrays
		for(var i = 0; i<Config.max_players; i++) {
			this.skins[i] = this.resources["imgs/p"+i+".png"].texture;
			this.color[i] = this.resources["imgs/s"+i+".png"].texture;
			this.colorAlpha[i] = this.resources["imgs/a"+i+".png"].texture;
		}
		//generates the games grid
		this.buildGrid();
	}


	getUserFromId(id) {
		return this.players[id];
	}

	/* 
		generates a new player object with the correct image assests based on their id
	*/
	generatePlayer(x, y, id) {
		//pass in the parameters of the stuff
		players[id] = new Player(resources, stage);
		player.initPlayer(skins[id], color[id], colorAlpha[id], x, y, id);
	}

	/*
		generates a new Main player object and adds to the list of players
	*/
	generateMainPlayer(x, y, id) {
		this.mainPlayer = new MainPlayer(this.resources, this.stage);
		this.players[id] = this.mainPlayer;
		this.mainPlayer.initPlayer(this.skins[id], this.color[id], this.colorAlpha[id], x, y, id);

		//handle keyboard movements
		require('../config/keyboard.js') (this.mainPlayer);
	}
	
	//removes a player
	deletePlayer(player) {
		this.players[player.id] = null;
		player.kill();
	}

	getPlayers() {
		return this.players;
	}

	getMainPlayer() {
		return this.mainPlayer;
	}

	/* 
		builds the grid and allocates the resources associated to it
	*/
	buildGrid() {
		var grid = new Array(Config.board_length);
		var length = Config.board_length;
		grid = new Array(length);
		for(var i = 0; i<length; i++) {
			grid[i] = new Array(length);
		}

		var texture = this.resources["imgs/square.png"].texture;

		for(var x = 0; x<length; x++) {
			for(var y = 0; y<length; y++) {
				var square = new PIXI.Sprite(texture);
				square.x = x*Config.scale;
				square.y = y*Config.scale;
				square.id = null;
				square.tail = false;
				this.stage.addChild(square);
				grid[x][y] = square;
			}
		}
		this.grid = grid;
	}

	getGrid() {
		return this.grid;
	}
}

module.exports = Util;