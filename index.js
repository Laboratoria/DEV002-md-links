const { 
  existPath, 
  absolutePath, 
  existFile 
} = require("./functions.js");

const chalk = require("chalk");

// Funcion MdLinks
const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    // Identificar si la ruta exite
    if (!existPath(path)) {
      reject(('The path does not exist'));
    } else {
      console.log(chalk.blueBright('The path exist'));
      const pathAbsolute = absolutePath(path); // Se valida si la ruta es absoluta o relativa
    // Es un archivo tipo .md? 
    if (!existFile(pathAbsolute)) {
      reject(('The file is not .md type'));
    } else {
      console.log(chalk.green('The file is a .md type'));
    }
    } 
  });
};

module.exports = {
  mdLinks,
};