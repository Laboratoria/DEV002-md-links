const {
  existPath,
  existMdFile,
  validateReadFileMd,
  getLinks,
  linkToObject,
  validateDirectory,
  readAllFilesRecursive
} = require("./functions.js");


const chalk = require("chalk");
let mdFilesArray = [];


const mdLinks = (path, options) => {

  return new Promise((resolve, reject) => {

    if (!existPath(path)) {
      reject("The path does not exist");
    } else {
      console.log(chalk.magenta("The path exist"));
      if (validateDirectory(path)) {
        readAllFilesRecursive(path).forEach(file => {
          if (existMdFile(file)) {
            mdFilesArray.push(file)
          } else {
            if (mdFilesArray === []) {
              console.log("no .md files")
            }
          }
        });
      } else {
        if (existMdFile(path)) {
          mdFilesArray.push(path)
        } else {
          console.log("no .md files")
        }
      }
      if (mdFilesArray != null) {
        let arrayLinks = [];
        mdFilesArray.forEach(element => {
          const texto = validateReadFileMd(element);
          const links = getLinks(texto);
          if (links != null) {
            links.forEach((link) => {
              arrayLinks.push(linkToObject(link, element));
            });
          } else {
            console.log("The file " + element + " does not have links");
          }
        });
        console.log(arrayLinks)
      }
    }
  }
  )
};

module.exports = {
  mdLinks,
};