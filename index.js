const fs = require('fs'); //modulo de node.js lee, escribe archivos...
const path = require('path'); //modulo de node.js trabaja con rutas de archivos en los directorios

const colors = require('colors');

// Función para ver si la ruta existe  
const validPath = (route) => fs.existsSync(route);

//Función para ver si la ruta es un archivo 
const file = (route) => fs.statSync(route).file(); 

//Función para ver si es un archivo md
const mdFile = (route) => (path.extname(route) === '.md');



//Función para hacerla absoluta | en caso de ser relativa la convierte
const absolutePath = (route) => (path.isAbsolute(route) ? route : path.resolve(route));


console.log(colors.blue('Probando...'));
console.log(colors.rainbow('MdLinks'));
console.log(colors.magenta('trabajando con Node.js'));
console.log(colors.bgCyan('<3'));

module.exports = {
  validPath,
  file,
  mdFile,
  absolutePath,

};


