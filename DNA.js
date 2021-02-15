class DNA {

  constructor(genes) {
    if (genes) {
      this.genes = genes;
    } else {
      this.genes = [];
      for (var i = 0; i < life; i++) {
        this.genes[i] = p5.Vector.random2D();
      }
    }
  }

  crossover(dna2) {
    var childDNA = [];
    var midpoint = floor(random(life));
    for (var i = 0; i < life; i++) {
      if (i < midpoint) {
        childDNA[i] = this.genes[i];
      } else {
        childDNA[i] = dna2.genes[i];
      }
    }
    return new DNA(childDNA);
  }

  mutate() {
    for (var i = 0; i < (mutationRate * 100)/4; i++) {
      var index = floor(random(this.genes.length));
      this.genes[index] = p5.Vector.random2D();
    }
  }
}