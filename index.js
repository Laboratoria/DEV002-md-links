const { routExist } = require("./validator");

/**
 * 
 * @param {string} path Este parametro recibe la ruta a evaluar
 * @param {Array<string>} options Es un array de opciones de comandos
 * @returns retorna una promesa
 * !es indispensable que la función mdLink lleve estos dos parametros.
 */
const mdLink = (path, options) => {
  /**
   * @param resolve es lo quedebe resolverse en la promesa
   * @param reject rechaza si la promesa cuando no se cumple
   */
  return new Promise((resolve, reject) => {
    /**
     * !option[] no puede estar undefined
     */
    if (options[0] === undefined && options[1] === undefined) {
      reject('invalid route');
    } else {
      routExist(path);
      resolve('the route exists')
    }
  });
};

module.exports = { mdLink };
 
