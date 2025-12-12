class Platform {
    constructor(x,y,type){
        this.x = x;
        this.y = y;
        this.w=70;
        this.h=15;
        this.type = type;
        this.isBroken = false;
        this.Direction = 1;
        this.speed = 2;
    }

    update(){
            if (this.type === 1){
                this.x += this.speed * this.Direction;
                if (this.x + this.w/2 > width || this.x - this.w/2 < 0){
                    this.Direction *= -1;
                }
            }
        }

            show(){
                if (this.isBroken) return;

                noStroke();
                rectMode(CENTER);
                if (this.type === 0){
                    fill(100,200,100);
                    rect(this.x,this.y,this.w,this.h,10);
                }
                else if (this.type === 1){
                    fill(200,230,255);
                    rect(this.x,this.y,this.w,this.h,10);
                    ellipse(this.x - 20, this.y, 30, 20);
                    ellipse(this.x + 20, this.y, 30, 20);
                    ellipse(this.x, this.y - 10, 40, 30);
                    
                }
                else if (this.type === 2){
                    fill(200,100,50);
                    rect(this.x,this.y,this.w,this.h,5);
                    stroke(100,50,0);
                    strokeWeight(2);
                   line(this,x-10,this.y-5,this.x+10,this.y+5);

                }
            } 
    }