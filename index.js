const { mdLinks } = require("./mdLinks.js")
const route = process.argv[2];
const argumentos = process.argv

try {
    mdLinks(route, argumentos).then(console.log).finally(console.log) /* .catch() */
} catch (error) {
    console.log({error})
}