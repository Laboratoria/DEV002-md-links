/* getting paths OF A FILE
https://nodejs.dev/en/learn/working-with-folders-in-nodejs/ */

    // const fs = require('fs');
    // const path = require('path');
    // const file = './mdtests';

/* absolute path de los componentes de un archivo */
    // fs.readdirSync(file).map(fileName => {
    //     console.log("absolute path: " + path.join(file, fileName))
    // });

/* relative path */
    // console.log("relative path: " + fs.readdirSync(file))

/* file extension
https://codingbeautydev.com/blog/node-js-get-file-extension/
https://www.programiz.com/javascript/examples/file-extension */

    // const readMePartOne = './mdtests/part1.md';

/* obtiene la CARPETA en la que está almacenado el archivo */
    // console.log("dirname: " + path.dirname(readMePartOne))
/* obtiene el NOMBRE BASE del archivo */
    // console.log("basename: " + path.basename(readMePartOne))
/* obtiene la EXTENCIÓN del archivo */
    // console.log("extension: " + path.extname(readMePartOne))
/* obtiene la RUTA ABSOLUTA del archivo */
    // console.log("resolve: " + path.resolve(readMePartOne))

/* lee documento .md
https://nodejs.dev/en/learn/reading-files-with-nodejs/ */

    // fs.readFile('./mdtests/part1.md', (err, data) => {
    //     if (err) {
    //     console.error(err);
    //     return;
    //     }
    //     console.log("\nlectura archivo:\n \n" + data);
    // });

/* con el 'utf8' */
// fs.readFile('./mdtests/part1.md', 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log("\nlectura archivo:\n \n" + data);
//   });