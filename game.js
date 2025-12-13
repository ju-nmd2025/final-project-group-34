import { Platform } from "platform";
import { Character } from "./character";

let player;
let platforms = [];
let score = 0;
let state = 0; 

let winScore = 2000; 

function setup() {
  createCanvas(400, 600);
  reset();
}

function reset() {
  player = new Doodler();
  platforms = [];
  score = 0;
  
  let y = height;
  
  for (let i = 0; i < 8; i++) {
    let x = random(50, width - 50);
    if (i === 0) x = width / 2; 


    let type = 0;
    if (i > 2) {
      if (random(1) < 0.2) type = 1;
      else if (random(1) < 0.4) type = 2;
    }
    
    platforms.push(new Platform(x, y, type));
    y -= random(70, 90); 
  }
}

function draw() {
  background(135, 206, 235); 
  if (state === 3) background(255, 215, 0); 

  if (state === 0) drawStart();
  else if (state === 1) play();
  else if (state === 2) { play(); drawLose(); }
  else if (state === 3) drawWin();
}

function play() {
  if (state === 2) return;

  player.update();
  player.show();

  if (player.y < height / 2 && player.vy < 0) {
    player.y = height / 2;
    let shift = -player.vy;
    score += Math.floor(shift);
    for (let p of platforms) p.y += shift;
  }

  let highY = height; 
  for (let p of platforms) if (p.y < highY) highY = p.y;

  for (let i = platforms.length - 1; i >= 0; i--) {
    let p = platforms[i];
    p.update();
    p.show();

   
    if (!p.isBroken && player.vy > 0 && 
        player.x > p.x - 40 && player.x < p.x + 40 &&
        player.y + 25 > p.y - 10 && player.y + 25 < p.y + 10) {
      
      player.jump();
      if (p.type === 2) p.isBroken = true; 
    }

    
    if (p.y > height) {
      platforms.splice(i, 1);
      
      let type = 0;
      if (random(1) < 0.25) type = 1;
      else if (random(1) < 0.45) type = 2;
      
      platforms.push(new Platform(random(50, width-50), highY - random(70, 90), type));
    }
  }

  
  if (player.y > height) state = 2;
  if (score >= winScore) state = 3;

  
  fill(0); textSize(20); text("Score: " + score, 10, 30);
  text("Goal: " + winScore, 10, 50);
}


function drawStart() {
  textAlign(CENTER); fill(0);
  textSize(30); text("Sunflower Jump", width/2, height/2 - 20);
  textSize(15); text("Press SPACE to Start", width/2, height/2 + 20);
}

function drawLose() {
  fill(0, 150); rect(width/2, height/2, width, height); 
  textAlign(CENTER); fill(255);
  textSize(40); text("GAME OVER", width/2, height/2);
  textSize(20); text("Score: " + score, width/2, height/2 + 40);
  text("Press SPACE to Restart", width/2, height/2 + 70);
}

function drawWin() {
  textAlign(CENTER); fill(0);
  textSize(40); text("YOU WIN!", width/2, height/2 - 20);
  textSize(20); text("Final Score: " + score, width/2, height/2 + 20);
  text("Press SPACE to Play Again", width/2, height/2 + 60);
}

function keyPressed() {
  if (key === ' ' && state !== 1) {
    reset(); state = 1;
  }
}