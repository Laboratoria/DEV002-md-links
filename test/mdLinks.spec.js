const { mdLinks } = require('../index.js');

describe("mdLinks", () => {
  it("Debe ser una función", () => {
    expect(typeof mdLinks).toBe("function");
  });
  it('Debe devolver una promesa', () => mdLinks()
  .then(() => {
    expect(mdLinks).toBe(typeof 'promise');
  })
  .catch((error) => error));
  it('Debe retornar error en la promesa si no encuentra un path', () => mdLinks('erika/path.md').catch((error) => {
    expect(error).toEqual("The path does not exist");
  }));
});