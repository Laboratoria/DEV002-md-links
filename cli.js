const { mdLinks } = require("./index.js");
const chalk = require('chalk');

console.log(chalk.yellow('--------------------Welcome to my library 📁--------------------'));

mdLinks("Testing/PruebaconLinks.md")
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.log(error);
  });