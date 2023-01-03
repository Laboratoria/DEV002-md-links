const { getLinksFromFileOrDirectoryPromise,
  validateArrayLinks,
  getAbsolutePath } = require("./md_links.js");

const mdLinks = (entryPath, options) => {
  return new Promise((resolve, reject) => {
    if (options === undefined || options === null) {
      console.log(
        "---------------------------------------------------------------------------" + "\n" +
        "  THE PATH: " + getAbsolutePath(entryPath) + "\n" +
        "---------------------------------------------------------------------------" + "\n" +
        "--------------------contains the following information --------------------")
      getLinksFromFileOrDirectoryPromise(entryPath)
        .then(res => resolve(res))
        .catch(error => reject(error))
    } else if (options.validate === false) {
      console.log(
        "---------------------------------------------------------------------------" + "\n" +
        "  THE PATH: " + getAbsolutePath(entryPath) + "\n" +
        "---------------------------------------------------------------------------" + "\n" +
        "--------------------contains the following information --------------------")
      getLinksFromFileOrDirectoryPromise(entryPath)
        .then(res => resolve(res))
        .catch(error => reject(error))
    } else if (options.validate === true) {
      console.log(
        "---------------------------------------------------------------------------" + "\n" +
        "  THE PATH: " + getAbsolutePath(entryPath) + "\n" +
        "---------------------------------------------------------------------------" + "\n" +
        "--------------------contains the following information --------------------")
      getLinksFromFileOrDirectoryPromise(entryPath)
        .then(links => validateArrayLinks(links))
        .then(arrayObjects => resolve(arrayObjects))
        .catch(error => reject(error))
    } else {
      resolve("WARNING! Please, enter the following options: {validate: true} ó {validate: false}")
    }
  })
}
module.exports = { mdLinks }
// mdLinks("./md_files")
//   .then(response => console.log(response))
//   .catch(error => console.log(error));
// module.exports = { mdLinks }
