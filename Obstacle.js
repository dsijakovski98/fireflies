class Obstacle{
  
  constructor(x,y,w,h){
    this.pos = createVector(x,y);
    this.w = w;
    this.h = h;
  }
  
  show(){
    push();
    fill(100,100,0,50)
    rectMode(CORNER);
    strokeWeight(2);
    rect(this.pos.x,this.pos.y,this.w,this.h);
    pop();
  }
  
  contains(point){
    if(point.x > this.pos.x &&
       point.x < this.pos.x + this.w &&
       point.y > this.pos.y &&
       point.y < this.pos.y + this.h)
      return true;
    else return false;
  }
  
}