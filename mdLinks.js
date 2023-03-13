const {
  obtenerArchivosMd,
  invalidateAllRoutes,
  brokenLinks,
} = require("./function"); //use destructuración para importar funciones

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    if (options[0] === undefined && options[1] === undefined) {
      const pathArr = obtenerArchivosMd(path);
      pathArr.map((element) => {
        //map recibe una funct y la funct recibe un elemento a iterar
        invalidateAllRoutes(element)
          .then((data) => {
            console.log(data);
            return resolve(data);
          })
          .catch((error) => {
            reject("TU RUTA ES INVALIDA", error);
          });
      });
    } else {
      if (
        (options[0] === "--validate" && options[1] === "--stats") ||
        (options[0] === "--stats" && options[1] === "--validate")
      ) {
        const pathArr = obtenerArchivosMd(path);
        pathArr.map((element) => {
          invalidateAllRoutes(element).then((data) => {
            console.log(brokenLinks(data))
            return resolve (brokenLinks(data));
          });
        });
      }
    }
  });
};