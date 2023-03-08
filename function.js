const fs = require ('fs');
const path = require('path')
const process = require('process')
//console.log(path)


//verificar que la ruta es valida
const validateRoute = (pathRoute) => fs.existsSync(pathRoute)

//valida si es absoluta
const absoluteRoute = (pathRoute) => path.isAbsolute(pathRoute);

//convierte relativa en absoluta
const convertAbsulute = (pathRoute) => {
const validateDirectory = process.cwd();
return path.resolve(validateDirectory, pathRoute);
}

//validar que sea un directorio
const validateDirectory = (pathRoute) => {
const stats = fs.statSync(pathRoute)
return stats.isDirectory()
}

//leer los archivos de ese directorio // devuelve un arr con el contenido del direct
const readDirectory = (pathRoute) => fs.readdirSync(pathRoute);

//validar que la extención sea .md
const validateRouteMd = (pathRoute) => path.extname(pathRoute)==='.md' ? true : false

//leer archivos md
const RecursiveFunction = (pathRoutes) =>{
const arrReadMd = []
if(validateRouteMd(pathRoutes)){
arrReadMd.push(pathRoutes) //se llena si la ruta tiene ext md si no es un directory
}else if(validateDirectory(pathRoutes)){ //leer las rutas del directorio 
const contentRoute = readDirectory(pathRoutes)
contentRoute.forEach((routes) => {
console.log(routes)
} )
}
}
RecursiveFunction('ej2')