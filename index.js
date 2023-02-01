// module.exports = () => {
//   //
// };

  const fs = require('fs');

  //console.log(fs);

  //---------Leyando un archivo md con ruta fija
  const readFileFn = (path) => {
    fs.readFile(path, 'utf-8', (error, data) => {
      if (!error) {
        console.log(data);
      } else {
        console.log(`Error: ${error}`);
      }
    });
  };
  readFileFn('README.md');

module.exports = {readFileFn}


