const { mdLinks } = require('../index.js');

describe('mdLinks', () => {
  it('Debe ser una función', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('Debe devolver una promesa', () => mdLinks()
    .then(() => {
      expect(mdLinks).toBe(typeof 'promise');
    })
    .catch((error) => error));
});