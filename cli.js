
#!/usr/bin/env node

const mdLinks = require('./mdLinks');
const process = require("process");
const colors = require("colors");

const pathRoute2 = process.argv[2];
const pathOptions1 = process.argv[3];
const pathROptions2 = process.argv[4];
const arOptions = [pathOptions1, pathOptions2];

mdLinks(pathRoute2, arrOptions);

module.exports = mdLinks;

console.log(colors.bgYellow('Probando...'));
console.log(colors.rainbow('MdLinks'));
console.log(colors.magenta('trabajando con Node.js'));
console.log(colors.bgCyan('<3'));


