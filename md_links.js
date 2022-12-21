const fs = require("fs");
const { resolve } = require("path");
const path = require("path");
const { default: fetch } = require("cross-fetch");

const entryPath = "md_files";
const arrayMdFiles = [];

let getAbsolutePath = (entryPath) => {
    return (path.resolve(entryPath));
}

const isAValidatePathPromise = (entryPath) => {
    const absolutePath = getAbsolutePath(entryPath);
    fs.access(absolutePath, (error, _) => {
        if (!error) {
            return (absolutePath);
        } else {
            return ("ERROR: La ruta " + entryPath + " no es válida");
        }
    })
}

function isMdFilesPath(entryPath) {
    if (path.extname(entryPath) === ".md") {
        getLinksFromMdFilePromise(entryPath)
    } else {
        getMdFilesFromPath(entryPath, []);
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
            arrayMdFiles = getMdFilesFromPath(childFolder, arrayMdFiles);
        })
        return childrenMdFiles.concat(arrayMdFiles);
    }
}

//Promesa que extrae los links de un archivo .md y los acumula en un arreglo.
const getLinksFromMdFilePromise = (entryMdFile) => {
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
                resolve(justLinksURL);
            } else {
                resolve([]);
            }
        })
    })
}

//Promesa que extrae los links de un arreglo de archivos .md (arrayFiles) y los acumula en un arreglo (arrayLinks).
const getLinksFromMdFilesPromise = (arrayMdFiles, accLinks) => {
    return new Promise((resolve, reject) => {
        if (arrayMdFiles.length == 0) {
            resolve(accLinks);
        } else {
            const head = arrayMdFiles.shift();
            resolve(getLinksFromMdFilePromise(head)
                .then((links) => getLinksFromMdFilesPromise(arrayMdFiles, accLinks.concat(links))));
        }
    })
}

//Promesa que revisa si un link funciona o no - HTTP request
const validateLink = (objectDefaultResponse) => {
    return new Promise((resolve, reject) => {
        fetch(objectDefaultResponse.href)
            .then((response) => {
                if (response.ok) {
                    bodyResponse = {
                        "status": response.status,
                        "message": "Ok",
                        "href": objectDefaultResponse.href,
                        "text": objectDefaultResponse.text,
                        "file": objectDefaultResponse.entryMdFile
                    }
                } else {
                    bodyResponse = {
                        "status": response.status,
                        "message": "Fail",
                        "href": objectDefaultResponse.href,
                        "text": objectDefaultResponse.text,
                        "file": objectDefaultResponse.entryMdFile
                    }
                }
                resolve(bodyResponse);
            })
            .catch(() => {
                bodyResponse = {
                    "message": "Link is not valid",
                    "href": objectDefaultResponse.href,
                    "text": objectDefaultResponse.text,
                    "file": objectDefaultResponse.entryMdFile
                }
                resolve(bodyResponse);
            })
    })
}

//Promesa que revisa si los links de un array funcionan o no - HTTP request
const validateArrayLinks = (arrayObjects, arrayBodyResponses) => {
    return new Promise((resolve, reject) => {
        if (arrayObjects.length == 1) {
            resolve(validateLink(arrayObjects[0])
                .then((bodyResponse) => {
                    arrayBodyResponses.push(bodyResponse);
                    return arrayBodyResponses;
                }))
        } else {
            let head = arrayObjects.shift();
            resolve(validateLink(head)
                .then((headBodyResponse) => {
                    arrayBodyResponses.push(headBodyResponse);
                    return validateArrayLinks(arrayObjects, arrayBodyResponses);
                }))
        }
    })
}

const arrayPrueba = ["https://reqres.in/api/users/23", "https://reqres.in/api/users/2", "https://reqres.in/api/users/23"]
const arrayMds = getMdFilesFromPath("/Users/osequeiros/Documents/Kamila/Proyectos-Laboratoria/DEV002-md-links/md_files/file_1.md", [])

getLinksFromMdFilesPromise(arrayMds, [])
    .then((arrayLinks) => validateArrayLinks(arrayLinks, []))
    .then((res) => console.log(res));

module.exports = {
    getAbsolutePath,
    getMdFilesFromPath,
    getLinksFromMdFile: getLinksFromMdFilePromise,
    getLinksFromArrayFiles: getLinksFromMdFilesPromise
}
