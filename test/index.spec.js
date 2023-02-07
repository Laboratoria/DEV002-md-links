const {
  mdLinks,
  validatePath,
  validateOption,
  validateAbsolutePath
} = require('../src/index.js');

//test para mdLinks
describe('Test to mdLinks()', () => {
  it('mdLinks debería ser una función', () => {
    expect(typeof mdLinks).toBe('function')
  })
});

// test para validacion de path
describe('Test to validatePath()', () => {
  test('Returns true for a valid path', () => {
    const validPath = './files-to-read/achicando.md';
    return expect(validatePath(validPath)).resolves.toBe(true)
  });
  test('Throw error for an invalid path', () => {
    const invalidPath = 'achicando'
    return expect(validatePath(invalidPath)).rejects.toThrow()
  });
});

// test para validación de option
describe('Test to validateOption()', () => {
  test('Returns true for a valid option', () => {
    const validOption1 = { validate: true };
    return expect(validateOption(validOption1)).resolves.toBe(true)
  });
  test('Returns true for a valid option', () => {
    const validOption2 = { validate: false };
    return expect(validateOption(validOption2)).resolves.toBe(true)
  });
  test('Returns true for a valid option', () => {
    const validOption3 = 'validate';
    return expect(validateOption(validOption3)).resolves.toBe(true)
  });
  test('Throw error for an invalid option', () => {
    const invalidOption1 = 'option'
    return expect(validateOption(invalidOption1)).rejects.toThrow()
  });
  test('Throw error for an invalid option', () => {
    const invalidOption2 = { validate: 33 }
    return expect(validateOption(invalidOption2)).rejects.toThrow()
  });
});

// test para validación de path absoluta o relativa
describe('Test to validateAbsolutePath', () => {
  test('Returns true for an absolute path', () => {
    const absolutePath = '/home/user/app.js';
    return expect(validateAbsolutePath(absolutePath)).toBe(true)
  });
  test('Returns false for a relative path', () => {
    const relativePath = './app.js';
    return expect(validateAbsolutePath(relativePath)).toBe(false)
  });
});

// test para validación de directorio
// test para validación de archivo md
//------------------------------------
/* describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

}); */