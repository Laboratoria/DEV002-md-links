import fetch from "node-fetch";
import fs, { link } from "fs";
import path from "path";

const file = "md_files/file_1.md";

// path.extname(file, "utf-8", (error, extname) => {
//     if (!error) {
//         console.log(extname);
//     } else {
//         console.log("Error: ${error}");
//     }
// });

// const links = fs.readFile(file, "utf-8", (error, data) => {
//     if (!error) {
//         data;
//     } else {
//         "Error: ${error}";
//     }
// })
const getExtePromise = (file) => {
    return new Promise((res, rej) => {
        path.extname(file, "utf-8", (error, extName) => {
            if (!error) {
                if (extName == ".md")
                    true;
            } else {
                rej("El archivo no es compatible par la búsqueda");
            }
        })
    })
}

const readFilePromise = (file) => {
        return new Promise((res, rej) => {
            fs.readFile(file, "utf-8", (error, data) => {
                if (!error) {
                    res(data);
                } else {
                    rej("No se encuentran elementos válidos en el file");
                }
            })
        })
    }

    readFilePromise(file)
        .then((link) => fetch(link))
        .then((data) => data.json())
        .then((json) => console.log(json));

// const link = "https://pokeapi.co/api/v2/pokemon"
// fetch(link)
//     .then((res) => res.json())
//     .then((data) => console.log(data["results"][0]["name"]))



