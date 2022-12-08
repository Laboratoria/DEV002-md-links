const fs = require("fs");
const reExp = /\[([^\]]+)\]\(([^)]+)\)/g
const path = require('path')
const route = './files'
const mdFiles = []

/* Evaluar si la ruta es o no valida */
const isRouteValid = new Promise(function(resolve, reject){
  fs.access(route, (e) => {
    if(e){
      reject('No se puede acceder a la ruta')
    } else {
      console.log('La ruta es valida')
      resolve(isDirectoryOrFile)
    }
  })
})

/* isRouteValid.then((resultado) => {
  console.log(resultado)
}).catch((error) => {
  console.log(error)
}).finally(() => console.log('Fin de la ejecución')) */

/* Validar si es o no un directorio*/
const isDirectoryOrFile = new Promise(function(resolve, reject){

  fs.stat(route, (e, data) => {
    if(data.isDirectory()){
      console.log('Soy una carpeta')
      resolve(isMarkDown)
    } else {
      reject('soy un archivo')
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
      console.log('si hay archivos mark down: ' + mdFiles)
      resolve(findLinks)
    } else {
      reject('no hay archivos para mostrar')
    }
  })
})

/* Leer archivos */


const findLinks = new Promise(function(resolve, reject){

  mdFiles.forEach(file => {
    fs.readFile(path.resolve(route, file), "utf8", (e, data) => {
      const links = data.match(reExp)
      if(links){
        resolve(`los links son: ${links}`)
      } else {
        reject('no hay links')
      }
    })
  })
})

Promise.allSettled([isRouteValid, isDirectoryOrFile, isMarkDown, findLinks]).then((resultado) => {
  console.log(resultado)
}).catch((error) => {
  console.log(error)
}).finally(() => console.log('Fin de la ejecución'))
