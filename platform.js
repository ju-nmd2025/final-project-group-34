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
                rect(this.x, this.y, this.w, this.h);
            }
        }