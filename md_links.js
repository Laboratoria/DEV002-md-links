const fs = require("fs");
const { resolve } = require("path");
const path = require("path");
const { default: fetch } = require("cross-fetch");

const entryPath = "md_files";
const arrayMdFiles = [];

let getAbsolutePath = (entryPath) => {
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
}

//-APROBADO-----------

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
// APROBADO ---console.log(getMdFilesFromPath(entryPath, arrayMdFiles));

//Promesa que extrae los links de un archivo .md y los acumula en un arreglo.
const getLinksFromMdFile = (entryMdFile, links) => {
    return new Promise((resolve, reject) => {
        fs.readFile(entryMdFile, "utf-8", (error, data) => {
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
                    return ({ href, text, entryMdFile });
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
// getLinksFromMdFile("preambulo.md", [])
// .then(res => console.log(res))
// .catch(error => console.log(error));
//Promesa que extrae los links de un arreglo de archivos (arrayFiles) .md y los acumula en un arreglo (arrayLinks).
const getLinksFromArrayFiles = (arrayFiles, arrayLinks) => {
    return new Promise((resolve, reject) => {
        if (arrayFiles.length == 0) {
            resolve(arrayLinks);
        } else {
            const head = arrayFiles.shift();
            resolve(getLinksFromMdFile(head, arrayLinks)
                .then((links) => getLinksFromArrayFiles(arrayFiles, arrayLinks.concat(links))));
        }
    })
}

//Promesa que revisa si los links funcionan o no - HTTP request

// }
fetch("https://nodejs.org/")
    .then(res => res)
        .then((data) => {
            valid = {
                "HTTP request": " " + data.status
            }
            if(data.status >= 200 && data.status <= 399) {
                console.log(valid);
            }
            if(data.status >= 400 && data.status <= 499) {
                console.log(valid);
            }
        })
        .catch(() => {
            console.error("ERROOOOOORRRRRR")
        })



