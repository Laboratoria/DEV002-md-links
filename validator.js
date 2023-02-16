const { existsSync, statSync } = require("fs");
const { isAbsolute, resolve } = require("path");
const { cwd } = require("process");


/**
 * 
 * @param {string} pathname ésta es la ruta
 * @returns se valida si existe un path y retorna un boolean
 */
const routExist = (pathname) => {
  const isValid = existsSync(pathname);
  return isValid ? true : false;
};

/**
 * 
 * @param {string} pathname ésta es la ruta
 * @returns se valida si la ruta es absoluta
 */
const validateAbsolute = (pathname) => {
  const absolut = isAbsolute(pathname);
  return absolut ? true : false;
};

/**
 * 
 * @param {string} pathname es la ruta relativa 
 * @returns una ruta absoluta
 */
const converToAbsolute = (pathname) => {
 const almacenRelativa = cwd();
 return resolve(almacenRelativa, pathname);
}



const isAdirectory = (pathname) => {
 const state = statSync(pathname);
 return state.isDirectory() ? true : false;
}

module.exports = { routExist, validateAbsolute, converToAbsolute, isAdirectory };