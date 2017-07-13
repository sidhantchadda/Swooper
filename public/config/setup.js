const Config = require('./config.js');
const MainPlayer = require('../game/MainPlayer.js');

module.exports = (PIXI, resources, sprites, stage, renderer, grid) => {
	
	//place mainPlayer object	
	var player = new MainPlayer(0, 0, "player.png", resources, "redSquare.png", "redSquareAlpha.png");
	sprites["player"] = player;
	stage.addChild(player.Sprite);


	//Render the stage
	renderer.render(stage);
};