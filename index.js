const { changeToAbsolute, checkPath, findLinks,readFiles } = require('./app')
const fs = require("fs");
const path = require("path");

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    

    if(fs.existsSync(path)){
      //console.log(" dino q es",changeToAbsolute(path))
      //const arrPaths = checkPath(path);
      
      console.log("mdlinks",checkPath(path));
     // findLinks(['https://www.google.com/search?q=google+traductor&oq=goo&aqs=chrome.0.69i59l2j69i57j69i60l2j69i65l3.1503j0j7&sourceid=chrome&ie=UTF-8'])
     
     console.log("leer archivo", readFiles(path))
     console.log( findLinks())

    } else {
      reject("la ruta no existe")
    }
  })
}
module.exports = {
  mdLinks
}