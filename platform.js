export class Platform {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.w = 70;
    this.h = 15;
    this.type = type; 
    this.isBroken = false;
    
    this.dir = 1; 
    this.speed = 2;
  }

  update() {
    
    if (this.type === 1) {
      this.x += this.speed * this.dir;
      if (this.x > width || this.x < 0) this.dir *= -1;
    }
  }

  show() {
    if (this.isBroken) return; 

    rectMode(CENTER);
    noStroke();

    if (this.type === 0) fill(100, 255, 100); 
    else if (this.type === 1) fill(100, 200, 255); 
    else if (this.type === 2) fill(255, 100, 100); 

    rect(this.x, this.y, this.w, this.h, 5);
  }
}