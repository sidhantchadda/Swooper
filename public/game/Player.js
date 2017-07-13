const Config = require('../config/config.js');

class Player {
	constructor(resources, stage) {
		this.resources = resources;
		this.stage = stage;
		
		//velocity properities
		this.vx = 0;
		this.vy = 0;

		//1 is up 2 is down 3 is left 4 is right
		this.direction = 0;

		//a pointer to the most recent square visited
		this.recent = null;

		//array of points that the player has reached when they are not safe
		this.points = [];

		//variable that determines whether the player is on their color
		//starts off true
		this.safe = true;
		
	}

	/*
		moves the player every tick
		delta time represents the amount of time that has passed since the last tick
		used to keep players synchrounous
	*/
	move(deltaTime) {
		this.Sprite.x += this.vx*deltaTime;
		this.Sprite.y += this.vy*deltaTime;
	}


	/*
		initializes and renders the player in the game world
	*/
	initPlayer(skin, color, colorAlpha, x, y, id) {
		this.id = id;
		this.color = color;
		this.colorAlpha = colorAlpha;
		//render sprite
		this.Sprite = new PIXI.Sprite(skin);

		//location settings
		this.Sprite.x = x;
		this.Sprite.y = y;

		this.stage.addChild(this.Sprite);
	}

	/*
		gets the x y coordinates in the grid that most 
		closely matches the players position
	*/
	getPoint() {
		var j;
		var i;

		if(this.direction == 4 || this.direction == 2) {
			j = Math.ceil((this.getX() / Config.scale));
			i = Math.floor((this.getY() / Config.scale));
		}
		else {
			j = Math.floor((this.getX() / Config.scale));
			i = Math.ceil((this.getY() / Config.scale));	
		}
		return {x: i, y: j};
	}

	getX() {
		return this.Sprite.x;
	}

	getY() {
		return this.Sprite.y;
	}

	setX(x) {
		this.Sprite.x = x;
	}

	setY(y) {
		this.Sprite.y = y;
	}


	/*
		remove all squares from the grid asssociated with this player
	*/
	kill(grid) {
		for(var i =0; i<Config.board_length; i++) {
			for(var j= 0; j<Config.board_length; j++) {
				var square = board[j][i];
				if(square.id === this.id) {
					//delete the square
					square.id = null;

					//change the texture of the square back to normal
					square.texture = resources[Config.images.normal].texture;
				}
			}
		}
	}
	/*
		adds a point to the array of points needed to build a shape
	*/
	addPoint() {
		this.points.push(this.getPoint());
	}

	/*
		build graph is a deterministic algorithim that builds the structure 
		the player has captured
	*/
	buildGraph(grid) {
		var points = this.points;

		var tail = [];
		//define the border
		for(var i = 0; i<points.length-1; i++) {
			var point1 = points[i];
			var point2 = points[i+1];
			if(point1.x === point2.x) {
				var smally = (point1.y < point2.y) ? point1.y: point2.y;
				var bigy = (smally === point1.y) ? point2.y: point1.y;

				for(var y = smally; y <= bigy; y++) {
					var square = grid[y][point1.x];
					square.texture = this.color;
					square.id = this.id;
					square.tail = false;
					tail.push({x: point1.x, y: y});
				}
			}
			else {
				var smallx = (point1.x < point2.x) ? point1.x: point2.x;
				var bigx = (smallx === point1.x) ? point2.x: point1.x;
				for(var x = smallx; x<=bigx; x++) {
					var square = grid[point1.y][x];
					square.texture = this.color;
					square.id = this.id;
					square.tail = false;
					tail.push({x: x, y: point1.y});
				}
			}
		}

			
		var been = new Array(Config.board_length);
		for(var i = 0; i<Config.board_length; i++) {
			been[i] = new Array(Config.board_length);
		}

		for(var i = 0; i<tail.length; i++) {
			//call floodFill for every point around the tail			
			var point = tail[i];
			this._floodFill(point.x+1, point.y, been, grid);
			this._floodFill(point.x-1, point.y, been, grid);
			this._floodFill(point.x, point.y+1, been, grid);
			this._floodFill(point.x, point.y-1, been, grid);
		}
		this.points = [];
		//we now have an array of lines
	}

	/*
		flood fill algorithim
	*/
	_floodFill(x, y, been, grid) {
		var stack = [];
		var arr = [];
		//if we are in bounds and we haven't visited this space before 
		//and we are already on our square

		if(!this._outOfBounds(x, y) && (!been[y][x]) && (grid[y][x].id !== this.id)) {
			//push thisn point onto the stack
			stack.push({x: x, y: y});

			var bounded = true;

			while(stack.length > 0) {
				var point = stack.pop();
				if(this._outOfBounds(point.x, point.y)) {
					bounded = false;
					continue;
				}
				
				if(been[point.y][point.x] || grid[point.y][point.x].id === this.id)
					continue;

				been[point.y][point.x] = true;
				if(bounded)
					arr.push(point);
				stack.push({x: point.x+1, y:point.y});
				stack.push({x: point.x-1, y:point.y});
				stack.push({x: point.x, y:point.y+1});
				stack.push({x: point.x, y:point.y-1});
			}

			if(bounded) {
				while(arr.length > 0) {
					var point = arr.pop();
					var square = grid[point.y][point.x];
					square.id = this.id;
					square.tail = false;
					square.texture = this.color;
				}
			}
		}
	}
	//check if point is out of bounds
	_outOfBounds(x, y) {
		if(x < 0 || y < 0 || x >= Config.board_length || y >= Config.board_length)
			return true;
		return false;
	}
}

module.exports = Player;