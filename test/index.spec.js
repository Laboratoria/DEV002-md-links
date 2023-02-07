const {
  mdLinks,
  validatePath,
  validateOption,
  validateAbsolutePath,
  resolvePath,
  validateDirOrMD
} = require('../src/index.js');

const validPath = './files-to-read/achicando.md';
const invalidPath = 'achicando';
const absolutePath = '/home/user/app.js';
const relativePath = './app.js';
const myCurrentWorkingDirectory = '/home/user';
const validOption1 = { validate: true };
const validOption2 = { validate: false };
const validOption3 = 'validate';
const invalidOption1 = 'option';
const invalidOption2 = { validate: 33 };
const invalidFile = 'check.txt';

//test para mdLinks
describe('Test to mdLinks()', () => {
  it('mdLinks debería ser una función', () => {
    expect(typeof mdLinks).toBe('function')
  })
});

// test para validacion de path
describe('Test to validatePath()', () => {
  test('Returns true for a valid path', () => {
    return expect(validatePath(validPath)).resolves.toBe(true)
  });
  test('Throw error for an invalid path', () => {
    return expect(validatePath(invalidPath)).rejects.toThrow()
  });
});

// test para validación de option
describe('Test to validateOption()', () => {
  test('Returns true for a valid option', () => {
    return expect(validateOption(validOption1)).resolves.toBe(true)
  });
  test('Returns true for a valid option', () => {
    return expect(validateOption(validOption2)).resolves.toBe(true)
  });
  test('Returns true for a valid option', () => {
    return expect(validateOption(validOption3)).resolves.toBe(true)
  });
  test('Throw error for an invalid option', () => {
    return expect(validateOption(invalidOption1)).rejects.toThrow()
  });
  test('Throw error for an invalid option', () => {
    return expect(validateOption(invalidOption2)).rejects.toThrow()
  });
});

// test para validación de path absoluta o relativa
describe('Test to validateAbsolutePath()', () => {
  test('Returns true for an absolute path', () => {
    return expect(validateAbsolutePath(absolutePath)).toBe(true)
  });
  test('Returns false for a relative path', () => {
    return expect(validateAbsolutePath(relativePath)).toBe(false)
  });
});

// test para resolver ruta relativa a absoluta
describe('Test to resolvePath()', () => {
  test('Resolves a relative path into an absolute path', () => {
    return expect(resolvePath(myCurrentWorkingDirectory, relativePath)).toBe('C:\\home\\user\\app.js')
  });
});

// test para validación de directorio o archivo md
describe('Test to validateDirOrMD()', () => {
  test('Returns \'dir\' for a dir path', () => {
    return expect(validateDirOrMD(myCurrentWorkingDirectory)).resolves.toBe('dir')
  });
  test('Returns \'md file\' for a md file path', () => {
    return expect(validateDirOrMD(validPath)).resolves.toBe('md file')
  });
  test('Throw error for an invalid file', () => {
    return expect(validateDirOrMD(invalidFile)).rejects.toThrow()
  });
});

//------------------------------------
/* describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

}); */