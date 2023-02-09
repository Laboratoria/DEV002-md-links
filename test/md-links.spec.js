const { mdLinks } = require('../index.js');

describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
  // it('Debería ser una función', () => {
  //   expect(mdLinks()).toBe(typeof Promise)
  // });
  it('Debe rechazar cundo el path no existe', () => {
    return mdLinks('/erika/cursos/noexiste.md').catch ((error) => {
      expect(error).toBe('La ruta no existe')
    })
  });

});
