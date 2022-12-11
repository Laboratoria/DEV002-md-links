const { mdLinks } = require("./mdLinks.js")
const route = process.argv[2];
const argumentos = process.argv

// ./mdtests
// ./mdtests --validate
// ./mdtests --stats
// ./mdtests --validate --stats

try {
    mdLinks(route, argumentos).then(console.log).finally(console.log) /* .catch() */
} catch (error) {
    console.log({error})
}