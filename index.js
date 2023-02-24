const {
  existPath,
  existMdFile,
  convertToAbsolute,
  getResultValidateStats,
  validateDirectory,
  getAllFilesDirectory,
  analyzeMdFilesArray,
  getHttpResponse,
  getStatsResult,
} = require("./functions.js");

const chalk = require("chalk");

const mdLinks = (path, options) => {
  
  return new Promise((resolve) => {
    let mdFilesArray = [];
    if (existPath(path)) { 
      console.log(chalk.bgGreen.bold("---------- INFO: The path exist ----------"));
      const absolutePath = convertToAbsolute(path); // Se convierte path a absolute
      if(validateDirectory(absolutePath)){ // valida que el path sea de un directorio
        getAllFilesDirectory(absolutePath).forEach(file => { // readAllFilesRecursive obtiene los archivos que hay dentro del directorio
          if(existMdFile(file)){ // valida archivo por archivo para saber si es o no .MD
            mdFilesArray.push(file); // En caso de encontrarlo lo almacena en un array
          }else{
            if(mdFilesArray === []){ // Valida que en caso de no encontrar archivos .MD muestre el mensaje informativo
              console.log(chalk.bgYellow.bold('---------- WARNING: no .md files ----------'));
            }
          } 
        });
      }else{
        // Entra a validar cuando por el path se pasa el archivo .md: node cli.js ./Testing/PruebaconLinks.md --validate --stats
        if(existMdFile(absolutePath)){ 
          mdFilesArray.push(absolutePath);
        }else{
           // Valida que en caso de no encontrar archivos .MD muestre el mensaje informativo
            console.log(chalk.bgYellow.bold('---------- WARNING: no .md files ----------'));          
        }
      }
//--------------------------------------------------------------------------------------------------
      //En esta sección comienza a validar los parámetros enviados: *--validate* y *--stats*
      //Este es el proceso para realizar el proceso de Validate y Stats ()
      if (options.validate === true && options.stats === true) {

        analyzeMdFilesArray(mdFilesArray)
          .then((result) => {
            //console.log(result)
            getHttpResponse(result)
              .then((result) => {
                const resultValidateAndStats = getResultValidateStats(result)
                console.log(chalk.bgGreen.bold('---------- Result Analysis Validate and Stats ----------'))
                console.log(resultValidateAndStats)
                resolve(resultValidateAndStats)
              })
          });
      //Este es el proceso para realizar el proceso de Validate
      } else if (options.validate === true && options.stats === false) {

        analyzeMdFilesArray(mdFilesArray)
          .then((result) => {
            getHttpResponse(result)
            console.log(result)
              .then((result) => {
                const validateLink = result
                resolve(validateLink)
                console.log(chalk.bgGreen.bold('---------- Result Analysis Validate ----------'))
                console.log(validateLink)
              })
          });
      //Este es el proceso para realizar el proceso de Stats
      } else if (options.stats === true  && options.validate === false) {
        analyzeMdFilesArray(mdFilesArray)
          .then((result) => {
            const valueStats = getStatsResult(result)
            console.log(chalk.bgGreen.bold('---------- Result Analysis Stats ----------'))
            console.log(valueStats)
            resolve(valueStats)
          });
      // Acá ingresa cuando no se tienen agregadas las banderas y se pasa la ruta completa
      } else {
        analyzeMdFilesArray(mdFilesArray)
          .then((result) => {
            const noOptions = result;
            resolve(noOptions)
            console.log(chalk.bgGreen.bold('---------- Result Analysis .md DOCUMENT ----------'))
            console.log(noOptions)
          });
        }
      }else{
        console.log(chalk.bgRed.bold("---------- ERROR: The path does not exist ----------"));
      }
    }
  )};


module.exports = {
  mdLinks,
};
