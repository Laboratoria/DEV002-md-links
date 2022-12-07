const { isDirectory, onlyMdFiles, getLinksFromMdFile, getLinksFromMdFiles } = require("./data.js")

const isValid = require("is-valid-path");

const ruta = "./mdtests"
const rutaPart1 = "./mdtests/part1.md"
const rutaPart2 = "./mdtests/part2.md"
const rutaPart3 = "./mdtests/part3.md"
const rutaPart4 = "./mdtests/part4.md"

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