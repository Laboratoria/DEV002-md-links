const fs = require("fs");
const { resolve } = require("path");
const path = require("path")

const entryPath = "README.md";

const validatePathPromise = (entryPath) => {
    return new Promise((resolve, reject) => {
        fs.access(entryPath, (error, _) => {
            if (!error) {
                resolve(entryPath);
            } else {
                reject("ERROR: La ruta " + entryPath + " no es válida");
            }
        })
    })
}

const getAbsolutePathPromise = (file) => {
    return new Promise((resolve, _) => {
        resolve(path.resolve(file));
    })
}

const isMdExtPromise = (file) => {
    return new Promise((resolve, reject) => {
        if (path.extname(file) === ".md") {
            resolve(file);
        } else {
            reject("El archivo no es compatible con la búsqueda");
        }
    })
}

const readFilePromise = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, "utf-8", (error, data) => {
            if (!error) {
                resolve(data);
            } else {
                reject("No se encuentran elementos válidos en el file");
            }
        })
    })
}

const getLinks = (entryPath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(entryPath, "utf-8", (error, data) => {
            const regularExpression = /\[([^[]+)\](\(.*\))/gm;
            if (data.match(regularExpression)) {
                const arrayLinks = data.match(regularExpression);
                const link = arrayLinks.map((item) => {
                    const textURLsplit = item.split("](");
                    const text = textURLsplit[0].replace("[", "").substring(0, 50);
                    const href = textURLsplit[1].replace(")", "");
                    return ({ href, text, entryPath });
                });
                const michi = "#";
                const linksURL = link.filter((object) => !object.href.startsWith(michi));
                resolve(linksURL);
            } else {
                resolve([]);
            }
        })
    })
}

getLinks(entryPath)
.then((link) => console.log(link))
.catch((error) => console.log("ERROR: ", error));

// readFilePromise(file)
//     .then((link) => fetch(link))
//     .then((data) => data.json())
//     .then((json) => console.log(json))
//     .catch((error) => console.log("ERROR: ", error));

// getAbsolutePathPromise(entryPath)
//     .then((absolutePath) => validatePathPromise(absolutePath))
//     .then((validatedPath) => isMdExtPromise(validatedPath))
//     .then((mdFile) => readFilePromise(mdFile))
//     .then((link) => fetch(link))
//     .then((data) => data.json())
//     .then((json) => console.log(json))
//     .catch((error) => console.log("ERROR: ", error));

// isMdExtPromise(file)
//     .then((mdFile) => readFilePromise(mdFile))
//     .then((link) => fetch(link))
//     .then((data) => data.json())
//     .then((json) => console.log(json))
//     .catch((error) => console.log("ERROR: ", error));

// const link = "https://pokeapi.co/api/v2/pokemon"
// fetch(link)
//     .then((res) => res.json())
//     .then((data) => console.log(data["results"][0]["name"]))
//     .catch((error) => console.log("ERROR: ", error));



