'use strict';

const pad = require('pad');

class Utils {
  static removeSpaces(text) {
    return text.replace(' ', '');
  }

  static normalizeLength(binaryString, len) {
    return binaryString.substring(0, len);
  }

  static sanitizeResultingText(text) {
    return text.split('').filter(c => c !== '\u0001').join('');
  }

  static padZeroes(binaryString, len) {
    return pad(binaryString, len, '0');
  }

  static toNormalizedBinaryArray(binaryString, len) {
    return Utils.padZeroes(Utils.normalizeLength(binaryString, len), len).split('').map(c => {
      return +c | 0;
    });
  }

  static binaryToAscii(binary8Array) {
    let charCode = 0;

    for (let i = 0; i < binary8Array.length; i++) {
      let base = binary8Array[i] * 2;
      let power = Math.abs(i-7);
      charCode += Math.pow(base, power);
    }

    return String.fromCharCode(charCode);
  }

  static chunkArray(array, chunkSize) {
    let result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i+chunkSize));
    }
    return result;
  }

  static binaryArrayToText(binaryArray) {
    let chunkArray = Utils.chunkArray(binaryArray, 8);
    return Utils.sanitizeResultingText(chunkArray.reduce((prev, curr) => {
      return prev += Utils.binaryToAscii(curr);
    }, ''));
  }
}

module.exports = Utils;