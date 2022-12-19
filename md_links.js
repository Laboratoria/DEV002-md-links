const fs = require("fs");
const { resolve } = require("path");
const path = require("path")

const entryPath = "md_files";
const arrayMdFiles = [];

const getAbsolutePath = (entryPath) => {
    return (path.resolve(entryPath));
}
//("function")

const isAValidatePathPromise = (entryPath) => {
    return new Promise((resolve, reject) => {
        const absolutePath = getAbsolutePath(entryPath);
        fs.access(absolutePath, (error, _) => {
            if (!error) {
                resolve(absolutePath);
            } else {
                reject("ERROR: La ruta " + entryPath + " no es válida");
            }
        })
    })
} //("function")

// isAValidatePathPromise(entryPath)
//     .then((validPath) => console.log(validPath))
//     .catch((error) => console.log("ERROR: ", error));
//-APROBADO-----------

function readDirSyncrono(entryPath) {
    return (fs.readdirSync(entryPath, { withFileTypes: true })
        .filter(item => !item.isDirectory())
        .map(item => entryPath + "/" + item.name));
}

// isAValidatePathPromise(entryPath)
//     .then((validPath) => readDirSyncrono(validPath))
//     .then((arrayDirectorio) => console.log(arrayDirectorio))
//     .catch((error) => console.log("ERROR: ", error));
//-APROBADO-----------


const searchMdFiles = (arrayOfFiles) => {
    const mdFilesArray = arrayOfFiles.filter((mdFile) => path.extname(mdFile) === ".md");
    if (!mdFilesArray.length == 0) {
        return mdFilesArray;
    } else {
        return ("No se encuentran archivos markdown");
    }
}

function getMdFilesFromPath(entryPath, arrayMdFiles) {
    let childrenFolders = fs.readdirSync(entryPath, { withFileTypes: true })
        .filter(item => item.isDirectory())
        .map(item => entryPath + "/" + item.name);

    let childrenMdFiles = fs.readdirSync(entryPath)
        .filter((mdFile) => path.extname(mdFile) === ".md")
        .map(mdFilePath => path.resolve(entryPath + "/" + mdFilePath));

    if (childrenFolders.length == 0) {
        return arrayMdFiles.concat(childrenMdFiles);
    } else {
        childrenFolders.forEach((childFolder) => {
            console.log(childFolder);
            arrayMdFiles = getMdFilesFromPath(childFolder, arrayMdFiles);
        })
        return childrenMdFiles.concat(arrayMdFiles);
    }
}
console.log(getMdFilesFromPath(entryPath, arrayMdFiles));

const searchMdFilesPromise = (arrayOfFiles) => {
    return new Promise((resolve, reject) => {
        const mdFilesArray = arrayOfFiles.filter((mdFile) => path.extname(mdFile) === ".md");
        if (!mdFilesArray.length == 0) {
            resolve(mdFilesArray);
        } else {
            reject("No se encuentran archivos markdown");
        }
    })
}

// isAValidatePathPromise(entryPath)
//     .then((validPath) => readDir(validPath))
//     .then((arrayDirectorio) => searchMdFilesPromise(arrayDirectorio))
//     .then((mdFilesArray) => console.log(mdFilesArray)) 
//     .catch((error) => console.log("ERROR: ", error));
//-APROBADO-----------

///Users/osequeiros/Documents/Kamila/Proyectos-Laboratoria/DEV002-md-links/md_files/file_1.md
///Users/osequeiros/Documents/Kamila/Proyectos-Laboratoria/DEV002-md-links/file_1.md

//Promesa que extrae los links de un archivo .md y los acumula en un arreglo.
const getLinksFromMdFile = (entryFile, links) => {
    return new Promise((resolve, reject) => {
        console.log(entryFile);
        fs.readFile(entryFile, "utf-8", (error, data) => {
            if (error) {
                reject("ERROR: " + error);
            }
            const regularExpression = /\[([^[]+)\](\(.*\))/gm;
            if (data.match(regularExpression)) {
                const arrayLinks = data.match(regularExpression);
                const link = arrayLinks.map((item) => {
                    const textURLsplit = item.split("](");
                    const text = textURLsplit[0].replace("[", "").substring(0, 50);
                    const href = textURLsplit[1].replace(")", "");
                    return ({ href, text, entryFile });
                });
                const crossReference = "#";
                const justLinksURL = link.filter((object) => !object.href.startsWith(crossReference));
                resolve(links.concat(justLinksURL));
            } else {
                resolve(links);
            }
        })
    })
}

//Promesa que extrae los links de un arreglo de archivos (arrayFiles) .md y los acumula en un arreglo (arrayLinks).
const getLinksFromArrayFiles = (arrayFiles, arrayLinks) => {
    return new Promise((resolve, reject) => {
        /*if (arrayFiles.length === 0) {
            resolve(arrayLinks)
        } else {
           
        }*/
        if (arrayFiles.length == 0) {
            resolve(arrayLinks);
        } else {
            const head = arrayFiles.shift();
            resolve(getLinksFromMdFile(head, arrayLinks)
                .then((links) => getLinksFromArrayFiles(arrayFiles, arrayLinks.concat(links))));
        }
    })
}

// const getLinksFromFiles = (filesArray) => {
//     return new Promise((resolve, reject) => {
//         const linksResponse = [];
//         filesArray.forEach(element => {
//             getLinks(getAbsolutePath(element))
//                 .then((links) => linksResponse.concat(links))
//                 .then((links) => resolve(links));
//         });
//         //resolve(linksResponse);
//     })
// }

// isAValidatePathPromise(entryPath)
//     .then((validPath) => readDirSyncrono(validPath))
//     .then((arrayDirectorio) => searchMdFilesPromise(arrayDirectorio))
//     .then((mdFilesArray) => getLinksFromArrayFiles(mdFilesArray, []))
//     .then((links) => console.log(links))
//     .catch((error) => console.log("ERROR: ", error));
//-APROBADO-----------

// isAValidatePathPromise(entryPath)
//     .then((mdFilesArray) => getLinks(mdFilesArray))
//     .then((links) => console.log(links))
//     .catch((error) => console.log("ERROR: ", error));
//-APROBADO-----------

// const isMdExtPromise = (entryPath) => {
//     return new Promise((resolve, reject) => {
//         if (path.extname(entryPath) === ".md") {
//             resolve(entryPath);
//         } else {
//             reject("El archivo no es compatible con la búsqueda");
//         }
//     })
// }

// readFilePromise(file)
//     .then((link) => fetch(link))
//     .then((data) => data.json())
//     .then((json) => console.log(json))
//     .catch((error) => console.log("ERROR: ", error)); 

// accessAndValidatePathPromise(entryPath)
//     .then((absolutePath) => readDirSyncrono(absolutePath))
//     .then((mdFile) => searchMdFilesPromise(mdFile))
//     .then((link) => getLinks(link))
//     .then((toShowLinks) => console.log(toShowLinks))
//     .catch((error) => console.log("ERROR: ", error));



