// rutas para comprobar mis test

const routTestOne =
  "D:Backup ticket 3806EscritorioprogramaciónarchivosMD/rutauno.md";
const routTestTwo =
  "C:/Users/Usuario/Desktop/DEV002-md-links/test/files/helloWorld.md";
const routRelOne = "JS/css.md";
const directoryS = "C:/Users/Usuario/Desktop/DEV002-md-links/test/files";
const directoryFalse =
  "C:/Users/Usuario/Desktop/Captura de pantalla 2023-02-14 194814.png";
const readFiles =
  "C:/Users/Usuario/Desktop/DEV002-md-links/test/files/interna_one/interna_two";

const mdArrayInternaFour =
  "C:/Users/Usuario/Desktop/DEV002-md-links/test/files/interna_one/interna_two/interna_four";

const arrayStore = [
  "C:/Users/Usuario/Desktop/DEV002-md-links/test/files/interna_one/interna_two/interna_four/fileFour.2.md",
  "C:/Users/Usuario/Desktop/DEV002-md-links/test/files/interna_one/interna_two/interna_four/fileFour.3.md",
  "C:/Users/Usuario/Desktop/DEV002-md-links/test/files/interna_one/interna_two/interna_four/fileFour.md",
];

const routEmpty =
  "C:/Users/Usuario/Desktop/DEV002-md-links/test/files/interna_one/interna_two/internaEmpty";

const manyFiles =
  "C:/Users/Usuario/Desktop/DEV002-md-links/test/files/interna_one/interna_two/file_two.2.md";

const returnOfValidateRoute = [
  {
    file: "C:/Users/Usuario/Desktop/DEV002-md-links/test/files/interna_one/interna_two/file_two.2.md",
    href: "https://curriculum.laboratoria.la/es/topics/css/01-css/01-intro-css",
    text: "Intro a CSS",
  },
];

const returnFail = "C:/Users/Usuario/Desktop/DEV002-md-links/test/files/interna_one/fail.txt"

const linksBrokenGoodAndrepeat =  [
  {
    file: "C:/Users/Usuario/Desktop/DEV002-md-links/test/files/interna_one/interna_two/file_two.2.md",
    href: "https://curriculum.laboratoria.la/es/topics/css/01-css/01-intro-css",
    text: "Intro a CSS",
    status: 200,
    ok: "OK",
  },
  {
    file: "",
    href: "https://exampleBroke.com",
    text: "Intro a CSS",
    status: 404,
    ok: "fail",
  },
  {
    file: "C:/Users/Usuario/Desktop/DEV002-md-links/test/files/interna_one/interna_two/file_two.2.md",
    href: "https://curriculum.laboratoria.la/es/topics/css/01-css/01-intro-css",
    text: "Intro a CSS",
    status: 200,
    ok: "OK",
  },
  {
    file: "",
    href: "https://exampleBroke.com",
    text: "Intro a CSS",
    status: 404,
    ok: "fail",
  },
]

module.exports = {
  routTestOne,
  routTestTwo,
  routRelOne,
  directoryS,
  directoryFalse,
  readFiles,
  mdArrayInternaFour,
  arrayStore,
  routEmpty,
  manyFiles,
  returnOfValidateRoute,
  returnFail,
  linksBrokenGoodAndrepeat,
};
