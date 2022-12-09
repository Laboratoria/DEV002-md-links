const { getAllFilesRecursive, getLinksFromMdFiles, isValidURL } = require("./data.js")

const isValid = require("is-valid-path");

const mdLinks = (rutita) => new Promise((resolve, reject) => {
    if (!isValid(rutita)) {
        reject("INVALID PATH")
    } else {
        const mdFiles = getAllFilesRecursive(rutita)
        getLinksFromMdFiles(mdFiles).then(links => {
            resolve(links)
            // isValidURL(links.flat()).then(link =>{
            //     resolve(link)
            // })
        })
    }
})

const ruta = "./mdtests"
const part1 = "./mdtests/part1.md"
const part2 = "./mdtests/parte2/part2.md"
const part3 = "./mdtests/parte2/parte3/part3.md"
const part4 = "./mdtests/parte2/parte3/parte4/part4.md"
const route = process.argv[2];

mdLinks(route).then(console.log)

module.exports = { mdLinks }