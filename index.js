const { statFun, readDirFun, readFileFun } = require("./data.js")

const path = require("path");
const isValid = require("is-valid-path");
const markdownLinkExtractor = require("markdown-link-extractor");

const ruta = "./mdtests"
const rutaPart1 = "./mdtests/part1.md"
const rutaPart2 = "./mdtests/part2.md"
const rutaPart3 = "./mdtests/part3.md"
const rutaPart4 = "./mdtests/part4.md"

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

const mdLink = (rutita) => new Promise((resolve, reject) => {
    if (!isValid(rutita)) reject("INVALID PATH");
    //console.log("rutita: ", rutita)
    isDirectory(rutita).then(isFolder => {
        if (isFolder) {
            onlyMdFiles(rutita).then(files => {
                //console.log("files: ", files)
                getLinksFromMdFiles(files).then(links => resolve(links))
            })
        } else {
            getLinksFromMdFile(rutita).then(links => {
                //console.log("links: ", links)
                resolve(links)
            })
        }
    })  
})

mdLink(ruta).then(console.log)
// mdLink(rutaPart1)