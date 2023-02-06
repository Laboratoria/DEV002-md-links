
const { mdLinks } = require('../index.js');


describe('mdLinks', () => {

  // it('should...', () => {
  //   console.log('FIX ME!');
  // });

  // it('deveria devolver  una promesa', () => {
  //   expect(mdLinks()).toBe(typeof Promise);
  // });

  it('Debe rechazar cuando el path no existe ', () => {
    return mdLinks('./README.md').catch((error) => {
       expect(error).toBe('la ruta no existe')
    })

    

  });

});
