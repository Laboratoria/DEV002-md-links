



/* Leer archivos */
const fs = require("fs");
const reExp = /\[([^\]]+)\]\(([^)]+)\)/g
const path = require('path')
const route = './files'

/* const findLinks = new Promise(function(resolve, reject){

  fs.readFile(route, "utf8", (err, data) => {
    const links = data.match(reExp)
    if(links){
      resolve(`hay links ${links}`)
    } else {
      reject('no hay links')
    }
  })
})

findLinks.then((resultado) => {
  console.log(resultado)
}).catch((error) => {
  console.log(error)
}).finally(() => console.log('Fin de la ejecución')) */

/* Validar si es o no un directorio*/
/* const isDirectoryOrFile = new Promise(function(resolve, reject){

  fs.stat(route, (err, data) => {
    if(data.isDirectory()){
      resolve(`Soy una carpeta`)
    } else {
      reject(`Soy un archivo`)
    }
  })
})

isDirectoryOrFile.then((resultado) => {
  console.log(resultado)
}).catch((error) => {
  console.log(error)
}).finally(() => console.log('Fin de la ejecución')) */

/* Buscar los archivos .md en un directorio*/
const isMarkDown = new Promise(function(resolve, reject){
  const mdFiles = []

  fs.readdir(route, (e, data) => {
    data.forEach(item => {
      if(path.extname(item) == '.md'){
        mdFiles.push(item)
      }
    })

    if(mdFiles.length >= 1){
      resolve('si hay archivos .md' + mdFiles)
    } else {
      reject('no hay archivos para mostrar')
    }
  })
})

isMarkDown.then((resultado) => {
  console.log(resultado)
}).catch((error) => {
  console.log(error)
}).finally(() => console.log('Fin de la ejecución'))