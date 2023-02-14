const { existPath, absolutePath, existFile } = require("../functions.js");

// Test validacion del Path
describe('existPath', () => {
  it("Debe validar cuando el path existe", () => {
    existPath('Testing/PruebaconLinks.md');
    expect(existPath('Testing/PruebaconLinks.md')).toEqual(true);
  });
  it("Debe validar cuando el path no existe", () => {
    existPath("./laura/test1.md");
    expect(existPath("./laura/test1.md")).toEqual(false);
  });
});

// Test validacion si la ruta es absoluta o relativa
describe('absolutePath', () => {
  it('Debe cambiar la ruta a absoluta si es relativa', () => {
    absolutePath('./README.md');
    expect(absolutePath('./README.md')).toBe('C:\\Users\\Laura\\Desktop\\PROYECTOS LABORATORIA\\DEV002-md-links\\README.md');
  });
  it('Debe devolver la ruta si ya es absoluta', () => {
    absolutePath(`./README.md`);
    expect(absolutePath(`./README.md`)).toBe('C:\\Users\\Laura\\Desktop\\PROYECTOS LABORATORIA\\DEV002-md-links\\README.md');
  });
});

// Test validacion si el archivos es tipo.md
describe('existFile', () => {
  it('Debe devolver true si el archivo es tipo .md', () => {
    existFile('./README.md');
    expect(existFile('./README.md')).toEqual(true);
  });
  it('Debe devolver false si el archivo no es tipo .md', () =>{
    existFile('./package.json');
    expect(existFile('./package.json')).toEqual(false);
  })
})

