//node index.js

module.exports = () => {
  // ...
};

/* lee documento .md
https://nodejs.dev/en/learn/reading-files-with-nodejs/ */

const fs = require('fs');

fs.readFile('./mdtests/part1.md', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("\nlectura archivo:\n \n" + data);
});

/* file extension
https://codingbeautydev.com/blog/node-js-get-file-extension/
https://www.programiz.com/javascript/examples/file-extension */

const path = require('path');

const readMePartOne = './mdtests/part1.md';

/* obtiene la CARPETA en la que está almacenado el archivo */
console.log("dirname: " + path.dirname(readMePartOne))
/* obtiene el NOMBRE BASE del archivo */
console.log("basename: " + path.basename(readMePartOne))
/* obtiene la EXTENCIÓN del archivo */
console.log("extension: " + path.extname(readMePartOne))
/* obtiene la RUTA ABSOLUTA del archivo */
console.log("resolve: " + path.resolve(readMePartOne))

/* getting paths OF A FILE
https://nodejs.dev/en/learn/working-with-folders-in-nodejs/ */

const file = './mdtests';

/* relative path */
console.log("relative path: " + fs.readdirSync(file))

/* absolute path */
fs.readdirSync(file).map(fileName => {
  console.log("absolute path: " + path.join(file, fileName))
});