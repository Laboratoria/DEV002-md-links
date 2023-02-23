
const { getAbsolutePath,checkPath,isDirectory, readDir, extractLinks,processLinks,isMdFile } = require('./app')
const fs = require("fs");
const path = require("path");

const mdLinks = (relativePath, options) => {
 

   return getAbsolutePath(relativePath)
    .then((absolutePath) => {
      if (!checkPath(absolutePath)) {
        throw new Error('La ruta no es absoluta');
      }
      return isDirectory(absolutePath)
        .then((isDir) => {
          if (isDir) {
            return readDir(absolutePath)
              .then((files) => {
                const mdFiles = files.filter((file) => isMdFile(file));
                const promises = mdFiles.map((file) =>
                  extractLinks(path.join(absolutePath, file)).then((links) =>
                    Promise.all(processLinks(links))
                  )
                );
                return Promise.all(promises).then((results) => [].concat(...results));
              });
          } else {
            return extractLinks(absolutePath).then((links) =>
              Promise.all(processLinks(links))
            );
          }
        });
    })
    .catch((error) => {
      console.error(error);
    });

   // if(fs.existsSync(path)){
      
    // const objFalse = processLinks(extractLinks(path))
     //////console.log("objs false", objFalse)
    ////  objFalse
      //.then(console.log)
     // console.log("es relatiuva",pathRelative(path))
     // console.log("es relatiuva",changeToAbsolute(path))
      
      //console.log("mdlinks",checkPath(path));
    //   validateLinks(['http://google.com/ '])
    //  .then(({contStatus, contStatusText}) => console.log({contStatus, contStatusText}))
    //  .catch((error) => console.error(error))
    // console.log("leer archivo", readFiles(path))
     //console.log( findLinks())

     

   // } else {
      //reject("la ruta no existe")
  //  }







module.exports = {
  mdLinks
}
