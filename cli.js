const { mdLinks } = require('./index.js');

mdLinks('./README.md')


.then(() => {
 mdLinks => console.log(mdLinks)
 console.log(process.env); // muestra todas las variables de entorno
console.log(process.argv); // muestra todos los argumentos de línea de comandos
console.log(process.argv[2]); // muestra el tercer argumento

})
.catch((error) => {
    console.log(error)
})

/*absoOurRelative('./README.md')
.then(() =>  {
    absoOurRelative  => console.log(absoOurRelative)

})
.catch((error) => {
    error => console.error(error)
})*/

