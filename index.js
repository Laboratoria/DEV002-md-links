const fs = require("fs");
const path = require("path");
const getAbsolutePath = require("./md_links.js").getAbsolutePath;
const isMdFile = require("./md_links.js").isMdFile;
const isDirectory = require("./md_links.js").isDirectory;
const getMdFilesFromPath = require("./md_links.js").getMdFilesFromPath;
const getLinksFromMdFilePromise = require("./md_links.js").getLinksFromMdFilePromise;
const getLinksFromArrayMdFilesPromise = require("./md_links.js").getLinksFromArrayMdFilesPromise;
const validateArrayLinksPromise = require("./md_links.js").validateArrayLinksPromise


const mdLinks = (entryPath, option) => {
  return new Promise((resolve, reject) => {
    const absolutePath = getAbsolutePath(entryPath);
    console.log(absolutePath);
    fs.access(absolutePath, (error, _) => {
      if (!error) {
        console.log("absolutePath");
        if (option == true || option == null) {
          console.log("option");
          if (isMdFile(absolutePath) == true) {
            console.log("isMdFile");
            getLinksFromMdFilePromise(entryPath)
              .then(objectsLinks => validateArrayLinksPromise(objectsLinks, []))
              .then(arrayObjects => (arrayObjects))
              .then(res => resolve(res))
          } else {
            console.log(isDirectory(absolutePath));
            if (isDirectory(absolutePath)) {
              console.log("isDirectory");
              let mdFiles = getMdFilesFromPath(entryPath, [])
              getLinksFromArrayMdFilesPromise(mdFiles, [])
                .then((linksFromMdFiles) => validateArrayLinksPromise(linksFromMdFiles, []))
                .then((valideResponse) => (valideResponse))
                .then(res => resolve(res));
            }
          }
        }
      }
    })
  })
}

mdLinks("md_files", false)
  .then(resp => console.log(resp))
  .catch((error)=> console.log(error))
// const arrayPrueba = ["https://reqres.in/api/users/23", "https://reqres.in/api/users/2", "https://reqres.in/api/users/23"]
// const arrayMds = getMdFilesFromPath("/Users/osequeiros/Documents/Kamila/Proyectos-Laboratoria/DEV002-md-links/md_files", [])

// getLinksFromArrayMdFilesPromise(arrayMds, [])
//     .then((arrayLinks) => validateArrayLinksPromise(arrayLinks, []))
//     .then((res) => console.log(res));