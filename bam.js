'use strict';

module.exports = class Bam {
  constructor(data) {
    this.AB = [];

    // Store bipolar array associations
    data.forEach(pair => this.AB.push([
      Bam.binaryToBipolar(pair[0]), Bam.binaryToBipolar(pair[1])
    ]));

    // Matrix dimensions based on data pairs
    this.lenX = this.AB[0][1].length;
    this.lenY = this.AB[0][0].length;

    // create empty BAM matrix
    this.M = (new Array(this.lenY)).fill([]).map(() => {
      return new Array(this.lenX).fill(0);
    });

    this.createBam();
  }

  createBam() {
    this.AB.forEach(associativePair => {
      let X = associativePair[0];
      let Y = associativePair[1];

      X.forEach((xi, idx) => Y.forEach((yi, idy) => {
        this.M[idx][idy] += xi * yi;
      }));
    });
  }

  getAssociation(A) {
    A = this.multiplyMatrixVector(A);
    return Bam.threshhold(A);
  }

  static threshhold(vector) {
    return vector.map(n => {
      return (n > 0) ? 1 : 0;
    });
  }

  multiplyMatrixVector(vector) {
    let result = (new Array(this.lenX)).fill(0);

    this.M.forEach((rows, iy) => rows.forEach((data, ix) => {
      result[ix] += vector[iy] * data;
    }));

    return result;
  }

  static binaryToBipolar(array) {
    return array.map(binary => {
      return [-1, 1][binary];
    });
  }
}

