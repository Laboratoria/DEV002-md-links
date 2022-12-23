const { getLinksFromFileOrDirectoryPromise,
  validateArrayLinksPromise,
  arguments,
  totalLinks,
  brokenLinks,
  countUniqueLinks } = require("./md_links.js")


const mdLinks = (entryPath, option) => {
  return new Promise((resolve, reject) => {
    if (arguments(option)) {
      if (option == "--validate") {
        getLinksFromFileOrDirectoryPromise(entryPath)
          .then(links => validateArrayLinksPromise(links))
          .then(arrayObjects => resolve(arrayObjects))
          .catch(error => reject(error))
      } else if (option == "--validate --stats") {
        getLinksFromFileOrDirectoryPromise(entryPath)
          .then(links => validateArrayLinksPromise(links))
          .then(arrayObjects => resolve(
            "Total links: " + arrayObjects.length + "\n" +
            "Unique: " + countUniqueLinks(arrayObjects) + "\n" +
            "Broken: " + arrayObjects.filter(link => link.message === "Fail").length
          ))
          .catch(error => reject(error))
      }
    } else if (!arguments(option)) {
      if (option == undefined) {
        getLinksFromFileOrDirectoryPromise(entryPath)
          .then(res => resolve(res))
          .catch(error => reject(error))
      } else if (option == "--stats") {
        getLinksFromFileOrDirectoryPromise(entryPath)
          .then(arrayLinks => resolve(
            "Total links: " + arrayLinks.length + "\n" +
            "Unique links: " + countUniqueLinks(arrayLinks)
          ))
          .catch(error => reject(error))
      }
    }
  })
}

module.exports = { mdLinks }


mdLinks("/Users/osequeiros/Documents/Kamila/Proyectos-Laboratoria/DEV002-md-links/md_files/nodo_2/recursion.md", "--validate --stats")
  .then(resp => console.log(resp))
  .catch((error) => console.log(error))
// const arrayPrueba = ["https://reqres.in/api/users/23", "https://reqres.in/api/users/2", "https://reqres.in/api/users/23"]
// const arrayMds = getMdFilesFromPath("/Users/osequeiros/Documents/Kamila/Proyectos-Laboratoria/DEV002-md-links/md_files", [])
