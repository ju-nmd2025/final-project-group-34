let doodler;
let platforms = [];
let score = 0;
let gameState = 0;

let platformCount = 8;
let macGap = 90;
let platformWidth = 70;
let winingScore = 2000;

function setup(){
    createCanvas(400,600);
    reserGame();
}

function resetGame(){
    doodler = new Doudler();
    platforms = [];
    score = 0;

    let currentY = height - 50;
    
    for (let i=0; i<platformCount; i++){
        let x = (i === 0) ? width/ 2 : random (platformWidth/2, width - platformWidth/2);
        let type = 0;
        
        if (i >2){
            let r = random(1);
            if (r<0.2) type = 1;
            else if (r<0.4) type =2;
        }

        platform.push(new Platform(x, currentY, type));
        currentY -= random(60,maxGap);
    }
}
 function draw() {
  if (gameState === 3) {
      background(255, 215, 0); 
  } else {
      background(135, 206, 235); 
  }

if (gameState === 0 ) {
    drawStartScreen();
    } else if (gameState === 1){
        playGame();
    } else if (gameState === 2){
        playGame();
        drawEndScreen();
    } else if (gameState === 3){
        drawWinScreen();
    }
}
    

function playGame() {
    if (gameState === 2) return;

    doodler.update();
    doodler.show();

    if (doodler.y < height/ 2 && doodler.vy<0){
        let shift = -doodler.vy;
        doodler.y = height / 2;
        for (let p of platforms) {
            p.y += shift;
        }
        scroe +=Math.floor(shift);
    }

    let minPlatformY = height;
    for(let p of platforms) {
        if (p.y < minPlatformY) minPlatformY = p.y;
    }

    for (let i = platforms.length -1 ; i>=0; i--){
        let p = platforms[i];
        p.update();
        p.show();

        if (
            !p.isBroken &&
            doodler.vy > 0 &&
            doodler.y + doodler.r/2 > p.y - p.h/2 &&
            doodler.y + doodler.r/2 < p.y + p.h/2 +15 &&
            doodler.x > p.x - p.w/2-10 &&
            doodler.x < p.x + p.w/2 +10
        ) {
            doodler.jump();

            if (p.type === 2){
                p.isBroken = true;
            }
        }

        if (p.y > height){
            platforms.splice(i, 1);

            let newY = minPlatformY - random(70, maxGap);
            let newX = random(platformWidth/2, width - platformWidth/2);

            let newType = 0;
            let r = random(1);
            if ( r < 0.25) newType = 1; 
            else if ( r < 0.45) newType = 2;

            platforms.push(new Platform(newX, newY, newType));
            minPlatformY = newY;
        }
    }

    if (doodler.y > height) {
        gameState = 2;
    }
    
    if (score >= winningScore) {
        gameState = 3;
    }
    
    fill(255);
    stroke(0);
    strokeWeight(2);
    textSize(24);
    textAlign(LEFT);
    text("Score: " + score, 10, 30);
    textSize(14);
    text("Goal: " + winningScore, 10, 50);
}

function drawStartScreen() {
  fill(255, 255, 255, 150);
  rectMode(CENTER);
  rect(width/2, height/2, 300, 200, 20);
  
  textAlign(CENTER);
  fill(0);
  noStroke();
  textSize(32);
  text("🌻 Sunflower Jump", width / 2, height / 2 - 20);
  textSize(16);
  text("Reach " + winningScore + " to Win!", width / 2, height / 2 + 10);
  text("Press SPACE to Start", width / 2, height / 2 + 50);
}

function drawEndScreen() {
  fill(0, 0, 0, 150);
  rectMode(CORNER);
  rect(0, 0, width, height);
  
  textAlign(CENTER);
  fill(255);
  noStroke();
  textSize(40);
  text("GAME OVER", width / 2, height / 2 - 40);
  textSize(24);
  text("Final Score: " + score, width / 2, height / 2 + 10);
  textSize(16);
  text("Press SPACE to Restart", width / 2, height / 2 + 60);
}

function drawWinScreen() {
  randomSeed(score); 
  noStroke();
  for(let i=0; i<50; i++) {
    fill(random(255), random(255), random(255));
    ellipse(random(width), random(height), 10, 10);
  }
  
  textAlign(CENTER);
  
  fill(255, 255, 255, 200);
  rectMode(CENTER);
  rect(width/2, height/2, 320, 220, 20);

  fill(0);
  textSize(40);
  text("YOU WIN! 🌻", width / 2, height / 2 - 40);
  
  textSize(20);
  text("Goal Reached: " + winningScore, width / 2, height / 2 + 10);
  text("Final Score: " + score, width / 2, height / 2 + 40);
  
  textSize(16);
  fill(50);
  text("Press SPACE to Play Again", width / 2, height / 2 + 80);
}

function keyPressed() {
  if (key === ' ') {
    if (gameState === 0 || gameState === 2 || gameState === 3) {
      resetGame();
      gameState = 1;
    }
  }
}