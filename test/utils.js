'use strict';

const Utils = require('../utils');
const expect = require('chai').expect;

describe('Utils', () => {
  it('should run', () => {
    let testCase = '01001111011011100011000110011001'.split('').map(i => +i); // character A
    let chunkArray = Utils.chunkArray(testCase, 8);
    let binaryArrayToText = Utils.binaryArrayToText(testCase);
    //console.log(chunkArray);
  });

  describe('.binaryArrayToText', () => {
    it('should correctly convert binary array to text', () => {
      let testCase, result;

      // one
      testCase = '01000001'.split('').map(i => +i); // character A
      result = Utils.binaryArrayToText(testCase);
      expect(result.length).to.equal(1);
      expect(result.toString()).to.equal('A');

      // two
      testCase = '001100010110001101100101'.split('').map(i => +i); // 1ce
      result = Utils.binaryArrayToText(testCase);
      expect(result.toString()).to.equal('1ce');
    });
  });

  describe('.binaryToAscii', () => {
    it('should correctly convert binary array to ascii', () => {
      let testCase, result;
      testCase = '01000001'.split('').map(i => +i); // character A
      result = Utils.binaryToAscii(testCase);
      expect(result.toString()).to.equal('A');
    });
  });
});
