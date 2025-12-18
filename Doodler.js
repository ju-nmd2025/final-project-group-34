 export class Doodler {
  constructor() {
    this.size = 50;
    this.x = width / 2;
    this.y = height - 200;
    this.vy = 0; 
    this.gravity = 0.4; 
    this.jumpPower = -10; 
  }

  update() {
    this.vy += this.gravity; // gravity
    this.y += this.vy;

    // left/right movement
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) this.x -= 5;
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) this.x += 5;

    // wall
    if (this.x > width) this.x = 0;
    else if (this.x < 0) this.x = width;
  }

  show() {
    push();
    translate(this.x, this.y);
    
    // sunflower 
    fill(255, 220, 0); // yellow petals
    noStroke();
    
    for (let i = 0; i < 10; i++) {
      ellipse(0, -20, 15, 30);
      rotate(PI / 5);
    }
  
    fill(100, 50, 0); 
    ellipse(0, 0, 35, 35); 
    
    // smile
    fill(255); ellipse(-8, -5, 8, 8); ellipse(8, -5, 8, 8); // eye 
    fill(0);   ellipse(-8, -5, 3, 3); ellipse(8, -5, 3, 3); // eye pupil
    noFill(); stroke(255); strokeWeight(2); arc(0, 5, 10, 8, 0, PI); // mouse
    
    pop();
  }

  jump() {
    this.vy = this.jumpPower;
  }
}