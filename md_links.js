const fs = require("fs");
const { resolve } = require("path");
const path = require("path");
const { default: fetch } = require("cross-fetch");

let getAbsolutePath = (entryPath) => {
    return (path.resolve(entryPath));
}

function isValidPath(entryPath) {
    let absolutePath = getAbsolutePath(entryPath);
    let isValidPathPromise = new Promise((resolve, reject) => {
        fs.access(absolutePath, (error, _) => {
            if (!error) {
                resolve(true);
            } else {
                reject(false);
            }
        })
    })
    return isValidPathPromise;
}


function isMdFile(entryPath) {
    if (path.extname(entryPath) === ".md") {
        return true;
    } else {
        return false;
    }
}

function isDirectory(entryPath) {
    let folder = fs.statSync(entryPath);
    return folder.isDirectory();
}

function getMdFilesFromPath(entryPath, accMdFiles) {
    let childrenFolders = fs.readdirSync(entryPath, { withFileTypes: true })
        .filter(item => item.isDirectory())
        .map(item => entryPath + "/" + item.name);

    let childrenMdFiles = fs.readdirSync(entryPath)
        .filter((mdFile) => path.extname(mdFile) === ".md")
        .map(mdFilePath => path.resolve(entryPath + "/" + mdFilePath));

    if (childrenFolders.length == 0) {
        return accMdFiles.concat(childrenMdFiles);
    } else {
        childrenFolders.forEach((childFolder) => {
            accMdFiles = getMdFilesFromPath(childFolder, accMdFiles);
        })
        return childrenMdFiles.concat(accMdFiles);
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
const getLinksFromArrayMdFilesPromise = (arrayMdFiles, accLinks) => {
    return new Promise((resolve, _) => {
        if (arrayMdFiles.length == 0) {
            resolve(accLinks);
        } else {
            let head = arrayMdFiles.shift()
            // console.log(arrayMdFiles);
            resolve(
                getLinksFromMdFilePromise(head)
                    .then((links) => {
                        return getLinksFromArrayMdFilesPromise(arrayMdFiles, accLinks.concat(links))
                    }));
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
                        "href": objectDefaultResponse.href,
                        "text": objectDefaultResponse.text,
                        "file": objectDefaultResponse.entryMdFile,
                        "status": response.status,
                        "message": "Ok"
                    }
                } else {
                    bodyResponse = {
                        "href": objectDefaultResponse.href,
                        "text": objectDefaultResponse.text,
                        "file": objectDefaultResponse.entryMdFile,
                        "status": response.status,
                        "message": "Fail"
                    }
                }
                resolve(bodyResponse);
            })
            .catch(() => {
                bodyResponse = {
                    "href": objectDefaultResponse.href,
                    "text": objectDefaultResponse.text,
                    "file": objectDefaultResponse.entryMdFile,
                    "message": "Link is not valid",
                }
                resolve(bodyResponse);
            })
    })
}

//Promesa que revisa si los links de un array funcionan o no - HTTP request
const validateArrayLinksPromise = (arrayObjects, accBodyResponses) => {
    return new Promise((resolve, _) => {
        if (arrayObjects.length == 1) {
            resolve(validateLink(arrayObjects[0])
                .then((bodyResponse) => {
                    accBodyResponses.push(bodyResponse);
                    return accBodyResponses;
                }))
        } else {
            let head = arrayObjects.shift();
            resolve(validateLink(head)
                .then((headBodyResponse) => {
                    accBodyResponses.push(headBodyResponse);
                    return validateArrayLinksPromise(arrayObjects, accBodyResponses);
                }))
        }
    })
}

//Flags
const validateOption = (option) => {
    return option.find((validateFlag) => validateFlag === "--validate")
}

const statsOption = (option) => {
    return option.find((statsFlag) => statsFlag === "--stats")
}

module.exports = {
    getAbsolutePath,
    isMdFile,
    isDirectory,
    getMdFilesFromPath,
    getLinksFromMdFilePromise,
    getLinksFromArrayMdFilesPromise,
    validateArrayLinksPromise
}
