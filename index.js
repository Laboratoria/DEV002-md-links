const fs = require("fs");
const path = require("path");
const getAbsolutePath = require("./md_links.js").getAbsolutePath;
const isMdFile = require("./md_links.js").isMdFile;
const isDirectory = require("./md_links.js").isDirectory;
const getMdFilesFromPath = require("./md_links.js").getMdFilesFromPath;
const getLinksFromMdFilePromise = require("./md_links.js").getLinksFromMdFilePromise;
const getLinksFromMdFilesPromise = require("./md_links.js").getLinksFromMdFilesPromise;
const validateArrayLinksPromise = require("./md_links.js").validateArrayLinksPromise


let entryPath = "md_files";

const mdLinks = (entryPath, option) => {
  return new Promise((resolve, reject) => {
    const absolutePath = getAbsolutePath(entryPath);
    fs.access(absolutePath, (error, _) => {
      if (!error) {
        if (option == true || option == null) {
          if (isMdFile(absolutePath) == true) {
            resolve(getLinksFromMdFilePromise(entryPath)
              .then(objectsLinks => validateArrayLinksPromise(objectsLinks, []))
              .then(arrayObjects => (arrayObjects)))
          } else {
            if (isDirectory(absolutePath)) {
              let mdFiles = getMdFilesFromPath(entryPath, [])
              resolve(getLinksFromMdFilesPromise(mdFiles, [])
                .then((linksFromMdFiles) => validateArrayLinksPromise(linksFromMdFiles, []))
                .then((valideResponse) => (valideResponse)));
            } else {
              console.log("File type not accepted");
            }
          }
        } else {
          console.log("Option not accepted");
        }
      } else {
        console.log("Invalid path");
      }
    })
  })
}

mdLinks(entryPath, true)
  .then(resp => console.log(resp))