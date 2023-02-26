const { existsSync, statSync, readdirSync, readFile } = require("fs");
const { isAbsolute, resolve, extname } = require("path");
const { cwd } = require("process");
//el objeto process requiere la funcion cwd completa la ruta de donde esté cualquier archivo hasta donde estoy, generando así una ruta absoluta.
const axios = require("axios");

/**
 *
 * @param {string} pathname ésta es la ruta
 * @returns se valida si existe un path y retorna un boolean
 */
const routExist = (pathname) => {
  const isValid = existsSync(pathname);
  return isValid ? true : false;
};

/**
 *
 * @param {string} pathname ésta es la ruta
 * @returns se valida si la ruta es absoluta
 */
const validateAbsolute = (pathname) => {
  const absolut = isAbsolute(pathname);
  return absolut ? true : false;
};

/**
 *
 * @param {string} pathname es la ruta relativa
 * @returns una ruta absoluta
 */
const converToAbsolute = (pathname) => {
  const almacenRelativa = cwd();
  return resolve(almacenRelativa, pathname);
};

const isAdirectory = (pathname) => {
  const state = statSync(pathname);
  return state.isDirectory() ? true : false;
};

const readFolder = (pathname) => {
  const contents = readdirSync(pathname);
  return contents;
};

const itsMdFile = (pathname) => {
  return extname(pathname) === ".md" ? true : false;
};

const getMdFiles = (pathname) => {
  let mdArray = [];
  if (itsMdFile(pathname)) {
    mdArray.push(pathname);
  } else if (isAdirectory(pathname)) {
    const contentMDs = readFolder(pathname);
    contentMDs.map(
      (e) => (mdArray = mdArray.concat(getMdFiles(`${pathname}/${e}`)))
    );
  }
  return mdArray;
};

const funcReadFiles = (pathname) => {
  return new Promise((resolve, reject) => {
    readFile(pathname, "utf-8", (error, files) => {
      error ? reject(error) : resolve(files);
    });
  });
};

const validateRoute = (pathname) => {
  return new Promise((resolve, reject) => {
    const arrayResult = []; //aqui se almacena el contenido de la ruta
    funcReadFiles(pathname)
      .then((data) => {
        const regexValiRout =
          /\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#]+[a-zA-Z0-9!-_$]+)\)/gi;
        let storage = regexValiRout.exec(data);
        while (storage !== null) {
          arrayResult.push({
            href: storage[2],
            text: storage[1],
            file: pathname,
          });
          storage = regexValiRout.exec(data);
        }
        resolve(arrayResult);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const validateLinks = (arraysObject) => {
  return Promise.all(
    arraysObject.map((object) =>
      axios   //peticion GET con axios
        .get(object.href)
        .then((res) => {
          const objectfiveP = {
            ...object,
            status: res.status,
            ok: res.statusText ? res.statusText : "fail",
          };
          return objectfiveP;
        })
        .catch((error) => error)
    )
  );
};


const statUnique = (objectArrays) => {
  const resultHref = objectArrays.map((object) => object.href)
  const noRepeatHref = new Set(resultHref)
  return{
    totalFiles: resultHref.length,
    totalUnique: noRepeatHref.size,
  }
}



// statUnique([
//   {
//     href: "https://curriculum.laboratoria.la/es/topics/css/01-css/01-intro-css",
//     status: 200,
//     ok: "OK",
//   },
//   {
//     href: "https://curriculum.laboratoria.la/es/topics/css/01-css/01-intro",
//     status: 200,
//     ok: "OK",
//   },
//   {
//     href: "https://curriculum.laboratoria.la/es/topics/css/01-css/01-intro-css",
//     status: 200,
//     ok: "OK",
//   },
// ])

module.exports = {
  routExist,
  validateAbsolute,
  converToAbsolute,
  isAdirectory,
  readFolder,
  itsMdFile,
  getMdFiles,
  funcReadFiles,
  validateRoute,
  validateLinks,
  statUnique,
};
