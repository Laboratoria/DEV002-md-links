const fs = require('fs');
const path = require('path');

// regex para ver si es ruta absoluta
const regEx = /^(\/|[A-Za-z]:\\)/;
function isAbsolute(path) {
  return regEx.test(path);
}
// validando si es absoluta o relativa tmb esta convirtiendo la ruta relativa a absoluta
const changeToAbsolute = (ruta) => {
    if (isAbsolute(ruta)) {
        return ruta;
      } else {
        return path.resolve(ruta);
      }
}



const idDirFil = (path) => {
    
fs.lstat(path, (err, stats) => {
  console.log("que es eto", stats);

    if (err) {
      console.error(err);
    } else if (stats.isDirectory()) {

      console.log('Es una carpeta',stats.isDirectory());
    } else if (stats.isFile()) {
      path.
      console.log('Es un archivo', stats.isFile());
    } else {
      console.log('No es ni una carpeta ni un archivo');
    }
  });
}





// esto es prueba

/*

const absoOurRelative = (path) => {
  return new Promise((resolve, reject) => {
    if (isAbsolute(path)) {
      resolve(path);
    } else {
      resolve(path.resolve(path));
    }
  });
};


const mdLinks = (path) => {

  console.log("absoluta booleano", isAbsolute(path));
  // path == relativa
  return new Promise((resolve, reject) => {
    // resolve =>  relativa al directorio desde donde se invoca node


    // istat para saber si es una carpeta 
    fs.lstat(path, (err, stats) => {
      if (err) {
        console.error(err);
      } else if (stats.isDirectory()) {
        console.log('Es una carpeta');
      } else if (stats.isFile()) {
        console.log('Es un archivo');
      } else {
        console.log('No es ni una carpeta ni un archivo');
      }
    });


    // funcion - chequear o convertir una ruta absoluta
    // probar si esa ruta absoluta  es una archivo o directorio
    //  Si es un directorio filtrar los archivos md. arry filtrado



  })
} */



module.exports = {
  changeToAbsolute, idDirFil, checkPath

};