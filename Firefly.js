class Firefly {

  constructor(dna) {
    //Phenotype
    this.pos = createVector(width / 2, height);
    this.vel = createVector();
    this.acc = createVector();
    this.r = 8;
    this.light = 0;
    this.timer = 0;
    this.crashed = false;
    this.arrived = false;

    //Genotype
    if (dna) {
      this.dna = dna;
    } else {
      this.dna = new DNA();
    }
    this.fitness = 0;
  }
  
    checkObstacles(obs) {
    for (let i = 0; i < obs.length; i++) {
      if (obs[i].contains(this.pos)) {
        this.crashed = true;
      }
    }
  }

  update(target) {
    if (this.pos.x > width || this.pos.x < 0) {
      this.crashed = true;
    }
    if (this.pos.y > height+20 || this.pos.y < 0) {
      this.crashed = true;
    }
    
    if(this.pos.x > (target.x-(target.s/2)) && this.pos.x < (target.x+(target.s/2)) ) {
    if(this.pos.y > (target.y-(target.s/2)) && this.pos.y < (target.y+(target.s/2)) ){
      if(!this.arrived) arrived++;
      this.arrived = true;
    }
  }
  else {
    if(this.arrived) arrived--;
    this.arrived = false;
  }
    

    if (this.timer >= life) {
      nextGen = true;
      this.timer = 0;
    } 
    else {
      this.acc.add(this.dna.genes[this.timer]);
      this.timer++;
      this.acc.limit(0.4);
      if(!this.arrived && !this.crashed){
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      }
    }
  }

  show(target) {
      var d = dist(this.pos.x, this.pos.y, target.x, target.y);
      this.light = map(d, 0, width, 255, 0);
      fill(this.light, 0, this.light, 200);
      push();
      noStroke();
      ellipseMode(CENTER);
      ellipse(this.pos.x, this.pos.y, this.r);
      pop();
  }

  calcFitness(target) {
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);
    this.fitness = (1 / (d + 1)) * (1 / (d + 1));
    
    if(this.crashed){
      this.fitness /= crashDamage;
    }
    
    if(this.arrived){
      this.fitness *= life / (this.timer + 0.1);
      this.fitness *= arriveBonus;
    }

  }
}