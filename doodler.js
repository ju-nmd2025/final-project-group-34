class Doodler {
<<<<<<< Updated upstream
    constuctor(){
        this.r = 50;
        this.x = width/2;
        this.y = height-200;
        this.vy = 0;
        this.gravity = 0.4;
        this.jumpForce = -10;
    }
}

=======
    constructor(){
        this.r = 50;
        this.x = width / 2;
        this.y = height - 200;
        this.vy = 0;
        this. gravity = 0.4;
        this. jumpForce = -10;
    }

    update(){
        this.vy += this.gravity;
        this.y += this.vy;

        if(keyIsDown(LEFT_ARROW) || keyIsDown(65)){
            this.x -= 5;
        }
        
        if(ketIsDown(RIGHT_ARROW) || keyIsDown(68)){
            this.x += 5;
        }

        if (this.x > width) {
            this.x = 0;
        } else if (this.x < 0){
            this.x = width;
        }
    }

    show(){
        push();
        translate(this.x, this.y);

        //patel
        fill(255,220,0);
        noStroke();
        for (let i=0; i<12; i++){
            ellipse(0,20,14,30);
            rotate(PI/6);
        }

        //torus
        fill(100,60,20);
        ellipse(0,0,34,34);

        //expression
        fill(255);
        ellipse(-8,-5,10,10);
        ellipse(8,-5,10,10);

        fill(0);
        let eyeOffsetX = 0;
        if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) eyeOffsetX = -2;
        if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) eyeOffsetX = 2;

        ellipse(-8 + sysOffsetX, -5, 4, 4);
        ellipse(8 + sysOffsetX, -5, 4, 4);

        nofill();
        stroke(255);
        strokeWeight(2);
        arc(0,5,12,10,0,PI);

        pop();
    }

    jump(){
        this.vy = this.jumpForce;
    }
}
>>>>>>> Stashed changes
