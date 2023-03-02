const fs = require('fs');
const path = require('path');

const {
  fileExists,
  checkPath,
  getAbsolutePath,
  isMdFile,
  readDir,
  isDirectory,
  extractLinks,
  validateLinks,
  processLinks,
}
= require('./app')


const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {

  validateLinks(['http://google.com/ '])
  .then(({contStatus, contStatusText}) => console.log({contStatus, contStatusText}))
     
   
  });
};

 

   // if(fs.existsSync(path)){
      
    // const objFalse = processLinks(extractLinks(path))
     //////console.log("objs false", objFalse)
    ////  objFalse
      //.then(console.log)
     // console.log("es relatiuva",pathRelative(path))
     // console.log("es relatiuva",changeToAbsolute(path))
      
      //console.log("mdlinks",checkPath(path));
    //   
    //  .catch((error) => console.error(error))
    // console.log("leer archivo", readFiles(path))
     //console.log( findLinks())

     

   // } else {
      //reject("la ruta no existe")
  //  }







module.exports = {
  mdLinks
}
