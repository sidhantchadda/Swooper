const Player = require('./Player.js');
const Config = require('../config/Config.js');

class MainPlayer extends Player {

	constructor(resources, stage, socket) {
		super(resources, stage, socket);
		this.speed = Config.speed;
	}
	/*
		1 is up
		2 is down
		3 is right
		4 is left
	*/
	moveDown() {
		if(this.direction == 3 || this.direction == 4)
	     	this.setX(Math.round(this.getX() / Config.scale)*Config.scale);
	    if(this.direction == 1)
	      return;
	    this.direction = 2;
	    this.vy = this.speed;
	    this.vx = 0;
	    this.addPoint();
	}

	moveLeft() {
		if(this.direction == 1 || this.direction == 2)
		  this.setY(Math.round(this.getY() / Config.scale)*Config.scale);

		if(this.direction == 3)
		  return;
		this.direction = 4;
		this.vx = -this.speed;
		this.vy = 0;
		this.addPoint();
	}

	moveRight() {
		if(this.direction == 1 || this.direction == 2)
	      this.setY(Math.round(this.getY() / Config.scale)*Config.scale);
	    if(this.direction == 4)
	      return;
	    this.direction = 3;
	    this.vx = this.speed;
	    this.vy = 0;
	    this.addPoint();
	}

	moveUp() {
		if(this.direction == 3 || this.direction == 4)
	    	this.setX(Math.round(this.getX() / Config.scale)*Config.scale);
	    if(this.direction == 2)
	      return;
	    this.direction = 1;
	    this.vy = -this.speed;
	    this.vx = 0;
	    this.addPoint();
	}
}

module.exports = MainPlayer;