const process = require("process")
const { getLinksFromFileOrDirectoryPromise,
  validateArrayLinksPromise,
  countUniqueLinks,
  getOptionsFromArguments,
  getPathFromArguments } = require("./md_links.js")

const arguments = process.argv;

const mdLinks = (entryPath, arrayOptions) => {
  return new Promise((resolve, reject) => {
    if (arrayOptions.includes("--validate") && arrayOptions.includes("--stats")) {
      getLinksFromFileOrDirectoryPromise(entryPath)
        .then(links => validateArrayLinksPromise(links))
        .then(arrayObjects => resolve(
          "Total links: " + arrayObjects.length + "\n" +
          "Unique: " + countUniqueLinks(arrayObjects) + "\n" +
          "Broken: " + arrayObjects.filter(link => link.message === "Fail").length
        ))
        .catch(error => reject(error))
    } else if (arrayOptions.includes("--validate")) {
      getLinksFromFileOrDirectoryPromise(entryPath)
        .then(links => validateArrayLinksPromise(links))
        .then(arrayObjects => resolve(arrayObjects))
        .catch(error => reject(error))
    } else if (arrayOptions.includes("--stats")) {
      getLinksFromFileOrDirectoryPromise(entryPath)
        .then(arrayLinks => resolve(
          "Total links: " + arrayLinks.length + "\n" +
          "Unique links: " + countUniqueLinks(arrayLinks)
        ))
        .catch(error => reject(error))
    } else if (arrayOptions.length == 0) {
      getLinksFromFileOrDirectoryPromise(entryPath)
        .then(res => resolve(res))
        .catch(error => reject(error))
    }
  })
}

module.exports = { mdLinks }

mdLinks(getPathFromArguments(arguments), getOptionsFromArguments(arguments))
  .then(response => console.log(response));