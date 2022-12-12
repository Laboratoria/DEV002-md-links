const { getAllFilesRecursive, getLinksFromMdFiles, isValidURL, validateFlag, statsFlag, totalLinks, totalBrokenLinks, totalValidLinks } = require("./data.js")
const isValid = require("is-valid-path");

const mdLinks = (rutita, argumentos) => new Promise((resolve, reject) => {
    if (!isValid(rutita)) reject("INVALID PATH")
    if(!validateFlag(argumentos) && !statsFlag(argumentos)){
        const mdFiles = getAllFilesRecursive(rutita)
        getLinksFromMdFiles(mdFiles).then(links => {
            resolve(links)
        })
    } else if (validateFlag(argumentos) && !statsFlag(argumentos)){
        const mdFiles = getAllFilesRecursive(rutita)
        getLinksFromMdFiles(mdFiles).then(links => {
            isValidURL(links.flat()).then(link =>{
                resolve(link)
            })
        })
    } else if (statsFlag(argumentos) && !validateFlag(argumentos)){
        const mdFiles = getAllFilesRecursive(rutita)
        getLinksFromMdFiles(mdFiles).then(links => {
            const sumLinks = totalLinks(links)
            resolve({ totalLinks: sumLinks })
        })
    } else if (validateFlag(argumentos) && statsFlag(argumentos)){
        const mdFiles = getAllFilesRecursive(rutita)
        getLinksFromMdFiles(mdFiles).then(links => {
            isValidURL(links.flat()).then(link =>{
                const sumLinks = totalLinks(link)
                const brokenLinks = totalBrokenLinks(link)
                const validLinks = totalValidLinks(link)
                resolve({ totalLinks: sumLinks, validLinks: validLinks, brokenLinks: brokenLinks })
            })
        })
    }
})

module.exports = { mdLinks }