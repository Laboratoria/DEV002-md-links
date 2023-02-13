const fs = require("fs");

// Función para validar si existe la ruta
const existPath = (path) => fs.existsSync(path);


module.exports = {
  existPath,
};