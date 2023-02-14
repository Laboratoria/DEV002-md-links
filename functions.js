const fs = require("fs");
const path = require("path");
const axios = require("axios");

// Función para validar si existe la ruta
const existPath = (paths) => fs.existsSync(paths);

// Funcion para validar si la ruta es relativa o absoluta y si es relativa se pasa a absoluta
const absolutePath = (paths) => {
  return path.isAbsolute(paths) ? paths : path.resolve(paths); 
};
// Funcion para validar si el archivo es tipo .md
const existFile = (paths) => path.extname(paths) === '.md';

// Función que valida si es un archivo (file)
const validateFile = (paths) => fs.statSync(paths).isFile();

//  Función que valida si el path es un directorio
const validateDirectory = (paths) => fs.statSync(paths).isDirectory();


module.exports = {
  existPath,
  absolutePath,
  existFile,
};