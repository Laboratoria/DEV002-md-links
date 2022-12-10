const fs = require("fs");
const axios = require('axios').default;
const reExp = /\[([^\]]+)\]\(([^)]+)\)/g
const path = require('path')
const route = './files/preambulo.md'
const mdFiles = []

/* Evaluar si la ruta es o no valida */
function isRouteValid(route){
  const isRouteValidPromise = new Promise(function(resolve, reject){
    console.log('1', mdFiles)
    fs.access(route, (e) => {
      if(e){
        reject('No se puede acceder a la ruta')
      } else {
        console.log('La ruta es valida')
        resolve(isDirectoryOrFile(route))
      }
    })
  })
  return isRouteValidPromise
}

/* Validar si es o no un directorio*/
function isDirectoryOrFile(route){
  const isDirectoryOrFilePromise = new Promise(function(resolve, reject){
    console.log('2', mdFiles)
    fs.stat(route, (e, data) => {
      if(data.isDirectory()){
        console.log('Soy una carpeta')
        resolve(isThereAnyMarkDown(route))
      } else {
        console.log('Soy un archivo')
        resolve(markDownFile(route))
      }
    })
  })
  return isDirectoryOrFilePromise
}

/* Evaluar si la ruta fue directo a un archivo .md*/
function markDownFile(route){
  const markDownFilePromise = new Promise(function(resolve, reject){
    console.log('3', mdFiles)
    const fileName = path.basename(route)
    if(path.extname(fileName) == '.md'){
      mdFiles.push(fileName)
    }

    if(mdFiles.length >= 1){
      console.log('la ruta fue a un archivo mark down: ' + mdFiles)
      resolve(findLinks(mdFiles))
    } else {
      reject('la ruta fue a un archivo que no es mark down')
    }
  })
  return markDownFilePromise
}

/* Buscar los archivos .md en un directorio*/
function isThereAnyMarkDown(route){
  const isThereAnyMarkDownPromise = new Promise(function(resolve, reject){
    console.log('3', mdFiles)
    fs.readdir(route, (e, data) => {
      data?.forEach(item => {
        if(path.extname(item) == '.md'){
          mdFiles.push(item)
        }
      })
      if(mdFiles.length >= 1){
        console.log('si hay archivos mark down: ' + mdFiles)
        resolve(findLinks(mdFiles))
      } else {
        reject('no hay archivos para mostrar')
      }
    })
  })
  return isThereAnyMarkDownPromise
}

/* Leer archivos */
function findLinks(mdFilesList) {
  console.log('4: ' + mdFilesList)
  const findLinksPromise = new Promise(function(resolve, reject){
    mdFilesList.forEach(file => {
      /* hacer caso de uso para cuando viene de un archivo directo, porque la url viene /archivo.md/archivo.md */
      fs.readFile(path.resolve(route, file), "utf8", (e, data) => {
        const links = data.match(reExp)
        if(links){
          const response = links.map(link => {
            const linkArray = link.split(']')
            const linkName = linkArray[0].substring(1)
            const linkUrl = linkArray[1].substring(1, linkArray[1].length - 1)
            const linkR = path.resolve(route, file).replace('\\\\', '\\')
            const linkObject = {
              name: linkName,
              url: linkUrl,
              linkRoute: linkR,
            }
            return linkObject
          })
          resolve(response)
        } else {
          reject('no hay links')
        }
      })
    })
  })
  return findLinksPromise
}

/* funcion validar link */
function getValidate(links){
  const getValidatePromise = new Promise(function(resolve, reject){
    const res = links.map(link => {
      return axios.get(link.url)
        .then(function (response) {
          return{
            ...link,
            valid: {
              responseCode: response.status,
              statusText: response.statusText
            }
          }
        })
        .catch(function (error) {
          return {
            ...link,
            valid: {
              responseCode: error.code,
              statusText: 'Failed'
            }
          }
        })
      })
    if(res){
      const linksObjects = Promise.allSettled(res).then(links => links.map(link => {
        return {
          name: link.value.name,
          url: link.value.url,
          linkRoute: link.value.linkRoute,
          valid: {...link.value.valid}
        }
      }))
      resolve(linksObjects)
    }
  })
  return getValidatePromise
}

function inicial(route, validateUrl){
  isRouteValid(route).then(links => {
    if(!validateUrl){
      return console.log(links)
    }
    getValidate(links).then(linkArray => console.log(linkArray))
  }).catch((error) => {
    console.log(error)
  }).finally(() => console.log('Fin de la ejecución'))
}

inicial(route, false)