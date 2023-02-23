#!/usr/bin/env node
const { mdLinks } = require('./index.js');

mdLinks('./README.md')


.then(() => {
 mdLinks => console.log(mdLinks)


})
.catch((error) => {
    console.log(error)
})








// const [,, ...args] = process.argv

// console.log(`hola mundo ${args}`)



// const { argv } = require('process');
// const { mdLinks } = require('./promise');

// // Interface to get the arguments passed to the
// // node.js process when run in the command line
// let path = argv[2];
// let optionOne = argv[3];
// let optionTwo = argv[4];
// let options = [optionOne, optionTwo];


// mdLinks(path, options);

// module.exports = { mdLinks }

