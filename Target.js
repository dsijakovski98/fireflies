class Target {

  constructor() {
    this.x = width / 2;
    this.y = 120;
    this.s = 45;
  }

  show() {
    push();
    rectMode(CENTER);
    fill(150,0,100);
    strokeWeight(2);
    rect(this.x, this.y, this.s, this.s,10);
    textAlign(CENTER, CENTER);
    fill(255);
    textFont("montserrat");
    textStyle("bold");
    text("GOAL", this.x, this.y)
    pop();
  }

}