const process = require("process")
const { mdLinks } = require("./index.js")
const {getPathFromArguments, getOptionsFromArguments} = require("./md_links")

const arguments = process.argv;

mdLinks(getPathFromArguments(arguments), getOptionsFromArguments(arguments))
  .then(response => console.log(response))
  .catch(error => console.log(error));

module.exports = { mdLinks }


