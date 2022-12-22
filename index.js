const fs = require("fs");
const {getAbsolutePath,
isMdFile,
isDirectory,
getMdFilesFromPath,
getLinksFromMdFilePromise,
getLinksFromArrayMdFilesPromise,
validateArrayLinksPromise} = require("./md_links.js")


const mdLinks = (entryPath, option) => {
  return new Promise((resolve, reject) => {
    const absolutePath = getAbsolutePath(entryPath);
    fs.access(absolutePath, (error, _) => {
      if (!error) {reject("Invalid path")}
        if (option == true || option == null) {
          if (isMdFile(absolutePath) == true) {
            getLinksFromMdFilePromise(entryPath)
              .then(objectsLinks => validateArrayLinksPromise(objectsLinks, []))
              .then(arrayObjects => (arrayObjects))
              .then(res => resolve(res))
          } else {
            if (isDirectory(absolutePath)) {reject("Invalid path")} {
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

mdLinks("/Users/osequeiros/Documents/Kamila/Proyectos-Laboratoria/DEV002-md-links/md_files", true)
  .then(resp => console.log(resp))
  .catch((error)=> console.log(error))
// const arrayPrueba = ["https://reqres.in/api/users/23", "https://reqres.in/api/users/2", "https://reqres.in/api/users/23"]
// const arrayMds = getMdFilesFromPath("/Users/osequeiros/Documents/Kamila/Proyectos-Laboratoria/DEV002-md-links/md_files", [])
