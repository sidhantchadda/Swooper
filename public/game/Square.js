const Config = require('../config/config.js');

class Square {
	/*
		initialize an empty square with a static location	
	*/
	constructor(x, y, Sprite) {
		//const variables do not change
		this.x = x;
		this.y = y;

		//the sprite variable
		this.Sprite = Sprite;

		//a pointer to the player who owns this square
		this.owner = null;

		//a pointer to the player who is trying to capture this square
		this.capturer = null;

		// if a player is building but has not finished constructing this square
		this.tail = false;
	}

	/*
		when a player hovers a square update its properities
	*/
	onHover(player) {
		if(!this.isOwner(player)) {
			this.tail = true;
			this.capturer = player;
			this.Sprite.texture = player.colorAlpha;
		}
	}

	/*
		if this player is the owner of the square.
	*/
	isOwner(player) {
		if(player == this.owner)
			return true;
		return false;
	}

	/*
		removes the owner of a square
	*/
	removeOwner() {
		this.Sprite.texture = Config.normal;
		this.owner = null;
	}

	/*
		change the owner of the sprite.
	*/
	changeOwner(player) {
		this.Sprite.texture = player.color;
		this.owner = player;
		this.tail = false;
	}

	getX() {
		return this.x;
	}

	getY() {
		return this.y;
	}
}

module.exports = Square;