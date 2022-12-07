const fs = require("fs");

/* ASYNC ve estatus del archivo */
const statFun = (ruta) => {
    return new Promise((resolve, reject) => {
        fs.stat(ruta, (err, stats) => {
            if (err) {
                console.error("stat error: ", err)
                reject(err)
            } else {
                //console.log("stat: ", stats)
                resolve(stats)
            }
        })
    })
}

/* ASYNC lee los archivos dentro de la carpeta */
const readDirFun = (ruta) => {
    return new Promise((resolve, reject) => {
        fs.readdir(ruta, (err, files) => {
            if (err){
                console.error("readdir error: ", err)
                reject(err)
            }
            else {
                //console.log("files: ", files)
                resolve(files)
            }
        })
    })
}

/* ASYNC lee los archivos .md */
const readFileFun = (ruta) => {
    return new Promise((resolve, reject) => {
        fs.readFile(ruta, "utf8", (err, data) => {
            if (err) {
                //console.error("error 2: ", err);
                reject(err)
            } else {
                //console.log("data:\n", data)
                resolve(data)
            }
        })
    })
}

module.exports = { statFun, readDirFun, readFileFun };