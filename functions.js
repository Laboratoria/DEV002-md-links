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
  const validateDirectory = process.cwd();
  return path.resolve(validateDirectory, route);
};

//¿Es un directorio?
// console.log (fs.statSync('./pruebas'));
// console.log(stats.isDirectory('./pruebas'));

const validDir = (route) => {
  const stats = fs.statSync(route);
  return stats.isDirectory();
};

//lee los archivos del directorio
//console.log(fs.readdirSync('./pruebas')); debería devolver un array con el contenido de ese directorio
const readFile = (route) => fs.readdirSync(route);

//validar que la función sea md
const mdFile = (route) => (path.extname(route) === ".md" ? true : false);

//recursividad
const recursive = (paths) => {
  let arrReadMd = [];
  if (mdFile(paths)) {
    arrReadMd.push(paths); //se llena si la ruta tiene ext md si no es un directorio
  } else if (validDir(paths)) {
    const contentRoute = readFile(paths); //leer las rutas del directorio e itera el contenido que tiene
    contentRoute.forEach((paths) => {
      console.log(
        (arrReadMd = arrReadMd
          .concat
          // recursive(`${}/${}`) //concatenar la ruta de los directorios para que me los devuelva en un array
          ())
      );
    });
  }
  return arrReadMd;
};

//lee directorios y retorna archivos md

const readFileMd = (route) => {
  return new Promise((res, rej) => {
    fs.readFile(route, "utf-8", (error, data) => {
      if (error) {
        rej("ocurrió un error");
      } else {
        res(data);
      }
    });
  });
};

// readFileMd('README.md').then((data) => {
//  console.log(data)
//
// }).catch((error) => {
// console.log(error)
// })

//Validar todo tipo de ruta 'false'
const routeFalse = (route) => {
  return new Promise((res, rej) => {
    //usar este array para crear un objeto invalidateAllRoutes
    const allLinks = [];
    //promesa(lento) // probar con readme readContentMd
    readFileMd(route)
      .then((data) => {
        const regExp =
          /\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#]+[a-zA-Z0-9!-_$]+)\)/gi;

        //regExp.exec(data)//devuelve array con link que cumplan con la regEx...

        let resultRegEx = regExp.exec(data); //devuelve array iterado
        if (resultRegEx !== null) {
          // evitar que me devuelva null

          const dataFiles = resultRegEx.map((content) => content);
          allLinks.push({
            href: dataFiles[2],
            text: dataFiles[1],
            file: route, //probar con readme
          });
          res(allLinks);
        }
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

//validar ruta (true) devolver un arr de objet

const trueRoute = (allLinks) => {
  // simulando parameter
  return Promise.all(
    allLinks.map((content) => {
      //cada objetc es una promesa y all me dev un arr de promise
      axios
        .get(content.href)
        .then((data) => {
          //axios
          const objs = {
            ...content,
            status: data.status,
            statusText: data.statusText,
          };
          console.log(objs);
        })
        .catch((error) => {
          const failObject = {
            ...content,
            status: error.data ? 404 : 404,
            statusText: "FAIL",
          };
          console.log(failObject);
        });
    })
  );
};
trueRoute([
  {
    href: "https://es.wikipedia.org/wiki/Markdown/tania",
    text: "Markdown",
    file: "README.md",
  },
]);
