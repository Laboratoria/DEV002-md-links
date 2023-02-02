// module.exports = () => {
//   //
// };

const fs = require('fs');
const path = require('path');

//console.log(path)

const fileName = 'README.md'
const dirName = './file-directory'

//console.log(fs);

console.log('START')

//---------Leyando un archivo md con ruta fija
const readFileFn = (file) => {
  fs.readFile(file, 'utf-8', (error, data) => {
    if (!error) {
      console.log(data);
    } else {
      console.log(`Error: ${error}`);
    }
  });
};
readFileFn(fileName);

//-----------Leyendo extensión de archivo
const ext = path.extname(fileName)
//console.log(ext)

//---------Leyendo archivos desde un directorio
function readDirFn (path) {
  fs.readdirSync(path).forEach(file => {
    console.log(file)
  })
};
readDirFn(dirName);

console.log('END')

//---------Exportando
module.exports = { readFileFn }


