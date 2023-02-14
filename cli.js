#!/usr/bin/env nodo
const { mdLinks } = require("./index.js");
const chalk = require('chalk');

console.log(chalk.magenta.inverse('--------------------Welcome! 📁--------------------'));

mdLinks("./package.json")
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.log(error);
  });
  