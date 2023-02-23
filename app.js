const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { Console } = require('console');
const { resolve } = require('path');

const mdFiles = [];
 
 // si es¡xiste el archivo
const fileExists = (pathname) => {
    return fs.existsSync(pathname);
}

// si es absoluta
const checkPath = (pathname) => {
    return path.isAbsolute(pathname) 
}

//convierte a absoluta
const getAbsolutePath = (relativePath) => {
  return new Promise((resolve, reject) => {
    const absolutePath = path.resolve(relativePath);
    if (absolutePath) {
      resolve(absolutePath);
    } else {
      reject('No se pudo obtener la ruta absoluta.');
    }
  });
}


// archivo con terminacion .m
const isMdFile = (filePath) => {
  return path.extname(filePath) === '.md';
};

// es directorio
const readDir = (dir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (error, files) => {
      if (error) {
        reject(error);
      } else {
        resolve(files);
      }
    });
  });
};

const isDirectory = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.lstat(filePath, (error, stats) => {
      if (error) {
        reject(error);
      } else {
        resolve(stats.isDirectory());
      }
    });
  });
};

const extractLinks = (ruta) => {
  return new Promise((resolve, reject) => {
    fs.readFile(ruta, 'utf-8', (error, fileContents) => {
      if (error) {
        return reject(error);
      }

      const regex = /\[(.*)\]\((https?:\/\/\S+)\)/g;
      const links = [];

      let match;
      while ((match = regex.exec(fileContents))) {
        links.push({
          text: match[1],
          href: match[2],
          file: ruta,

        });
      }

      resolve(links);
    });
  });
};

const validateLinks = (links) => {

  return new Promise((resolve, reject) => {

    axios
      .get(links)
      .then(response => {
        
        const contStatus = response.status;
        const contStatusText = response.statusText;
       //statusMessage
        // http: __currentUrl
        //statusCode

        resolve({contStatus, contStatusText})
      })
      .catch(error => {
        if (error.code === 'ENOTFOUND') {
          reject("codigo roto")

        }


      })


  })
};

const processLinks = (extract) => {
 return  extract.then((links) => {
    // Aquí puedes recorrer los links 
 const arrLinks =  links.map(link => {
  // console.log("linkss", link)
      const linkHref = link.href
     
    const promesaLink =  validateLinks(linkHref)
      
        .then((response) => {
          const obj = { 
            ...links,
            status: response.status,
            ok: response.statusText 
          };
        
          return obj;
        } )
    
        .catch((error) => console.error(error))

     return promesaLink;
        


    });
    return arrLinks;
  });


};



















module.exports = {
  getAbsolutePath,checkPath,isDirectory, readDir, extractLinks,processLinks,isMdFile

};