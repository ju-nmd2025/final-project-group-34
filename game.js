import { Doodler } from './Doodler.js';
import { Platform } from './platform.js';

//gobal variables
let player;
let platforms = []; // array stores platforms
let score = 0;
let state = 0; 

let winScore = 2000; 

function setup() {
  createCanvas(400, 600);
  reset(); // initialize game objects and values
}

function reset() {
  player = new Doodler();
  platforms = [];
  score = 0;
  
  let y = height;
  
<<<<<<< HEAD
  for (let i = 0; i < 8; i++) { 
    let x = random(50, width - 50);
=======
  // creating platforms
  for (let i = 0; i < 8; i++) {
    let x = random(50, width - 50); //x position
>>>>>>> c64580374d7c20bebad12cac0000cf1529067293
    if (i === 0) x = width / 2; 
    
   
    let type = 0;
    if (i > 2) {
      if (random(1) < 0.2) type = 1; // moving pal†form
      else if (random(1) < 0.4) type = 2; // breakable platform
    }
    
    // add platform to array
    platforms.push(new Platform(x, y, type));
    y -= random(70, 90); // move the next platform upwards
  }
}

// main game loop
function draw() {
<<<<<<< HEAD
  background(135, 206, 235);
  if (state === 3) background(255, 215, 0); 
=======
  background(135, 206, 235); 
  if (state === 3) background(255, 215, 0); // win - golden background
>>>>>>> c64580374d7c20bebad12cac0000cf1529067293

  if (state === 0) drawStart();
  else if (state === 1) play();
  else if (state === 2) { play(); drawLose(); }
  else if (state === 3) drawWin();
}

// game play logic
function play() {
  if (state === 2) return;

  player.update(); // handle movement, gravity 
  player.show();

 // scrolling logic
  if (player.y < height / 2 && player.vy < 0) { // above the middle or upwards
    player.y = height / 2;
    let shift = -player.vy; //claculate how much scroll
    score += Math.floor(shift);
    for (let p of platforms) p.y += shift;
  }

 // find highest platform
  let highY = height; 
  for (let p of platforms) if (p.y < highY) highY = p.y;

// platform backwards loop
  for (let i = platforms.length - 1; i >= 0; i--) {
    let p = platforms[i];
    p.update();
    p.show();

// collision detection
    if (!p.isBroken && player.vy > 0 && 
        player.x > p.x - 40 && player.x < p.x + 40 && // horizontal overlap
        player.y + 25 > p.y - 10 && player.y + 25 < p.y + 10) { // vertical overlap

      player.jump();
      if (p.type === 2) p.isBroken = true; 
    }

   // remove old platforms
    if (p.y > height) {
      platforms.splice(i, 1);
    // add new ones
      let type = 0;
      if (random(1) < 0.25) type = 1;
      else if (random(1) < 0.45) type = 2;
      
      platforms.push(new Platform(random(50, width-50), highY - random(70, 90), type)); // add above highest one
    }
  }

 
  if (player.y > height) state = 2;
  if (score >= winScore) state = 3;

<<<<<<< HEAD
 
  fill(0); textSize(20); text("Score: " + score, 20, 30);
  text("Goal: " + winScore, 20, 50);
=======
 //display final score
  fill(0); 
  textSize(20); 
  text("Score: " + score, 10, 30);
  text("Goal: " + winScore, 10, 50);
>>>>>>> c64580374d7c20bebad12cac0000cf1529067293
}

// draw start screen
function drawStart() {
  textAlign(CENTER); fill(0);
  textSize(30); text("Sunflower Jump", width/2, height/2 - 20);
  textSize(15); text("Press SPACE to Start", width/2, height/2 + 20);
}

// draw lose screen
function drawLose() {
  fill(0, 150); rect(width/2, height/2, width, height); // overlay
  textAlign(CENTER); fill(255);
  textSize(40); text("GAME OVER", width/2, height/2);
  textSize(20); text("Score: " + score, width/2, height/2 + 40);
  text("Press SPACE to Restart", width/2, height/2 + 70);
}

// draw win screen
function drawWin() {
  textAlign(CENTER); fill(0);
  textSize(40); text("YOU WIN!", width/2, height/2 - 20);
  textSize(20); text("Final Score: " + score, width/2, height/2 + 20);
  text("Press SPACE to Play Again", width/2, height/2 + 60);
}

//kekboard input
function keyPressed() {
  if (key === ' ' && state !== 1) { //space bar pressed
    reset(); state = 1;
  }
}

window.setup = setup
window.draw = draw
window.keyPressed = keyPressed