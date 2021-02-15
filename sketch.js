let target;
let population;
let backgroundIMG;
let obstacles = [];
let newObs = null;

let generation = 1;
let defaultMutationRate = 0.08;
let defaultPanicThreshold = 3;
let arrived = 0;
let panicMode = 0;
let panicThreshold = 3;
let nextGen = false;

// Sliders data
let life = 250;
let defaultPopulationSize = 200;
let mutationRate = defaultMutationRate;
let obstacleLifeBonus = 20;
let crashDamage = 100;
let arriveBonus = 100;

const title = 'FIREFLIES';
const instructions = 'Click/Touch and drag to create\nobstacles for the Fireflies :)';

function preload() {
  backgroundIMG = loadImage('pozadina.png');
}


function setup() {
  createCanvas(900, 600);
  population = new Population();
  target = new Target();

  createSliders();
}

function draw() {
  background(backgroundIMG);
  showText();
  
  target.show();

  for (var o of obstacles) {
    o.show();
  }
  for (var p of population.fireflies) {
    p.show(target);
    p.update(target);
  }

  if (!nextGen) {
    for (var i = 0; i < population.fireflies.length; i++) {
        population.fireflies[i].checkObstacles(obstacles);
    }
  }

  if (newObs) {
    newObs.show();
  }

  if (nextGen) {
    //GA
    nextGen = false;
    //population = new Population();
    population.evaluate(target);

    if(arrived == 0) {
      panicMode++;
      if(panicMode % panicThreshold == 0) {
        console.log("Panic mode! Mutation rate doubled!");
        mutationRate *= 2;
        panicThreshold *= 2;
        life += 50;
      } 
    }
    else {
      panicMode = 0;
      mutationRate = defaultMutationRate;
      panicThreshold = defaultPanicThreshold;
    }

    console.log("Panic mode: " + panicMode + "/" + panicThreshold);
    population.selection();
    population.nextGeneration();
    arrived = 0;
    generation++;
  }
}

function createSliders() {
  // TODO: Create sliders and connect them to
  //  - mutationRate
  //  - lifespan
  //  - populationSize
  //  - obstacleBonus
  //  - crashDamage
  //  - arriveBonus
}

function showText() {
  // Draw title
  push();
  textSize(60);
  fill(250,0,100);
  textFont('montserrat');
  text(title, 5, 70);
  pop();

  // Draw instructions
  push();
  textSize(18);
  fill(0);
  text(instructions, 5, 175);
  
  // Draw data + credits
  push();
  textSize(30);
  fill(250, 0, 50);
  textFont('montserrat');
  text('Generation: ' + generation, 5, 100);
  textSize(20);
  text('Lifespan: ' + (life - population.fireflies[0].timer), 5,125);
  textSize(20);
  text('Arrived: ' + arrived, 5, 150);
  pop();
  text('by dshijakovski69',740,20);
  pop();
}

function mousePressed() {
  newObs = new Obstacle(mouseX, mouseY, 0, 0);
}

function mouseDragged() {
  newObs.w = mouseX - newObs.pos.x;
  newObs.h = mouseY - newObs.pos.y;
}

function mouseReleased() {

  // Make sure mouse drag in any direction creates a valid obstacle
  const x = newObs.w < 0 ? newObs.pos.x + newObs.w : newObs.pos.x;
  const y = newObs.h < 0 ? newObs.pos.y + newObs.h : newObs.pos.y;
  const w = newObs.w < 0 ? -newObs.w : newObs.w;
  const h = newObs.h < 0 ? -newObs.h : newObs.h;

  const obs = new Obstacle(x, y, w, h);
  obstacles.push(obs);


  if(newObs.w > 10 && newObs.h > 3){
    life += obstacleLifeBonus
  }
  newObs = null;
}