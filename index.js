/* module.exports = () => {
  // ...
}; */



/* Leer archivos */
const fs = require("fs");
const reExp = /\[([^\]]+)\]\(([^)]+)\)/g
const path = './files/preambulo.md'

const findLinks = new Promise(function(resolve, reject){

  fs.readFile(path, "utf8", (err, data) => {
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
}).finally(() => console.log('Fin de la ejecución'))

/* Validar si es o no un directorio*/
const isDirectoryOrFile = new Promise(function(resolve, reject){

  fs.stat(path, (err, data) => {
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
}).finally(() => console.log('Fin de la ejecución'))