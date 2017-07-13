const Config = require('../config/Config.js');


//move this file to server side this is temporary
module.exports = (player, grid) => {

		
	var buffer = 10;
	var max = Config.length-buffer;;


	var x = 20;
	var y = 20;
	player.setX(x*Config.scale);
	player.setY(y*Config.scale);

	//make rectangle aroud player

	for(var i = y-3; i<y+3; i++) {
		for(var j = x-3; j<x+3; j++) {
			var square = grid[j][i];
			square.texture = player.color;
			square.id = player.id;
		}
	}

}