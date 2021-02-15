class Population {

  constructor() {
    this.fireflies = [];
    this.size = defaultPopulationSize;
    for (var i = 0; i < this.size; i++) {
      this.fireflies[i] = new Firefly();
    }
    this.matingPool = [];
  }

  evaluate(target) {
    for (var firefly of this.fireflies) {
      firefly.calcFitness(target);
    }

    var max = 0;
    for (firefly of this.fireflies) {
      if (max < firefly.fitness)
        max = firefly.fitness;
    }

    for (firefly of this.fireflies) {
      firefly.fitness /= max;
    }
  }

  selection() {
    this.matingPool = [];
    for (var f of this.fireflies) {
      var n = f.fitness * 100;
      for (var i = 0; i < n; i++) {
        this.matingPool.push(f);
      }
    } // Created mating pool
  }

  nextGeneration() {
    this.fireflies = [];
    for (var i = 0; i < this.size; i++) {
      var dna1 = random(this.matingPool).dna;
      var dna2 = random(this.matingPool).dna;

      var childDNA = dna1.crossover(dna2);
      
      if (random(1) < mutationRate) {
        childDNA.mutate();
      }
      
      this.fireflies[i] = new Firefly(childDNA);
    }
  }


}