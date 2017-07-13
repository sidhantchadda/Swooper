const PIXI = require('pixi.js');
const Loader =require('./config/loader.js');
const Setup = require('./config/setup.js');
const Config = require('./config/config.js');
const Util = require('./game/Util.js');
const MainPlayer = require('./game/MainPlayer.js');

//Aliases
var resources = PIXI.loader.resources;
var app = new PIXI.Application();


//Create the renderer
var renderer = PIXI.autoDetectRenderer(256, 256);
require('./config/renderer.js') (renderer);
var stage = new PIXI.Container();
document.body.appendChild(renderer.view);

//things that we want to keep from the setup

var util;
function setup() { 
	renderer.render(stage);
	
	//build utility object
	util = new Util(PIXI, stage);



	//get information from server and spit it into the util object
	util.generateMainPlayer(0, 0, 0);
	//handle spawn of player object
	require('./game/spawn.js') (util.getMainPlayer(), util.getGrid());
	//run game loop
	app.ticker.add(gameLoop);

	app.ticker._maxElapsedMS = 5000;
}

function gameLoop(deltaTime) {
	//keep computations on this loop low since it needs to run fast
	var grid = util.getGrid();
	var players = util.getPlayers();
	players.forEach((player) => {
		//move players on the map
		player.move(deltaTime);
		
		if(player instanceof MainPlayer) {
			//update camera
			stage.x = (-player.getX()+renderer.width/2);
			stage.y = (-player.getY()+renderer.height/2);		
		}

		var point = player.getPoint();
		var square = grid[point.y][point.x];
		
		if(player.recent !== square) {
			if(player.id !== square.id) {
				if(player.safe) {
					//start collecting the points
					player.addPoint();
				}
				//not in the safe zone
				player.safe = false;
				square.texture = player.colorAlpha;
				square.id = player.id;
				square.tail = true;
			}
			else {
				if(!player.safe) {
					player.addPoint();
					player.buildGraph(grid);
				}
				player.safe = true;
			}
			player.recent = square;
		}
		renderer.render(stage);
	});
}
/*
	load appropriate resources
*/
new Loader(PIXI, setup);