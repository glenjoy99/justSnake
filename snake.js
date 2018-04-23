/*
author Glen Joy
Copyright 2018
HTML/JavaScript Snake
*/
var score;
var gameOver;
var eatsFruit;
const width = 400;
const height = 400;
const cellSize = 20;
var snakeX;
var snakeY;
var fruitX;
var fruitY;
var xvel;
var yvel;
var trail = [];
var tail = 5;
/*
References HTML canvas and 2D Graphics context
*/
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');


setInterval (update, 1000/10); //Sets game frame rate

/*
Initializes score and character coordinates
*/
function setUp () {
  score = 0;
  gameOver = false;
  eatsFruit = false;
  xvel = 0;
  yvel = 0;
  snakeX = width/2;
  snakeY = height/2;
  fruitX = Math.floor(Math.random() * cellSize)*cellSize;
  fruitY = Math.floor(Math.random() * cellSize)*cellSize;

}
/*
Generates game characters including snake and food
*/
function update () {
  snakeX += xvel;
  snakeY += yvel;

  if (snakeX > width) {  //wraps snake location if in contact with walls
    snakeX = 0;
  } else if (snakeX < 0) {
    snakeX = width;
  } else if (snakeY > height) {
    snakeY = 0;
  } else if (snakeY < 0) {
    snakeY = height;
  }

  ctx.fillStyle = '#002b36'; //creates background
  ctx.fillRect(0,0,width,height);

  ctx.fillStyle = "#f4ce42"; //creates tail
  for (var i = 0; i < trail.length; i++) { 
      ctx.fillRect(trail[i].x, trail[i].y, cellSize-2, cellSize-2);
      if (snakeX == trail[i].x && snakeY == trail[i].y) { //if snake head collides with tail
        tail = 5;
        score = 0;
      }
  }

  ctx.fillStyle = "#FF0000"; //creates food
  var fruit = ctx.fillRect(fruitX, fruitY, cellSize, cellSize);

  ctx.fillStyle = "#f4ce42"; //creates snake head
  var snake = ctx.fillRect(snakeX,snakeY,cellSize-2,cellSize-2);

  ctx.fillStyle = 'white'; //score counter
  ctx.fillText("Score: " + score, 350,375);

  trail.push({x: snakeX, y: snakeY});
  while (trail.length > tail) { //restrains tail to amount gained by eating fruit
    trail.shift();
  }

  function checkEatsFruit () { //collision detection for fruit
    if (snakeX < fruitX + cellSize &&
       snakeX + cellSize > fruitX &&
       snakeY < fruitY + cellSize &&
       cellSize + snakeY > fruitY) {
        score+=10;
        tail++;
        fruitX = Math.floor(Math.random() * cellSize)*cellSize;
        fruitY = Math.floor(Math.random() * cellSize)*cellSize;
        eatsFruit = true;

    } else {
      eatsFruit = false;
    }
  }
  checkEatsFruit();
}
/*
Controls game movements
*/
function input () {
  window.onkeyup = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;
    if (key == 38) {
      xvel = 0;
      yvel = -20;
     }else if (key == 40) {
      xvel = 0;
      yvel = 20;
    } else if (key == 39) {
      yvel = 0;
      xvel = 20;
    } else if (key == 37) {
      yvel = 0;
      xvel = -20;
    }
  }
}

//entry point
setUp();
input();
update();