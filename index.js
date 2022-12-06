/* module.exports = () => {
  // ...
}; */

const fs = require("fs");
const reExp = /\[([^\]]+)\]\(([^)]+)\)/g
const filePath = './files/preambulo.md'

const findLinks = new Promise(function(resolve, reject){

  fs.readFile(filePath, "utf8", (err, data) => {
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

