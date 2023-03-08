const fs = require('fs'); 
const path = require('path');
const process = require('process');
const colors = require('colors');
// console.log(fs);

//verficar que la ruta sea válida
// console.log(fs.existsSync('./pruebas'));
const validPath = (route) => fs.existsSync(route);

//ver si la ruta es absoluta
// console.log(path.isAbsolute('./pruebas'));
const absolutePath = (route) => path.isAbsolute(route);

//convierte de relativa en absoluta
// console.log (process.cwd('./pruebas'));
// ruta transformada: C:\Users\tania\OneDrive\Escritorio\Proyectos Laboratoria\mdLinks\DEV002-md-links

const transformAbs = (route) => {
    const validateDirectory = process.cwd();
    return path.resolve(validateDirectory, route);
};

//Validar que sea un directorio
// console.log (fs.statSync('./pruebas'));
// console.log(stats.isDirectory('./pruebas'));
const validateDirectory = (route) => {
    const stats = fs.statSync(route);
    return stats.isDirectory();
};

//lee los archivos del directorio
//console.log(fs.readdirSync('./pruebas')); debería devolver un array con el contenido de ese directorio
const readDir = (route) => fs.readdirSync(route);

//validar que la función sea md
