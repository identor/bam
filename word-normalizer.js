'use strict';

const Bam = require('./bam').Bam;
const fs = require('fs');
const csvParse = require('csv-parse/lib/sync');
const pad = require('pad');

const NORMAL_LEN = 4 * 8;

function removeSpaces(text) {
  return text.replace(' ', '');
}

function normalizeLength(binaryString, len) {
  return binaryString.substring(0, len);
}

function padZeroes(binaryString, len) {
  return pad(binaryString, len, '0');
}

function toNormalizedBinaryArray(binaryString, len) {
  return padZeroes(normalizeLength(binaryString, len), len).split('').map(c => {
    return +c | 0;
  });
}

function binaryArrayToText(binaryArray) {
  let result = '';
  let charCode = 0;
  for (let i = 0; i < NORMAL_LEN * 8; i++) {
    charCode += (binaryArray[i]) ? Math.pow(2, [Math.abs(i-7) % 8]) : 0;
    if (i % 8 === 7) {
      result += String.fromCharCode(charCode);
      console.log(charCode);
      charCode = 0;
    }
  }
  console.log(result);
  return result;
}

// csv format
let wordsCsv = fs.readFileSync('./words.csv', { encoding: 'utf8' });
let csvData = csvParse(wordsCsv);

// Remove Headers
csvData.shift();

// words: denormalized, normal, denormalizedBinary, normalBinary
let words = [];

words.findWordByNormalBinary = function (binaryArray) {
  return this.find(word => {
    return binaryArray.join('') === word.normalBinary.join('');
  });
};

words.findWordByDenormalizedBinary = function (binaryArray) {
  return this.find(word => {
    return binaryArray.join('') === word.denormalizedBinary.join('');
  });
};

csvData.forEach(tokens => {
  words.push({
    denormalized: tokens[0],
    normal: tokens[1],
    denormalizedBinary: toNormalizedBinaryArray(removeSpaces(tokens[2]), NORMAL_LEN * 8),
    normalBinary: toNormalizedBinaryArray(removeSpaces(tokens[3]), NORMAL_LEN * 8)
  })
});

// Create bam
let bam = new Bam(words.map(word => {
  return [word.normalBinary, word.denormalizedBinary];
}))

// sample recall
let once = words[0];
console.log(binaryArrayToText(once.normal));
//console.log(bam.M);
// console.log(bam.getAssociation(once.normalBinary));
//console.log(once);
//console.log(once.normalBinary);
