const fs = require('fs');

const mdLinks = (path, options) => {
return new Promise ((resolve, reject) => {
  // Identifica si la ruta existe
  if(fs.existsSync(path)) {
  // Revisar o convertir a una ruta absoluta
  // Probar si la ruta absoluta es archivo o directorio 
  // Si es un directorio mostrar los archivos md
  } else {
    // Si no existe la ruta, rechaza la promesa
  reject('La ruta no existe');
  }
  
});
}

module.exports =  {
  mdLinks
};
