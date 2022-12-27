const { getLinksFromFileOrDirectoryPromise,
  validateArrayLinksPromise,
  countUniqueLinks,} = require("./md_links.js")

const mdLinks = (entryPath, option) => {
  return new Promise((resolve, reject) => {
    if (option === "--validate") {
      getLinksFromFileOrDirectoryPromise(entryPath)
        .then(links => validateArrayLinksPromise(links))
        .then(arrayObjects => resolve(arrayObjects))
        .catch(error => reject(error))
    } else if (option === "--stats") {
      getLinksFromFileOrDirectoryPromise(entryPath)
        .then(arrayLinks => resolve(
          "Total links: " + arrayLinks.length + "\n" +
          "Unique links: " + countUniqueLinks(arrayLinks)
        ))
        .catch(error => reject(error))
    } else if (option === undefined) {
      getLinksFromFileOrDirectoryPromise(entryPath)
        .then(res => resolve(res))
        .catch(error => reject(error))
    }
  })
}

module.exports = { mdLinks }

mdLinks("md_files/peticion.md", )
  .then(response => console.log(response))
  .catch(error => console.log(error));
