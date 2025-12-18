export class Platform {
  constructor(x, y, type) {
    this.x = x; 
    this.y = y;
    this.w = 70;
    this.h = 15;
    this.type = type; 
    this.isBroken = false;// for breakable platforms

    this.dir = 1; //left/right turn
    this.speed = 2;//speed
  }

  update() {
    
    if (this.type === 1) {// moving platform 1
      this.x += this.speed * this.dir;//
      if (this.x > width || this.x < 0) this.dir *= -1;// touch wall back
    }
  }

  show() {
    if (this.isBroken) return; // don't show if broken

    rectMode(CENTER);
    noStroke();

    if (this.type === 0) fill(100, 255, 100); //normal green
    else if (this.type === 1) fill(100, 200, 255); //moving blue
    else if (this.type === 2) fill(255, 100, 100);  //breakable red

    rect(this.x, this.y, this.w, this.h, 5); // rounded corners platform
  }
}