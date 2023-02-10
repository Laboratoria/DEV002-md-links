const { changeToAbsolute, checkPath, findLinks,readFiles,pathRelative,extractLinks, validateLinks  } = require('./app')
const fs = require("fs");
const path = require("path");

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    

    if(fs.existsSync(path)){

      console.log("es relatiuva",pathRelative(path))
      console.log("es relatiuva",changeToAbsolute(path))
      
      //console.log("mdlinks",checkPath(path));
     // findLinks(['https://www.google.com/search?q=google+traductor&oq=goo&aqs=chrome.0.69i59l2j69i57j69i60l2j69i65l3.1503j0j7&sourceid=chrome&ie=UTF-8'])
     
    // console.log("leer archivo", readFiles(path))
     //console.log( findLinks())

     extractLinks(path)
    .then(validateLinks)
    .then((links) => console.log("linksss",links))
    .catch((error) => console.error(error));

    } else {
      reject("la ruta no existe")
    }
    const { extractLinks, validateLinks } = require('./links.js');




  })
}
module.exports = {
  mdLinks
}