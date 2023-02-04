const mdLinks = require('../src/index.js');

describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

});

// test para validacion de path

describe('Test para validar la ruta (path)', () => {
  it('Retorna true si la ruta es valida', () => {
    expect(validatePath(path)).resolve.toEqual(true);
  });
  it('Retorna false si la ruta es invalida', () => {
    expect(validatePath(path)).reject.toEqual(false);
  });
});

// test para validación de option
// test para validación de path absoluta o relativa
// test para validación de directorio
// test para validación de archivo md