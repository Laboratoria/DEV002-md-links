



/* Leer archivos */
const fs = require("fs");
const reExp = /\[([^\]]+)\]\(([^)]+)\)/g
const path = require('path')
const route = './files/preambulo.md'
const mdFiles = []

/* const findLinks = new Promise(function(resolve, reject){

  fs.readFile(route, "utf8", (e, data) => {
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
const isDirectoryOrFile = new Promise(function(resolve, reject){

  fs.stat(route, (e, data) => {
    if(data.isDirectory()){
      resolve(isMarkDown)
    } else {
      reject(`Soy un archivo`)
    }
  })
})

/* Buscar los archivos .md en un directorio*/
const isMarkDown = new Promise(function(resolve, reject){

  fs.readdir(route, (e, data) => {

    data?.forEach(item => {
      if(path.extname(item) == '.md'){
        mdFiles.push(item)
      }
    })

    if(mdFiles.length >= 1){
      resolve('si hay archivos mark down: ' + mdFiles)
    } else {
      reject('no hay archivos para mostrar')
    }
  })
})

Promise.allSettled([isDirectoryOrFile, isMarkDown]).then((resultado) => {
  console.log(resultado)
}).catch((error) => {
  console.log(error)
}).finally(() => console.log('Fin de la ejecución'))
