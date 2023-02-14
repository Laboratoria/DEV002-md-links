const { changeToAbsolute,pathRelative, extractLinks, validateLinks,processLinks   } = require('./app')
const fs = require("fs");
const path = require("path");
const { Console } = require('console');

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    

    if(fs.existsSync(path)){
      
      processLinks(extractLinks(path))
   
     // console.log("es relatiuva",pathRelative(path))
     // console.log("es relatiuva",changeToAbsolute(path))
      
      //console.log("mdlinks",checkPath(path));
    //   validateLinks(['http://google.com/ '])
    //  .then(({contStatus, contStatusText}) => console.log({contStatus, contStatusText}))
    //  .catch((error) => console.error(error))
    // console.log("leer archivo", readFiles(path))
     //console.log( findLinks())

     

    } else {
      reject("la ruta no existe")
    }





  })
}
module.exports = {
  mdLinks
}