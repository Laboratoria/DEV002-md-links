const fs = require("fs");

const absolutePath = (path) => {
  return new Promise((resolve, reject) => {
    // Identificar si la ruta exite
    if (fs.existsSync(path)) {
      //Si la ruta no existe se rechaza la promesa
      // Chequear o convertir a una ruta absoluta
      // Probar si es una ruta absoluta es un archivo o un directorio
      // Si es un directorio filtrar los archivos md.
      resolve("The path is absolute");
    } else {
      //Si la ruta no existe se rechaza la promesa
      reject("The path is not absolute");
    }
  });
};

module.exports = {
  absolutePath,
};