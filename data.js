const fs = require("fs");
const path = require("path");
const markdownLinkExtractor = require("markdown-link-extractor");

/* ASYNC ve estatus del archivo */
const statFun = (ruta) => {
    return new Promise((resolve, reject) => {
        fs.stat(ruta, (err, stats) => {
            if (err) {
                console.error("stat error: ", err)
                reject(err)
            } else {
                //console.log("stat: ", stats)
                resolve(stats)
            }
        })
    })
}

/* ASYNC lee los archivos dentro de la carpeta */
const readDirFun = (ruta) => {
    return new Promise((resolve, reject) => {
        fs.readdir(ruta, (err, files) => {
            if (err){
                console.error("readdir error: ", err)
                reject(err)
            }
            else {
                //console.log("files: ", files)
                resolve(files)
            }
        })
    })
}

/* ASYNC lee los archivos .md */
const readFileFun = (ruta) => {
    return new Promise((resolve, reject) => {
        fs.readFile(ruta, "utf8", (err, data) => {
            if (err) {
                //console.error("error 2: ", err);
                reject(err)
            } else {
                //console.log("data:\n", data)
                resolve(data)
            }
        })
    })
}

/* lee función statFun y contiene validación de si es directorio o archivo */
const isDirectory = (ruta) => new Promise((resolve, reject) => {
    statFun(ruta).then((stats)=>{
        /* ve si es archivo */
        //const isFile = stats.isFile()
        //console.log("isFile: ", isFile)
        /* ve si es carpeta */
        const isDirectory = stats.isDirectory()
        //console.log("isDirectory: ", isDirectory)
        resolve(isDirectory)
        //console.log("isDirectory: ", isDirectory)
    })
})

/* console.log de readDirFun, también sirve para utilizar la función */
/**
 * 
 * @param {string} ruta 
 * @returns Promise with the result of all the md files inside the route
 */
const onlyMdFiles = (ruta) => new Promise((resolve, reject) => {
    readDirFun(ruta).then((readDirFunFiles)=> {
        resolve(readDirFunFiles.map((file)=>{
            const fileExt = path.extname(file)
            if (fileExt === ".md") {
                const justMD = file.slice(".md").split(",")
                //console.log("justMD: ", justMD)
                const mdString = justMD.toString()
                //console.log("mdString: ", mdString)
                /* ruta para carpeta */
                const joinPaths = path.join(ruta, mdString)
                //console.log("joinPaths: ", joinPaths)
                const resolvePaths = path.resolve(joinPaths)
                //console.log("resolvePath: ", resolvePaths)
                const resolvePathsString = resolvePaths.toString()
                //console.log("resolvePathsString: ", resolvePathsString)
                return resolvePathsString
            } else {
                return null
            }
        }).filter((value)=> value))
    })
})

const getLinksFromMdFile = (file) => new Promise((resolve, reject) => {
    readFileFun(file).then((gettingLinks)=>{
        //console.log("gettingLinks: ", gettingLinks)
        const { links } = markdownLinkExtractor(gettingLinks);
        resolve(links)
        // links.forEach(link => {
        //     console.log("link: ", link)
        // });
    })
})

const getLinksFromMdFiles = (mdFiles) => new Promise((resolve, reject) => {
    const promises = mdFiles.map((element) => getLinksFromMdFile(element))
    resolve(Promise.all(promises))
})

module.exports = { isDirectory, onlyMdFiles, getLinksFromMdFile, getLinksFromMdFiles };