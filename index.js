const { getLinksFromFileOrDirectoryPromise,
  validateArrayLinks,
  getAbsolutePath } = require("./md_links.js");

const mdLinks = (entryPath, options) => {
  return new Promise((resolve, reject) => {
    if (options === undefined || options === null) {
      console.log(
        "---------------------------------------------------------------------------" + "\n" +
        "  THE SOLVED PATH: " + getAbsolutePath(entryPath) + "\n" +
        "---------------------------------------------------------------------------" + "\n" + "\n" +
        "--------------------contains the following information --------------------" + "\n" + "\n")
      getLinksFromFileOrDirectoryPromise(entryPath)
        .then(res => resolve(res))
        .catch(error => reject(error))
    } else if (options.validate === false) {
      console.log(
        "---------------------------------------------------------------------------" + "\n" +
        "  THE SOLVED PATH: " + getAbsolutePath(entryPath) + "\n" +
        "---------------------------------------------------------------------------" + "\n" + "\n" +
        "--------------------contains the following information --------------------" + "\n" + "\n")
      getLinksFromFileOrDirectoryPromise(entryPath)
        .then(res => resolve(res))
        .catch(error => reject(error))
    } else if (options.validate === true) {
      console.log(
        "---------------------------------------------------------------------------" + "\n" +
        "  THE SOLVED PATH: " + getAbsolutePath(entryPath) + "\n" +
        "---------------------------------------------------------------------------" + "\n" + "\n" +
        "--------------------contains the following information --------------------" + "\n" + "\n")
      getLinksFromFileOrDirectoryPromise(entryPath)
        .then(links => validateArrayLinks(links))
        .then(arrayObjects => resolve(arrayObjects))
        .catch(error => reject(error))
    } else {
      resolve("WARNING! Please, enter the following options: " + "\n"+
      "{validate: true} OR" + "\n" +
      "{validate: false}")
    }
  })
}
module.exports = {mdLinks}
