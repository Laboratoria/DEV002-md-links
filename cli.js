
#!/usr/bin/env node //indica qué programa debe ejecutar el archivo

const mdLinks = require('./mdLinks'); // se importa la función mdLinks
const process = require("process");
const colors = require("colors");

const path2 = process.argv[2];
const pathOptions1 = process.argv[3];
const pathOptions2 = process.argv[4];
const arOptions = [pathOptions1, pathOptions2]; //Se crea un arreglo que contiene las opciones que se van a aplicar al análisis

mdLinks(path2, arOptions);

module.exports = mdLinks;

console.log(colors.bgYellow('Probando...'));
console.log(colors.rainbow('MdLinks'));
console.log(colors.magenta('trabajando con Node.js'));
console.log(colors.bgCyan('<3'));


