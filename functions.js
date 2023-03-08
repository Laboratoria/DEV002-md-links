const fs = require("fs");
const path = require("path");
const process = require("process");
const colors = require("colors");
// console.log(fs);

//verficar que la ruta sea válida
// console.log(fs.existsSync('./pruebas'));
const validPath = (route) => fs.existsSync(route);

//ver si la ruta es absoluta
// console.log(path.isAbsolute('./pruebas'));
const absolutePath = (route) => path.isAbsolute(route);

//convierte de relativa en absoluta
// console.log(process.cwd("./pruebas"));
// ruta transformada: C:\Users\tania\OneDrive\Escritorio\Proyectos Laboratoria\mdLinks\DEV002-md-links

const transformAbs = (route) => {
  const validateDirectory = process.cwd();
  return path.resolve(validateDirectory, route);
};

//Validar que sea un directorio
// console.log (fs.statSync('./pruebas'));
// console.log(stats.isDirectory('./pruebas'));

const validDir = (route) => {
  const stats = fs.statSync(route);
  return stats.isDirectory();
};

//lee los archivos del directorio
//console.log(fs.readdirSync('./pruebas')); debería devolver un array con el contenido de ese directorio
const readFile = (route) => fs.readdirSync(route);

//validar que la función sea md
const mdFile = (route) => (path.extname(route) === ".md" ? true : false);

//recursividad
const recursive = (paths) => {
  let arrReadMd = [];
  if (mdFile(paths)) {
    arrReadMd.push(paths); //se llena si la ruta tiene ext md si no es un directorio
  } else if (validDir(paths)) {
    const contentRoute = readFile(paths); //leer las rutas del directorio e itera el contenido que tiene
    contentRoute.forEach((paths) => {
      console.log(
        (arrReadMd = arrReadMd.concat(
         // recursive(`${}/${}`) //concatenar la ruta de los directorios para que me los devuelva en un array
        ))
      ); 
    });
  }
  return arrReadMd;
};

//leer contenidos de archivos md

const readFileMd = (route) => {
  return new Promise((resolve, reject) => {
    fs.readFile(route,"utf-8", (error, data) => {
      if (error) {
        reject("ocurrió un error");
      } else {
        resolve(data);
      }
    });
  });
};

readFileMd('README.md').then((data) => {
 console.log(data) 
 
}).catch((error) => {
  console.log(error)
})
