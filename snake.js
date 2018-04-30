/*
authors Glen Joy, Sean Decena, Jalen Chavers, Michael Seyoum
justSnake
Copyright 2018
Decena Software Solutions
*/
var score;
var highscore = 0;
var gameOver;
var paused = false;

var goingUp = false;
var goingDown = false;
var goingLeft = false;
var goingRight = false;

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
var tail = 0;
/*
References HTML canvas and 2D Graphics context
*/
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');


setInterval (update, 1000/15); //Sets game frame rate

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
  tail = 0;
  goingUp = false;
  goingRight = false;
  goingLeft = false;
  goingDown == false
}
/*
Generates game characters including snake and food
*/
function update () {
  
  if (!gameOver) {
    
    snakeX += xvel;
    snakeY += yvel;
  
    if (snakeX > width) {  //game over if you collide with the walls
      gameOver = true;
    } else if (snakeX < 0) {
      gameOver = true;
    } else if (snakeY > height) {
      gameOver = true;
    } else if (snakeY < 0) {
      gameOver = true;
    }
  
    ctx.fillStyle = '#002b36'; //creates background
    ctx.fillRect(0,0,width,height);
  
    if (!paused) {
      ctx.fillStyle = "#46aa29"; //creates tail
      for (var i = 0; i < trail.length; i++) { 
          ctx.fillRect(trail[i].x, trail[i].y, cellSize, cellSize);
          if (snakeX == trail[i].x && snakeY == trail[i].y && tail > 0 && paused == false) { //if snake head collides with tail
            tail = 0;
            xvel = 0;
            yvel = 0;
            gameOver = true;
            document.getElementById('gameOver').style.display= 'block';
            document.getElementById('scorePrint').innerHTML= "Score: " + score;
          }
      }
    }
   
  
    ctx.fillStyle = "#898a8c"; //creates food
    var fruit = ctx.fillRect(fruitX, fruitY, cellSize, cellSize);
  
    ctx.fillStyle = "#46aa29"; //creates snake head
    var snake = ctx.fillRect(snakeX,snakeY,cellSize,cellSize);
    
    if (score > highscore){
      highscore = score;
    }
    
    //score counter  
    document.getElementById('scoreNum').innerHTML = "Score: " + score; 
    document.getElementById('highscoreNum').innerHTML = "Highscore: " + highscore; 
    
    trail.push({x: snakeX, y: snakeY});
    while (trail.length > tail) { //restrains tail to amount gained by eating fruit
      trail.shift();
    }
  
    function checkEatsFruit () { //collision detection for fruit
      if (snakeX < fruitX + cellSize &&
         snakeX + cellSize > fruitX &&
         snakeY < fruitY + cellSize &&
         cellSize + snakeY > fruitY) {
          score+=5;
          tail += 5;
          
          while (fruitX == snakeX && fruitY == snakeY){
            fruitX = Math.floor(Math.random() * cellSize)*cellSize;
            fruitY = Math.floor(Math.random() * cellSize)*cellSize;
          }
          
          eatsFruit = true;
      } else {
        eatsFruit = false;
      }
    }
    checkEatsFruit();
  } else {
    document.getElementById('gameOver').style.display= 'block';
    document.getElementById('scorePrint').innerHTML= "Score: " + score;
    document.getElementById('highscorePrint').innerHTML= "Highscore: " + highscore;
  }
}



/*
Controls game movements
*/
function input () {
  window.onkeydown = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;
    if (key == 38 && gameOver == false && goingDown == false) { //up
      goingUp = true;
      goingRight = false;
      goingLeft = false;
      goingDown == false
      xvel = 0;
      yvel = -20;
      gameOver = false;
      paused = false;
      document.getElementById('pause').style.display='none';
     }else if (key == 40 && gameOver == false && goingUp == false) { //down
      goingDown = true;
      goingRight = false;
      goingLeft = false;
      goingUp == false
      xvel = 0;
      yvel = 20;
      gameOver = false;
      paused = false;
      document.getElementById('pause').style.display='none';
    } else if (key == 39 && gameOver == false && goingLeft == false) { //right
      goingRight = true;
      goingUp = false;
      goingDown = false;
      goingLeft == false
      yvel = 0;
      xvel = 20;
      gameOver = false;
      paused = false;
      document.getElementById('pause').style.display='none';
    } else if (key == 37 && gameOver == false  && goingRight == false) { //left
      goingLeft = true;
      goingUp = false;
      goingDown = false;
      goingRight == false
      yvel = 0;
      xvel = -20;
      gameOver = false;
      paused = false;
      document.getElementById('pause').style.display='none';
    } else if (key == 80 && gameOver == false) { //pause
      yvel = 0;
      xvel = 0;
      paused = true;
      document.getElementById('pause').style.display='block';
    } else if (key == 32 && gameOver){
      reset();
    }
    
  }
}

//prevents the window from scrolling while using the arrow keys
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

function reset () {
  if(gameOver){
    setUp();
    update();
    document.getElementById('gameOver').style.display='none';
  }
}

//entry point
setUp();
input();
update();

  