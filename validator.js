const { existsSync, statSync, readdirSync, readFile } = require("fs");
const { isAbsolute, resolve, extname } = require("path");
const { cwd } = require("process");
//el objeto process requiere la funcion cwd completa la ruta de donde esté cualquier archivo hasta donde estoy, generando así una ruta absoluta.
const axios = require("axios");//para hacer peticiones

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
  return state.isDirectory() ? true : false;  //isDirectory es una funcion del objeto statSync
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
      (e) => (mdArray = mdArray.concat(getMdFiles(`${pathname}/${e}`)))// el'/'para acceder al elemento de esa ruta
    );
  }
  return mdArray;
};

const funcReadFiles = (pathname) => {     //laboratoria nos prohibe usar readFileSync
  return new Promise((resolve, reject) => {
    readFile(pathname, "utf-8", (error, files) => {
      error ? reject(error) : resolve(files);
    });
  });
};

//a travez de regexValitRout quiero que la ruta cumpla con dicho patron

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
        return reject(error);
      });
  });
};


const validateLinks = (arraysObject) => {
  return Promise.all(   //all me da un array de promesas
    arraysObject.map((object) =>
      axios //peticion GET con axios
        .get(object.href)
        .then((res) => {
          const objectfiveP = {
            ...object,
            status: res.status,
            ok: res.statusText ? res.statusText : "fail",
          };
          return objectfiveP;
        })
        .catch((err) => {
          const resErrorObject = {
            ...object,
            status: err.res ? 404 : 404,
            ok: "fail"
          }
          return resErrorObject
        })
    )
  );
};


const statUnique = (objectArrays) => { //aqui se manejan las estadísticas
  const resultHref = objectArrays.map((object) => object.href);
  const noRepeatHref = new Set(resultHref);//Set = noRepeat
  return {
    totalFiles: resultHref.length,
    totalUnique: noRepeatHref.size,
  };
};

//esta función me retorna lo que se necesita si la opcion que se ingresa
//es --validate y --stats juntos(total files, unique files, broken)
const returnBrokenLinks = (arrayObjects) => {
  const allOkBroken = arrayObjects.filter((object) => object.ok === "fail");
  return {
    totalFiles: arrayObjects.length,
    totalUnique: statUnique(arrayObjects).totalUnique,
    broken: allOkBroken.length,
  };
};


const getAllMdFiles = (pathname) => {
  if(routExist(pathname)){
    validateAbsolute(pathname)
    converToAbsolute(pathname)
  }
  return getMdFiles(pathname)
}

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
  returnBrokenLinks,
  getAllMdFiles,
};
