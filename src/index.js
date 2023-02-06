const fs = require('fs');

const mdLinks = (path, option) => {
    console.log('fix me')
};


// Validación de ruta: Check if the file exists in the current directory and is readeble.
const validatePath = (path) => {
    return new Promise((resolve, reject) => {
        fs.access(path, fs.constants.F_OK | fs.constants.R_OK, (err) => {
            if (!err) {
                resolve(true)
            } else {
                reject(new Error('Invalid or unreadeble path'))
            }
        })
    })
};

/* validatePath('./files-to-read/achicando.md')
    .then(res => console.log(res))
    .catch(err => console.error(err)) */

// validación de option | 'validate', {validate : true}, {validate : false}
const validateOption = (option) => {
    return new Promise((resolve, reject) => {
        if ( option === 'validate' || (typeof option === 'object' && (option.validate === true || option.validate === false)) ) {
            resolve(true)
        } else {
            reject(new Error('Invalid option'))
        }
    })
};



// validación de path absoluta o relativa
// validación de directorio
// validación de archivo md



module.exports = {
    mdLinks,
    validatePath,
    validateOption
}
