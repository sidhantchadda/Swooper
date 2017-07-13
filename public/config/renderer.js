module.exports = (renderer) => {
	renderer.view.style.position = "absolute";
	renderer.view.style.display = "block";
	renderer.autoResize = true;
	renderer.resize(window.innerWidth, window.innerHeight);
	renderer.backgroundColor = 0x061639;
}	