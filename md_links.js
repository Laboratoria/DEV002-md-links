const fs = require("fs");
const { resolve } = require("path");
const path = require("path");
const { default: fetch } = require("cross-fetch");
const { rejects } = require("assert");

let getAbsolutePath = (entryPath) => {
    return path.resolve(entryPath);
}

//Promesa que resuleve si un path relativo o absoluto es válido.
const validatePathPromise = (entryPath) => {
    let absolutePath = getAbsolutePath(entryPath);
    return new Promise((resolve, reject) => {
        fs.access(absolutePath, (error, _) => {
            if (!error) {
                resolve(absolutePath);
            } else {
                reject("Path: " + entryPath + " is not valid");
            }
        })
    })
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

const getLinksFromFileOrDirectoryPromise = (entryPath) => {
    return new Promise((resolve, reject) => {
        validatePathPromise(entryPath)
            .then((validatedPath) => {
                if (path.extname(validatedPath) === ".md") {
                    resolve(getLinksFromMdFilePromise(validatedPath));
                } else if (fs.statSync(validatedPath).isDirectory()) {
                    let arrayMdFiles = getMdFilesFromPath(validatedPath, []);
                    resolve(getLinksFromArrayMdFilesPromise(arrayMdFiles, []));
                } else {
                    reject("Provided file is not a markdown")
                }
            })
            .catch(error => reject(error))
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

const validateArrayLinksPromise = (arrayObjects) => {
    return validateArrayLinksPromiseRecursive(arrayObjects, [])
}

//Promesa que revisa si los links de un array funcionan o no - HTTP request
const validateArrayLinksPromiseRecursive = (arrayObjects, accBodyResponses) => {
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
                    return validateArrayLinksPromiseRecursive(arrayObjects, accBodyResponses);
                }))
        }
    })
}

const countUniqueLinks = (arrayLinks) => {
    let set = new Set();
    arrayLinks.forEach(element => {
        set.add(element.href)
    });
    return set.size;
}

const getOptionsFromArguments = (processArguments) => {
    return processArguments.filter((argument) => argument.startsWith("--"));
}

const getPathFromArguments = (processArguments) => {
    return processArguments[2];
}

module.exports = {
    getLinksFromFileOrDirectoryPromise,
    validateArrayLinksPromise,
    countUniqueLinks,
    getOptionsFromArguments,
    getPathFromArguments
}
