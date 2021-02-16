class Target {

  constructor() {
    this.x = width / 2;
    this.y = 120;
    this.s = 45;
    this.col = color(150, 0, 100);
  }

  show() {
    push();
    rectMode(CENTER);
    fill(this.col);
    strokeWeight(2);
    rect(this.x, this.y, this.s, this.s, 10);
    textAlign(CENTER, CENTER);
    fill(255);
    textFont("montserrat");
    textStyle("bold");
    text("GOAL", this.x, this.y)
    pop();
  }

  checkMouseOver(x, y) {
    const cornerX = this.x - this.s / 2;
    const cornerY = this.y - this.s / 2;

    if(x > cornerX && x < cornerX + this.s) {
      if(y > cornerY && y < cornerY + this.s) {
        return true;
      }
    }

    return false;
  }
}