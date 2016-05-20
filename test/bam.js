'use strict';

const Bam = require('../bam');
const expect = require('chai').expect;

describe('Bam', () => {
  it('should create a bam properly', () => {
    let dataPairs = [
      [[1, 0, 1, 0, 1, 0], [1, 1, 0, 0]],
      [[1, 1, 1, 0, 1, 0], [1, 1, 0, 0]],
      [[1, 1, 1, 0, 0, 0], [1, 0, 1, 0]]
    ];

    let bam = new Bam(dataPairs)
    let assoc = bam.getAssociation([1, 1, 1, 0, 1, 0]);

    expect(assoc[0]).to.equal(dataPairs[0][1][0]);
    expect(assoc[1]).to.equal(dataPairs[0][1][1]);
  });

  describe('.binaryToBipolar', () => {
    it('should convert binary array to a bipolar array', () => {
      let binaryArr = [1, 0, 0, 1];
      expect(Bam.binaryToBipolar(binaryArr)[0]).to.equal(1);
      expect(Bam.binaryToBipolar(binaryArr)[1]).to.equal(-1);
      expect(Bam.binaryToBipolar(binaryArr)[2]).to.equal(-1);
    });
  });
});
