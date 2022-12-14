const fs = require("fs")
const path = require("path")

const entryPath = "md_files/file_1.md";

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

// readFilePromise(file)
//     .then((link) => fetch(link))
//     .then((data) => data.json())
//     .then((json) => console.log(json))
//     .catch((error) => console.log("ERROR: ", error));

getAbsolutePathPromise(entryPath)
    .then((absolutePath) => validatePathPromise(absolutePath))
    .then((validatedPath) => isMdExtPromise(validatedPath))
    .then((mdFile) => readFilePromise(mdFile))
    .then((link) => fetch(link))
    .then((data) => data.json())
    .then((json) => console.log(json))
    .catch((error) => console.log("ERROR: ", error));

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



