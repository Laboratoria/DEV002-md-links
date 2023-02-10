const { mdLinks } = require('./index.js');

console.log('--------------------Bienvenido--------------------');

mdLinks('/noexiste/').then(() => {})
.catch((error) => {
    console.log(error)
});