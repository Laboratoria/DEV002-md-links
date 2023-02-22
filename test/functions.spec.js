const { existPath, existMdFile, validateReadFileMd, getLinks, readAllFilesRecursive } = require("../functions.js");

// Method process.cwd = current working directory
const currentDir = `${process.cwd()}`;

describe("existPath", () => {
  it("Debe ser una función", () => {
    expect(typeof existPath).toBe("function");
  });
  it("Debe validar cuando el path existe", () => {
    existPath("Testing/PruebaconLinks.md");
    expect(existPath("Testing/PruebaconLinks.md")).toEqual(true);
  });
  it("Debe validar cuando el path no existe", () => {
    existPath("./Laura/test1.md");
    expect(existPath("./Laura/test1.md")).toEqual(false);
  });
});

// Test para validar si es archivo es tipo .md
describe("existMdFile", () => {
  it("Debe ser una función", () => {
    expect(typeof existMdFile).toBe("function");
  });
  it("Debe devolver true si el archivo es tipo .md", () => {
    existMdFile("./README.md");
    expect(existMdFile("./README.md")).toEqual(true);
  });
  it("Debe devolver false si el archivo no es tipo .md", () => {
    existMdFile("./README.md");
    expect(existMdFile("./package.json")).toEqual(false);
  });
});

//  Test para validar leer un archivo .md 
describe('validateReadFileMd', () => {
  it("Debe ser una función", () => {
    expect(typeof validateReadFileMd).toBe("function");
  });
  it('Debe devolver el contenido del archivo', () => {
    expect(validateReadFileMd(`${currentDir}\\Testing\\Prueba\\Prueba2\\archivo.md`))
      .toEqual('Prueba [Youtube](https://www.youtube.com)');
  });
});

// Test para traer los links
describe('getLinks', () => {
  it("Debe ser una función", () => {
    expect(typeof getLinks).toBe("function");
  });
  it('Debe obtener el link del archivo', () => {
    expect(getLinks(`${currentDir}\\Testing\\Prueba\\Prueba2\\archivo.md`))
      .toEqual(null)
  });
});

// Test para leer los archivos
describe("readAllFilesRecursive", () => {
  it("Debe ser una función", () => {
    expect(typeof readAllFilesRecursive).toBe("function");
  });
  it('Debe devolver los archivos del directorio', () => {
    expect(readAllFilesRecursive('./Testing'))
    .toEqual(["./Testing/Prueba/Prueba2/archivo.md", "./Testing/Prueba/Prueba2/archivoPrueba.js", "./Testing/PruebaconLinks.md", "./Testing/PruebasinLinks.md"])
  });
});