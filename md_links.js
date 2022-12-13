import fetch from "node-fetch";
import fs, { link } from "fs";
import path from "path";

const file_no = "md_files/no_md_file.txt";
const file = "md_files/file_1.md";

// console.log(path.extname(file_no));

const isMdExtPromise = (file) => {
    return new Promise((resolve, reject) => {
        if(path.extname(file)===".md") {
            resolve(file);
        } else {
            reject ("El archivo no es compatible con la búsqueda");
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
//     .then((json) => console.log(json));

isMdExtPromise(file)
    .then((mdFile) => readFilePromise(mdFile))
    .then((link) => fetch(link))
    .then((data) => data.json())
    .then((json) => console.log(json))
    .catch((error) => console.log("ERROR: ", error));

// const link = "https://pokeapi.co/api/v2/pokemon"
// fetch(link)
//     .then((res) => res.json())
//     .then((data) => console.log(data["results"][0]["name"]))



