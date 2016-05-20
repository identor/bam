# Bidirectional associative memory (BAM)

A BAM implementation using node.js


## Installation
Make sure you have NodeJS installed in your machine. See package.json for the specific runtime version used in this project. Version v4.0.0 or higher will do.

### Install npm packages
To install the dependencies required in this project one must use npm for dependency retrieval, you can easily do this by navigation to the directory where `package.json` lies and issue the following command. `npm` is automatically installed upon installation of Node.js.

```
npm install
```

## To run the tests
In this project we used [mocha](https://mochajs.org) for unit tests. To run the tests issue the command seen below.

```
mocha
```

## Dev
Some build tasks for easier development are included in this project, grunt was used for this. Some grunt commands used are `watch, scripts, eshint`.


## Run the test program
We have created a test program for the purpose of word normalization. To run this program issue the command `node word-normalizer.js`. This uses a csv input to build the BAM and then issues a set of recall.

