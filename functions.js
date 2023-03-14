const fs = require("fs");
const path = require("path");
const process = require("process");
const axios = require("axios");
const colors = require("colors");
// console.log(fs);

//FUNCIONES A UTILIZAR

//¿La ruta existe?
// console.log(fs.existsSync('./pruebas'));
const validPath = (route) => fs.existsSync(route);

//¿La ruta es absoluta?
// console.log(path.isAbsolute('./pruebas'));
const absolutePath = (route) => path.isAbsolute(route);

//convierte la ruta de relativa en absoluta
// console.log(process.cwd("./pruebas"));
// ruta transformada: C:\Users\tania\OneDrive\Escritorio\Proyectos Laboratoria\mdLinks\DEV002-md-links

const transformAbs = (route) => {
  const validDir = process.cwd(); //verifica si el arcivo existe en el local
  return path.resolve(validDir, route); //si es directorio, devuelve una ruta absoluta
};

//¿Es un directorio?

const validDir = (route) => {
  //devuelve 'true' si la ruta especificada es una carpeta válida, y 'false' si no lo es.
  const stats = fs.statSync(route);
  return stats.isDirectory();
};

//lee los archivos del directorio
//console.log(fs.readdirSync('./pruebas')); debería devolver un array con el contenido de ese directorio
const readFile = (route) => fs.readdirSync(route);

//validar que la función sea md devuelve la ext se un arch
const mdFile = (route) => (path.extname(route) === ".md" ? true : false);

//recursividad
const recursive = (route) => {
  let arrReadMd = [];
  if (mdFile(route)) {
    arrReadMd.push(route); //se llena si la ruta tiene ext md si no es un directorio
  } else if (validDir(route)) {
    const contentRoute = readFile(route); //leer las rutas del directorio e itera el contenido que tiene
    contentRoute.forEach((pathRoute) => {
      //route es el elemt que se esta iterando del arr de string que me devolv contenRoute

      arrReadMd = arrReadMd.concat(recursive(`${route}/${pathRoute}`));  
    })
  }
  return arrReadMd;
};

//lee directorios y retorna archivos md

const readFileMd = (route) => {
  return new Promise((res, rej) => {
    fs.readFile(route, "utf-8", (error, data) => {
      error ? rej("Ocurrió un error") : res(data);
        
      });
    });
};
// const readFileMd = (route) => {
// return new Promise((res, rej) => {
// fs.readFile(route, "utf-8", (error, data) => {
// error ? rej("ocurrió un error") : res(data);
// });
// });
// };

//Validar todo tipo de ruta 'false'
const routeFalse = (route) => {
  return new Promise((res, rej) => {
    const allLinks = []; //usar este array para crear un objeto
    readFileMd(route) //promesa(lento) probar con readme readContentMd
      .then((data) => {
        const regExp =
          /\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#]+[a-zA-Z0-9!-_$]+)\)/gi;

        //regExp.exec(data)//devuelve array con link que cumplan con la regEx...

        let resultRegEx = regExp.exec(data); //devuelve array iterado
        while (resultRegEx !== null) {
          // evitar que me devuelva null

          allLinks.push({
            href: resultRegEx[2],
            text: resultRegEx[1],
            file: route, //probar con readme
          });
          resultRegEx = regExp.exec(data);
        }
        res(allLinks);
      })
      .catch((error) => {
        rej(error);
      });
  });
};

// routeFalse('README.md')
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((error) => {
//     console.log(error);
//   });

//validar ruta (true) devolver un array de objeto

const trueRoute = (allLinks) => {
  // simulando parameter
  return Promise.all(
    allLinks.map((content) => {
      //cada objeto es una promesa y all me dev un array de promesa
      return axios //peticiones http a un serv
        .get(content.href) //hace peticion para obtener datos obtener inf de esa url
        .then((data) => {
          //axios
          const objs = {
            ...content,
            status: data.status, //se presenta con num
            statusText: data.statusText, //string
          };
          return (objs);
        })
        .catch((error) => {
          const failObject = {
            ...content,
            status: error.data ? 404 : 404,
            statusText: "FAIL",
          };
          return(failObject);
        });
    })
  );
};
// trueRoute([
// {
// href: "https://es.wikipedia.org/wiki/Markdown/tania",
// text: "Markdown",
// file: "README.md",
// },
// ]);

// estadística de archivos repetidos (en caso de que hayan) console.log(new Set([50,90,30,'veinte', 'ocho', 90,30,'quince'])) //instancia de un modelo existente // set no funciona con lengh si no con size
const statsRep = (allLinks) => {
  // me va a devolver un arr de links
  const linksAr = allLinks.map((content) => content.href);
  const linksU = new Set(linksAr); // me va a dar linsk unicos
  return {
    total: linksAr.length,
    unique: linksU.size,
  };
};
// console.log(statsRep([
//   {
//     href: "https://es.wikipedia.org/wiki/Markdown/tania",
//     text: "Markdown",
//     file: "README.md",
//   },
//   {
//     href: "https://es.wikipedia.org/wiki/Markdown/tania",
//     text: "Markdown",
//     file: "README.md",
//   },
// ]));
//validar links rotos
const brokenLinks = (allLinks) => {
  const brokenAr = allLinks.filter((content) => content.statusText === "FAIL"); //filtrar de acuerdo a una condición //devuelve un arr con los rotos
  return {
    total: allLinks.length,
    unique: statsRep(allLinks).unique,
    broken: brokenAr.length,
  };
};
// console.log(brokenLinks([
//         {
//           href: "https://es.wikipedia.org/wiki/Markdown/tania",
//           text: "Markdown",
//           file: "README.md",
//           statusText:"FAIL",
//         },
//         {
//           href: "https://es.wikipedia.org/wiki/Markdown/tania",
//           text: "Markdown",
//           file: "README.md",
//           statusText: "FAIL",
//         },
//       ]))

//obtener archivos md //usar ejemplo readme.md
const addFileMd = (route) => {
  if (validPath(route)) {
    absolutePath(route);
    transformAbs(route);
  }
  return recursive(route); // devuelve un array con archivos md
};

// addFileMd();
module.exports = {
  addFileMd, //obtiene archivos md
  routeFalse, //valida ruta false
  trueRoute, //valida ruta true
  brokenLinks, //valida los links rotos
  statsRep, //devuelve stats
};
