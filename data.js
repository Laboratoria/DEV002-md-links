const fs = require("fs");
const path = require("path");
const markdownLinkExtractor = require("markdown-link-extractor");

/* ASYNC lee los archivos .md */
const readFileFun = (ruta) => {
    return new Promise((resolve, reject) => {
        fs.readFile(ruta, "utf8", (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

/* obtiene los links desde un archivo .md */
const getLinksFromMdFile = (file) => new Promise((resolve, reject) => {
    readFileFun(file).then((gettingLinks)=>{
        const { links } = markdownLinkExtractor(gettingLinks);
        resolve(links)
    })
})

/* obtiene los links desde múltiples archivos .md */
const getLinksFromMdFiles = (mdFiles) => new Promise((resolve, reject) => {
    const promises = mdFiles.map((element) => getLinksFromMdFile(element))
    resolve(Promise.all(promises))
})

const isValidURL = links => {
    const linkitos = Array.isArray(links) ? links : [links]
    const promises = linkitos.map(link => {
        return fetch(link).then(result => {
            if(result.status < 400){
                return { link, isValid: true}
            } else {
                return { link, isValid: true}
            }            
        }).catch(err => {
            return { link, isValid: false}
        })
        })
    return Promise.all(promises)
}

const getAllFilesRecursive = (ruta, files = []) => {
    const stat = fs.statSync(ruta)
    if (stat.isDirectory()) {
        fs.readdirSync(ruta).map(file => {
            const route = path.join(ruta, file);
            const fileStat = fs.statSync(route)
            if(fileStat.isDirectory()) {
                getAllFilesRecursive(route, files)
            }else {
                const filesExts = path.extname(route)
                if (filesExts === ".md") {
                    const resolvePaths = path.resolve(route)
                    files.push(resolvePaths)
                }
            }
        })
        return files
    } else {
        fileExt = path.extname(ruta)
        if (fileExt === ".md") {
            const resolvePaths = path.resolve(ruta)
            files.push(resolvePaths)
            return files
        }
    }
}

module.exports = { getAllFilesRecursive, getLinksFromMdFiles, isValidURL };