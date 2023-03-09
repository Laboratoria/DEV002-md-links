const fs = require("fs");
const path = require("path");
const process = require("process");
const axios = require("axios");
//console.log(fs);

//verificar que la ruta es valida
//
const validateRoute = (pathRoute) => fs.existsSync(pathRoute);

//valida si es absoluta
const absoluteRoute = (pathRoute) => path.isAbsolute(pathRoute);

//convierte relativa en absoluta
const convertAbsulute = (pathRoute) => {
  const validateDirectory = process.cwd();
  return path.resolve(validateDirectory, pathRoute);
};

//validar que sea un directorio
const validateDirectory = (pathRoute) => {
  const stats = fs.statSync(pathRoute);
  return stats.isDirectory();
};

//leer los archivos de ese directorio // devuelve un arr con el contenido del direct
const readDirectory = (pathRoute) => fs.readdirSync(pathRoute);

//validar que la extención sea .md
const validateRouteMd = (pathRoute) =>
  path.extname(pathRoute) === ".md" ? true : false;

//implementando la recursividad
const RecursiveFunction = (pathRoutes) => {
  let arrReadMd = [];
  if (validateRouteMd(pathRoutes)) {
    arrReadMd.push(pathRoutes); //se llena si la ruta tiene ext md si no es un directory
  } else if (validateDirectory(pathRoutes)) {
    //leer las rutas del directorio e itera el contenido que tiene
    const contentRoute = readDirectory(pathRoutes);
    contentRoute.forEach((routes) => {
      console.log(
        (arrReadMd = arrReadMd.concat(
          RecursiveFunction(`${pathRoutes}/${routes}`)
        ))
      ); //concatenar la ruta de los directorios para que me los devuelva en un arr
    });
  }
  return arrReadMd;
};

//Leer contenido de archivos md
//
const readContentMd = (pathRoute) => {
  return new Promise((resolve, reject) => {
    fs.readFile(pathRoute, "utf-8", (error, data) => {
      if (error) {
        reject("hubo un error");
      } else {
        resolve(data);
      }
    });
  });
};

// readContentMd('README.md').then((data) => {
//  console.log(data)

// }).catch((error) => {
//   console.log(error)
// })

//validar todo tipo de ruta (caso false)
const invalidateAllRoutes = (pathRoute) => {
  return new Promise((resolve, reject) => {
    const arrFinalObjet = []; //usar este arr para crear un objet
    readContentMd(pathRoute) // es lento se maneja con una promesa // provar con readme
      .then((data) => {
        const regEx =
          /\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#]+[a-zA-Z0-9!-_$]+)\)/gi;
        //regEx.exec(data)//devuelve arr con link que cumplan con la expresion reg
        let arrResultRegEx = regEx.exec(data); //devuelve arr iterado
        if (arrResultRegEx !== null) {
          // evitar que me devuelva null por eso le pido todo lo que dif
          const arrIterado = arrResultRegEx.map((element) => element);
          arrFinalObjet.push({
            href: arrIterado[2],
            text: arrIterado[1],
            file: pathRoute, //provar con readme
          });
          resolve(arrFinalObjet);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
// invalidateAllRoutes('README.md')
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((error) => {
//     console.log(error);
//   });

//validar todo tipo de ruta (caso true) // devolver un arr de aobjet
const validateAllRoutes = (arrFinalObjet) => {
  // simulando parameter
  return Promise.all(
    arrFinalObjet.map((element) => {
      //cada objetc es una promesa y all me dev un arr de promise
      axios
        .get(element.href)
        .then((data) => {
          //data resp de axios big object
          const objetcValidateTrue = {
            // spreadOperator copia desde otro lado todo lo que tenga un object (...) copia href tax/ file
            ...element,
            status: data.status,
            statusText: data.statusText,
          };
          console.log(objetcValidateTrue);
        })
        .catch((error) => {
          const failObject = {
            ...element,
            status: error.data ? 404 : 404,
            statusText: "FAIL",
          };
          console.log(failObject);
        });
    })
  );
};
validateAllRoutes([
  {
    href: "https://es.wikipedia.org/wiki/Markdown/gina",
    text: "Markdown",
    file: "README.md",
  },
]);
