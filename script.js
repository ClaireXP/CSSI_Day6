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
 *    collideCircleCircle
 */

let xCan = window.innerWidth-15;
let yCan = window.innerHeight-15;

let rCoin;
if(xCan<xCan) rCoin = xCan/

let brushHue, backgroundColor, time;
let collision = false;
let initTime;

let score = 0;
let highscore;
let game = false;
let maxTime = 30;

let can;
let coins = [];
let p;

function setup() {
  p = {
    x: xCan/2,
    y: yCan/2,
    r: 25,
  }
  
  // Canvas & color settings
  can = createCanvas(xCan, yCan);
  colorMode(HSB, 360, 100, 100);
  brushHue = 0;
  backgroundColor = 95;
  initTime = millis();
  
  addCoin();
}

function draw() {
  background(backgroundColor);
    
  text(`Score: ${score}`, 20, 60);
  text(`Time remaining: ${time}`, 20, 40);
  handleTime();
  
  updateP();
  handleCollision();
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
      score++;
      c.x = random(c.r, xCan-c.r);
      c.y = random(c.r, yCan-c.r);
    }ellipse(c.x, c.y, c.r);
  }ellipse(p.x, p.y, p.r);
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
  });
}