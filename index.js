const { getAllMdFiles, validateRoute, returnBrokenLinks, validateLinks, statUnique } = require("./validator");

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
      console.log("no se ha especificado la opcion");
      const pathnameArray = getAllMdFiles(path);
      pathnameArray.forEach((elem) => {
        validateRoute(elem)
          .then((data) => {
            resolve(data);
            if (Object.keys(data).length === 0) {
              console.log("tu array no tiene links");
            } else {
              console.log(data, "estos son tu datos");
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    } else {
      if (
        (options[0] === "--validate" && options[1] === "--stats") ||
        (options[0] === "--stats" && options[1] === "--validate")
      ) {
        console.log("si hay una opcion");
        const routArray = getAllMdFiles(path);
        routArray.forEach((elem) => {
          validateRoute(elem).then((data) => {
            resolve(returnBrokenLinks(data));
            if(Object.keys(data).length === 0){
              console.log("tu archivo md no tiene links");
            }else{
              console.log(returnBrokenLinks(data))
            }
          }).catch((error) => {
              reject(error);
          })
        })
      }else if(options[0] === "--validate"){
        console.log("hay validacion");
        const routArray = getAllMdFiles(path)
        routArray.forEach((elem) => {
            validateRoute(elem).then((data) => {
              validateLinks(data).then((data) => {
                  console.log(data);
              }).catch((error) => {
                reject(error)
              })
            })
        })
      }else if(options[0] === "--stats"){
        console.log("hay validacion");
        const routArray = getAllMdFiles(path)
        routArray.forEach((elem) => {
            validateRoute(elem).then((data) => {
              resolve(statUnique(data))
              console.log(statUnique(data));
            })
        })
      }
    }
  });
};

module.exports = { mdLink };
