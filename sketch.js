let target;
let population;
let backgroundIMG;
let obstacles = [];
let newObs = null;
let generation = 1;
let arrived = 0;
let nextGen = false;
let newGen = false;
let repositionTarget = false;


// Default setup
let defaultMutationRate = 0.05;
let defaultPopulationSize = 200;
let defaultLifespan = 250;
let defaultArriveBonus = 100;
let defaultCrashDamage = 100;

// Sliders data
let mutationRate;
let populationSize;
let life;
let arriveBonus;
let crashDamage;
let obstacleLifeBonus = 20;

// Slider objects
let mutationRateSlider;
let populationSizeSlider;
let lifespanSlider;
let arriveSlider;
let crashSlider;

// Span values
let mutationRateValue;
let populationSizeValue;
let lifespanValue;
let arriveValue;
let crashValue;

// Text
const title = 'FIREFLIES';
const instructions = 'Click/Touch and drag to create\nobstacles for the Fireflies :)';
const creator = "dsijakovski98";

function preload() {
  backgroundIMG = loadImage('pozadina.png');
}


function setup() {
  createCanvas(900, 595);
  if(!newGen) {
    createSliders();
    addSlidersEventListeners();
  }

  population = new Population();
  target = new Target();
  newGen = false;
}

function draw() {
  background(backgroundIMG);
  showText();
  
  target.show();

  for (var obstacle of obstacles) {
    obstacle.show();
  }
  for (var firefly of population.fireflies) {
    firefly.show(target);
    firefly.update(target);
  }

  if (!nextGen) {
    for (var i = 0; i < population.fireflies.length; i++) {
        population.fireflies[i].checkObstacles(obstacles);
    }
  }

  if (newObs) {
    newObs.show();
  }

  if(newGen) {
    setup();
  }

  // End of generation code
  if (nextGen) {
    //GA
    nextGen = false;
    population.evaluate(target);

    population.selection();
    population.nextGeneration();
    arrived = 0;
    generation++;
  }
}

function createSliders() {
  // TODO: Create sliders and connect them to
  //  - mutationRate
  mutationRateSlider = document.querySelector("#mutation-rate-slider");
  mutationRateSlider.setAttribute("value", defaultMutationRate);
  mutationRateValue = document.querySelector("#mutation-rate-value");
  mutationRateValue.innerHTML = defaultMutationRate * 100 + "%";
  mutationRate = defaultMutationRate;
  
  //  - populationSize
  populationSizeSlider = document.querySelector("#population-size-slider");
  populationSizeSlider.setAttribute("value", defaultPopulationSize);
  populationSizeValue = document.querySelector("#population-size-value");
  populationSizeValue.innerHTML = defaultPopulationSize;
  populationSize = defaultPopulationSize;
  
  //  - lifespan
  lifespanSlider = document.querySelector("#life-span-slider");
  lifespanSlider.setAttribute("value", defaultLifespan);
  lifespanValue = document.querySelector("#life-span-value");
  lifespanValue.innerHTML = defaultLifespan;
  life = defaultLifespan;
  
  //  - arriveBonus
  arriveSlider = document.querySelector("#arrive-bonus-slider");
  arriveSlider.setAttribute("value", defaultArriveBonus);
  arriveValue = document.querySelector("#arrive-bonus-value");
  arriveValue.innerHTML = defaultArriveBonus;
  arriveBonus = defaultArriveBonus;

  //  - crashDamage
  crashSlider = document.querySelector("#crash-damage-slider");
  crashSlider.setAttribute("value", defaultCrashDamage);
  crashValue = document.querySelector("#crash-damage-value");
  crashValue.innerHTML = defaultCrashDamage;
  crashDamage = defaultCrashDamage;

}

function addSlidersEventListeners() {
  mutationRateSlider.addEventListener("change", e => {
      const value = e.target.value;
      mutationRateValue.innerHTML = value * 100 + "%";;
      mutationRate = value;
  });

  populationSizeSlider.addEventListener("change", e => {
    const value = e.target.value;
    populationSizeValue.innerHTML = value;
    populationSize = value;
    newGen = true;
  });

  lifespanSlider.addEventListener("change", e => {
    const value = e.target.value;
    lifespanValue.innerHTML = value;
    life = value;
    newGen = true;
  });

  arriveSlider.addEventListener("change", e => {
    const value = e.target.value;
    arriveValue.innerHTML = value;
    arriveBonus = value;
  });

  crashSlider.addEventListener("change", e => {
    const value = e.target.value;
    crashValue.innerHTML = value;
    crashDamage = value;
  });
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
  text('Genetic algorithm demo', 700, 40);
  textStyle("bold");
  text('by ' + creator, 748, 62);
  pop();
}

function mousePressed() {
  if(target.checkMouseOver(mouseX, mouseY)) {
    console.log("Target Clicked");
    repositionTarget = true;
  }
  else {
    newObs = new Obstacle(mouseX, mouseY, 0, 0);
    repositionTarget = false;
  }
}

function mouseDragged() {
  if(repositionTarget) {
    target.x = mouseX;
    target.y = mouseY;
  } 
  else if(newObs) {
    newObs.w = mouseX - newObs.pos.x;
    newObs.h = mouseY - newObs.pos.y;
  }
}

function mouseReleased() {
  repositionTarget = false;
  if(!newObs) return;

  // Make sure mouse drag in any direction creates a valid obstacle
  const x = newObs.w < 0 ? newObs.pos.x + newObs.w : newObs.pos.x;
  const y = newObs.h < 0 ? newObs.pos.y + newObs.h : newObs.pos.y;
  const w = newObs.w < 0 ? -newObs.w : newObs.w;
  const h = newObs.h < 0 ? -newObs.h : newObs.h;

  const obs = new Obstacle(x, y, w, h);
  obstacles.push(obs);


  if(obs.w > 10 && obs.h > 10){
    life += obstacleLifeBonus
  }
  newObs = null;
}