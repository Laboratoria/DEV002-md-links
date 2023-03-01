const {
  getAllMdFiles,
  validateRoute,
  returnBrokenLinks,
  validateLinks,
  statUnique,
} = require("./validator");

/**
 *
 * @param {string} path Este parametro recibe la ruta a evaluar
 * @param {Array<string>} options Es un array de opciones de comandos
 * @returns retorna una promesa
 * !es indispensable que la función mdLink lleve estos dos parametros.
 */
const mdLink = (path, options) => {
  return new Promise((resolve, reject) => {
    if (options[0] === undefined && options[1] === undefined) {
      const pathnameArray = getAllMdFiles(path);
      pathnameArray.forEach((elem) => {
        validateRoute(elem)
          .then((data) => {
            console.log(data)
            return resolve(data);
          })
          .catch((error) => reject(error));
      });
    } else {
      if (
        (options[0] === "--validate" && options[1] === "--stats") ||
        (options[0] === "--stats" && options[1] === "--validate")
      ) {
        const routArray = getAllMdFiles(path);
        
        routArray.forEach((elem) => {
          validateRoute(elem)
          .then((data) => {
              validateLinks(data).then((result) => {
                console.log(returnBrokenLinks(result))
                return resolve(returnBrokenLinks(result));
              })
            })
        });
      } else if (options[0] === "--validate") {
        const routArray = getAllMdFiles(path);
        routArray.forEach((elem) => {
          validateRoute(elem)
            .then((data) => {
              if (Array.isArray(data)) {
                validateLinks(data).then((data) => {
                  console.log(data)
                  return resolve(data)
                });
              }
            })
             
        });
      } else if (options[0] === "--stats") {
        const routArray = getAllMdFiles(path);
        routArray.forEach((elem) => {
          validateRoute(elem).then((data) => {
            console.log(statUnique(data))
            return resolve(statUnique(data));
          });
        });
      }
    }
  });
};

module.exports = { mdLink };
