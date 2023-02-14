const { existsSync } = require("fs");
const { isAbsolute } = require("path");

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

module.exports = { routExist, validateAbsolute };