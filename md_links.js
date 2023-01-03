const fs = require("fs");
// const { resolve } = require("path");
const path = require("path");
const { default: fetch } = require("cross-fetch");
const { rejects } = require("assert");
// const { rejects } = require("assert");
// const axios = require("axios")

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

//Función que obtiene todos los archivos .md del entryPath (síncrono)
const getMdFilesFromPath = (entryPath, accMdFiles) => {
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
const getLinksFromArrayMdFilesPromiseRecursive = (arrayMdFiles, accLinks) => {
    return new Promise((resolve, _) => {
        if (arrayMdFiles.length === 0) {
            resolve(accLinks);
        } else {
            let head = arrayMdFiles.shift()
            // console.log(arrayMdFiles);
            resolve(
                getLinksFromMdFilePromise(head)
                    .then((links) => {
                        return getLinksFromArrayMdFilesPromiseRecursive(arrayMdFiles, accLinks.concat(links))
                    }));
        }
    })
}

//Promesa que extrae los links de un archivo .md o de un directorio.
const getLinksFromFileOrDirectoryPromise = (entryPath) => {
    return new Promise((resolve, reject) => {
        validatePathPromise(entryPath)
            .then((validatedPath) => {
                if (path.extname(validatedPath) === ".md") {
                    resolve(getLinksFromMdFilePromise(validatedPath));
                } else if (fs.statSync(validatedPath).isDirectory()) {
                    let arrayMdFiles = getMdFilesFromPath(validatedPath, []);
                    resolve(getLinksFromArrayMdFilesPromiseRecursive(arrayMdFiles, []));
                } else {
                    reject("Provided file---- " + entryPath + "----is not a markdown")
                }
            })
            .catch(error => reject(error))
    })
}

//Promesa que revisa si un link funciona o no - HTTP request
const validateLinkPromise = (objectDefaultResponse) => {
    return new Promise((resolve, _) => {
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

//Promesa que revisa si un arreglo de links funciona o no
const validateArrayLinksPromiseRecursive = (arrayObjects, accBodyResponses) => {
    return new Promise((resolve) => {
        if (arrayObjects.length == 1) {
            resolve(validateLinkPromise(arrayObjects[0])
                .then((bodyResponse) => {
                    accBodyResponses.push(bodyResponse);
                    return accBodyResponses;
                }))
        } else {
            let head = arrayObjects.shift();
            resolve(validateLinkPromise(head)
                .then((headBodyResponse) => {
                    accBodyResponses.push(headBodyResponse);
                    return validateArrayLinksPromiseRecursive(arrayObjects, accBodyResponses);
                }))
        }
    })
}

//Promesa que revisa si un link funciona o no - HTTP request
const validateArrayLinks = (arrayObjects) => {
    return validateArrayLinksPromiseRecursive(arrayObjects, [])
}

//Función para contar los links que son únicos.
const countUniqueLinks = (arrayLinks) => {
    let set = new Set();
    arrayLinks.forEach(element => {
        set.add(element.href)
    });
    return set.size;
}

// const getOptionsFromArguments = (processArguments) => {
//     let options = { validate: true };
//     let arrayOptions = processArguments.filter((argument) => argument.startsWith("--"));
//     if (arrayOptions.includes("--validate")) {
//         return options;
//     } else
//         return options = {validate: false};
// }

//     const getPathFromArguments = (processArguments) => {
//         return processArguments[2];
//     }

module.exports = {
    getAbsolutePath,
    getLinksFromFileOrDirectoryPromise,
    validateArrayLinks,
    countUniqueLinks,
    validatePathPromise,
}
