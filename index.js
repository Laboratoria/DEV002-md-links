const { pathAbsolute, changeToAbsolute, checkPath } = require('./app')
const fs = require("fs");
const path = require("path");

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    

    if(fs.existsSync(path)){
      console.log(" dino q es",changeToAbsolute(path))
      findLinks(path)
      
      console.log("sdsfsdf",checkPath(path));


    } else {
      reject("la ruta no existe")
    }
  })
}
module.exports = {
  mdLinks
}