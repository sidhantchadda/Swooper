var Config = require('./Config.js');
var speed = Config.speed;

module.exports = (cat) => {
  //Capture the keyboard arrow keys
  var left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40);

  //Left arrow key `press` method
  left.press = function() {
    cat.moveLeft();
  };

  //Up
  up.press = function() {
    cat.moveUp();
  };

  //Right
  right.press = function() {
    cat.moveRight();
  };

  //Down
  down.press = function() {
    cat.moveDown();
  };
}

function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}