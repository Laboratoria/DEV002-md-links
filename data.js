const fs = require("fs");
const path = require("path");
const isValid = require("is-valid-path");
const markdownLinkExtractor = require("markdown-link-extractor");

const ruta = "./mdtests"
const rutaPart1 = "./mdtests/part1.md"
const rutaPart2 = "./mdtests/part2.md"

/* ve si la ruta es válida, true o false*/
const validPath = isValid(ruta)
    //console.log("validPath: ", validPath)

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

/* va para index.js */
statFun(ruta).then((stats)=>{
    /* ve si es archivo */
    const isFile = stats.isFile()
    //console.log("isFile: ", isFile)

    /* ve si es carpeta */
    const isDirectory = stats.isDirectory()
    //console.log("isDirectory: ", isDirectory)
})

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

/* console.log de readDirFun, también sirve para utilizar la función */
readDirFun(ruta).then((readDirFunFiles)=>{
    return readDirFunFiles.map((file)=>{
        const fileExt = path.extname(file)
        //console.log("fileExt: ", fileExt)
        if (fileExt === ".md"){
            const justMD = file.slice(".md").split(",")
            //console.log("justMD: ", justMD)
            const mdString = justMD.toString()
            //console.log("mdString: ", mdString)
            const resolvePaths = path.resolve(mdString)
            //console.log("resolvePath: ", resolvePaths)
            const resolvePathsString = resolvePaths.toString()
            //console.log("resolvePathsString: ", resolvePathsString)
            return resolvePaths
        } else {
            return null
        }
        //})
    }).filter((value)=> value)
    //const mdPathsResolve = path.resolve(mdPaths)
}).then((result)=> console.log({result}))

/* ASYNC lee los archivos .md */
const readFileFun = (rutaPart2) => {
    return new Promise((resolve, reject) => {
        fs.readFile(rutaPart2, "utf8", (err, data) => {
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

/* va para index.js */
readFileFun(rutaPart2).then((rutaPart2Read)=>{
    console.log("readFileFun: ", rutaPart2Read)
    const { links } = markdownLinkExtractor(rutaPart2Read);
    links.forEach(link => console.log("link: ", link));
})

