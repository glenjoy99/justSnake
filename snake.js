/*
authors Glen Joy, Sean Decena, Jalen Chavers, Michael Seyoum
justSnake
Copyright 2018
Decena Software Solutions
*/
var score;
var gameOver = false;
var eatsFruit;
const width = 600;
const height = 600;
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
  tail = 5;
}
/*
Generates game characters including snake and food
*/
function update () {
  
  if (!gameOver) {
    
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
  
    ctx.fillStyle = "#46aa29"; //creates tail
    for (var i = 0; i < trail.length; i++) { 
        ctx.fillRect(trail[i].x, trail[i].y, cellSize, cellSize);
        if (snakeX == trail[i].x && snakeY == trail[i].y && tail > 5) { //if snake head collides with tail
          score = 0;
          tail = 5;
          xvel = 0;
          yvel = 0;
          gameOver = true;
          document.getElementById('gameOver').style.display='block';
        }
    }
  
    ctx.fillStyle = "#898a8c"; //creates food
    var fruit = ctx.fillRect(fruitX, fruitY, cellSize, cellSize);
  
    ctx.fillStyle = "#46aa29"; //creates snake head
    var snake = ctx.fillRect(snakeX,snakeY,cellSize,cellSize);
  
    document.getElementById('scoreNum').innerHTML = "Score: " + score; //score counter
    
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
      gameOver = false;
      document.getElementById('gameState').innerHTML = "";
     }else if (key == 40) {
      xvel = 0;
      yvel = 20;
      gameOver = false;
      document.getElementById('gameState').innerHTML = "";
    } else if (key == 39) {
      yvel = 0;
      xvel = 20;
      gameOver = false;
      document.getElementById('gameState').innerHTML = "";
    } else if (key == 37) {
      yvel = 0;
      xvel = -20;
      gameOver = false;
      document.getElementById('gameState').innerHTML = "";
    } else if (key == 80) {
      xvel = 0;
      yvel = 0;
      gameOver = true;
      document.getElementById('gameState').innerHTML = "GAME PAUSED";
    }
  }
}

//entry point
setUp();
input();
update();

