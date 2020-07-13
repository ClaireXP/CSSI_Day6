/* ____    ___       _      _       ____  
  / ___|  / _ \     / \    | |     / ___| 
 | |  _  | | | |   / _ \   | |     \___ \ 
 | |_| | | |_| |  / ___ \  | |___   ___) |
  \____|  \___/  /_/   \_\ |_____| |____/ 
                       
-- Let's come up with goals together! --
1) Make time count down

  ____    _____   ____    _____   _____    ____   _   _ 
 / ___|  |_   _| |  _ \  | ____| |_   _|  / ___| | | | |
 \___ \    | |   | |_) | |  _|     | |   | |     | |_| |
  ___) |   | |   |  _ <  | |___    | |   | |___  |  _  |
 |____/    |_|   |_| \_\ |_____|   |_|    \____| |_| |_|

1)  Multiple coins on the screen at a time
2)  Coins of varying values
3)  Colors and decorations for coins
4)  Time-extending power-ups
5)  Coins that expire / move after a certain length of time.
6)  A player token that grows or shrinks as coins are collected.
7)  Coins that bounce around screen like the DVD logo did.
8)  Coins that simulate the rotating motion of Mario coins.
9)  A “restart” button or click function.
10) A larger, more pronounced “game over” proclamation.
11) A score rater (i.e. okay, good, great, outstanding!)
12) A high score over multiple plays.

*/

// Name any p5.js functions we use in the global so Glitch can recognize them.
/* global
 *    createCanvas,
 *    colorMode,
 *    HSB,
 *    random,
 *    width,
 *    height,
 *    background,
 *    ellipse,
 *    mouseX,
 *    mouseY,
 *    createCanvas,
 *    text,
 *    millis,
 *    collideCircleCircle,
 *    fill,
 *    textSize,
 *    createButton,
 */

let xCan = window.innerWidth-15;
let yCan = window.innerHeight-20;

let rCoin;
if(xCan<yCan) rCoin = xCan/10;
else rCoin = yCan/10;
if(rCoin>100) rCoin = 100;

let marioCoin;

let brushHue, backgroundColor, time;
let collision = false;
let initTime;

let score = 0;
let highscore;
let game;
let maxTime = 30;

let can, coins, p;

let values = [1, 5, 10, 25];
let colors = [0, 100, 175, 275]

let restartBtn;

function setup() {
  addCoin();
  addCoin();
  
  
  
  restartBtn = createButton("Play Again");
  restartBtn.position(xCan/2-50, yCan/2);
  restartBtn.size(200, 50);
  restartBtn.hide();
  
  // Canvas & color settings
  can = createCanvas(xCan, yCan);
  colorMode(HSB, 360, 100, 100);
  brushHue = 0;
  backgroundColor = 95;
  
  p = {
    x: xCan/2,
    y: yCan/2,
    r: 25,
  }
  
  reset();
}

function draw() {
  background(backgroundColor);
  
  if(game){
    updateP();
    handleCollision();
    handleTime();
    if(time==0) gameOver();
  }
  
  textSize(20);
  text(`Score: ${score}`, 20, 60);
  text(`Time remaining: ${time}`, 20, 40);
}

function reset(){
  coins = [];
  game = true;
  
  initTime = millis();  
}

function updateP(can){
  p.x = mouseX;
  p.y = mouseY;
}

function handleCollision() {
  // We'll write code for what happens if your character hits a coin.
  for(const c of coins){  
    collision = collideCircleCircle(mouseX, mouseY, p.r, c.x, c.y, c.r);
    if(collision){
      score+=values[c.num];
      c.x = random(c.r, xCan-c.r);
      c.y = random(c.r, yCan-c.r);
      c.num = random([0, 0, 0, 0, 1, 1, 1, 2, 2, 3]);
    }fill(colors[c.num], 40, 80);
    ellipse(c.x, c.y, c.r);
    
    fill(0);
    textSize(30);
    if(c.num>=2) text(values[c.num], c.x-15.5, c.y+10);
    else text(values[c.num], c.x-8, c.y+10);
  }
  
  fill(0);
  ellipse(p.x, p.y, p.r);
}

function handleTime() {
  // We'll write code to handle the time.
  time = Math.round((maxTime*1000-millis())/1000);
}

function addCoin(){
  coins.push({
    x: random(rCoin, xCan-rCoin),
    y: random(rCoin, yCan-rCoin), 
    r: rCoin,
    num: random([0, 0, 0, 0, 1, 1, 1, 2, 2, 3]),
  });
}

function gameOver(){
  game = false;
  
  restartBtn.show();
  restartBtn.mousePressed(playAgain);
}

function playAgain(){
  reset();
}