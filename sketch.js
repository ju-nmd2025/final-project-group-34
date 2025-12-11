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
    }

    if (
        !p.isBroken &&
        doodler.vy > 0 &&
        doodler.y + doodler.r/2 > p.y - p.h/2 &&
        doodler.y + doodler.r/2 > p.y + p.h/2 +15 &&
        doodler.x > p.x - p.w/2-10 &&
        doodler.x<p.x + p.w/2 +10
    ) {
        doodler.jump();

        if (p.type === 2){
            p. isBroken = true;
        }
    }

    if (p.y > height){
        platforms.splice(i, 1);

        let newY = minPlatformY - random(70, maxGap);
        let newX= random(platformWidth/2, width - platformWidth/2);

        let newType= 0;
        let r = random(1);
        if ( r< 0.25) newType = 1; 
        else if ( r< 0.45) bewType = 2;

        platforms.push(new Platform(newX, newY, NewType));
        minPlatformY = newY;
    }
}

if (doodler.y > height){
    gameState = 2;
}
