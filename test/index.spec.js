const {
  mdLinks,
  validatePath,
  validateOption,
} = require('../src/index.js');

const validPath = './files-to-read/achicando.md';
const invalidPath = 'achicando'

//test para mdLinks
describe('Test para mdLinks', () => {
  it('mdLinks debería ser una función', () => {
    expect(typeof mdLinks).toBe('function')
  })
});

// test para validacion de path
describe('Test para validar la ruta (path)', () => {
  test('Retorna true si la ruta es valida', () => {
    return expect(validatePath(validPath)).resolves.toBe(true)
  });
  test('Arroja error si la ruta es invalida', () => {
    return expect(validatePath(invalidPath)).rejects.toThrow()
  });
});

// test para validación de option
describe('Test para validar la opcion (option)', () => {
  test('Retorna true si la opcion es valida', () => {
    return expect(validateOption({ validate: true })).resolves.toBe(true)
  });
  test('Retorna true si la opcion es valida', () => {
    return expect(validateOption({ validate: false })).resolves.toBe(true)
  });
  test('Retorna true si la opcion es valida', () => {
    return expect(validateOption('validate')).resolves.toBe(true)
  });
  test('Arroja error si la opcion es invalida', () => {
    return expect(validateOption('option')).rejects.toThrow()
  });
  test('Arroja error si la opcion es invalida', () => {
    return expect(validateOption({ validate: 33 })).rejects.toThrow()
  });
});


// test para validación de path absoluta o relativa
// test para validación de directorio
// test para validación de archivo md
//------------------------------------
/* describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

}); */