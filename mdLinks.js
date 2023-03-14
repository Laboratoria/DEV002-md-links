const {
  addFileMd,
  routeFalse,
  brokenLinks,
} = require("./function"); //use destructuración para importar funciones
const colors = require('colors');

const mdLinks = (path, options) => {
  return new Promise((res, rej) => {
    if (options[0] === undefined && options[1] === undefined) {
      const inputPath = addFileMd(path);
      inputPath.map((content) => {

        //map recibe una funct y la funct recibe un elemento a iterar
        routeFalse(content)
          .then((data) => {
            console.log(data);
            return res(data);
          })
          .catch((error) => {
            rej("La ruta ingresada no es válida", error);
          });
      });
    } else {
      if (
        (options[0] === "--validate" && options[1] === "--stats") ||
        (options[0] === "--stats" && options[1] === "--validate")
      ) {
        const inputPath = addFileMd(path);
        inputPath.map((content) => {
          routeFalse(content).then((data) => {
            console.log(brokenLinks(data))
            return res (brokenLinks(data));
          });
        });
      }
    }
  });
};
