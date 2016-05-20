'use strict';

const Bam = require('./bam')
const fs = require('fs');
const csvParse = require('csv-parse/lib/sync');
const Utils = require('./utils');

const NORMAL_LEN = 4 * 8;

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

csvData = csvData.slice(0, 1);

csvData.forEach(tokens => {
  words.push({
    denormalized: tokens[0],
    normal: tokens[1],
    denormalizedBinary: Utils.toNormalizedBinaryArray(Utils.removeSpaces(tokens[2]), NORMAL_LEN * 8),
    normalBinary: Utils.toNormalizedBinaryArray(Utils.removeSpaces(tokens[3]), NORMAL_LEN * 8)
  })
});

// Create bam
let bam = new Bam(words.map(word => {
  return [word.normalBinary, word.denormalizedBinary];
}))

// Get association And Format
function gaaf(binaryArray) {
  return Utils.binaryArrayToText(bam.getAssociation(binaryArray));
}

// sample recall
let once = words[0];
console.log(gaaf(words[0].normalBinary));
console.log(gaaf(words[0].denormalizedBinary));
//console.log(bam.M);
//console.log(bam.M);
// console.log(bam.getAssociation(once.normalBinary));
//console.log(once);
//console.log(once.normalBinary);
