const { getAllFilesRecursive, getLinksFromMdFiles, isValidURL, validateFlag, statsFlag, totalLinks, totalBrokenLinks, totalValidLinks } = require("./data.js")
const isValid = require("is-valid-path");

const route = process.argv[2];
const argumentos = process.argv

const mdLinks = (rutita) => new Promise((resolve, reject) => {
    if(!validateFlag(argumentos) && !statsFlag(argumentos)){
        if (!isValid(rutita)) {
            reject("INVALID PATH")
        } else {
            const mdFiles = getAllFilesRecursive(rutita)
            getLinksFromMdFiles(mdFiles).then(links => {
                resolve(links)
            })
        }
    } else if (validateFlag(argumentos) && !statsFlag(argumentos)){
        if (!isValid(rutita)) {
            reject("INVALID PATH")
        } else {
            const mdFiles = getAllFilesRecursive(rutita)
            getLinksFromMdFiles(mdFiles).then(links => {
                isValidURL(links.flat()).then(link =>{
                    resolve(link)
                })
            })
        }
    } else if (statsFlag(argumentos) && !validateFlag(argumentos)){
        if (!isValid(rutita)) {
            reject("INVALID PATH")
        } else {
            const mdFiles = getAllFilesRecursive(rutita)
            getLinksFromMdFiles(mdFiles).then(links => {
                const sumLinks = totalLinks(links)
                resolve({ totalLinks: sumLinks })
            })
        }
    } else if (validateFlag(argumentos) && statsFlag(argumentos)){
        if (!isValid(rutita)) {
            reject("INVALID PATH")
        } else {
            const mdFiles = getAllFilesRecursive(rutita)
            getLinksFromMdFiles(mdFiles).then(links => {
                const sumLinks = totalLinks(links)
                const brokenLinks = totalBrokenLinks(links)
                const validLinks = totalValidLinks(links)
                resolve({ totalLinks: sumLinks, validLinks: validLinks, brokenLinks: brokenLinks })
            })
        }
    }
})

// const ruta = "./mdtests"
// const part1 = "./mdtests/part1.md"
// const part2 = "./mdtests/parte2/part2.md"
// const part3 = "./mdtests/parte2/parte3/part3.md"
// const part4 = "./mdtests/parte2/parte3/parte4/part4.md"

mdLinks(route).then(console.log)

module.exports = { mdLinks }