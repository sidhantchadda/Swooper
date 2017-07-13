class Loader {
	constructor(PIXI, setup) {
		var loader = PIXI.loader;
		loader
			.add("imgs/square.png")
			.add("imgs/p0.png")
			.add("imgs/p1.png")
			.add("imgs/s0.png")
			.add("imgs/s1.png")
			.add("imgs/a0.png")
			.add("imgs/a1.png")
			.on("progress", (loader, resource) => {
				console.log("loading: "+resource.url);
				console.log("progress: "+loader.progress+"%");		
			})
			.load(setup);
	}
}

module.exports = Loader;