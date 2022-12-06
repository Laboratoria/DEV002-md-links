//node index.js

module.exports = () => {
  // ...
};

const fs = require('fs');
const path = require('path');

const mdLinks = (readingFile) => {
  return new Promise((resolve, reject) => {
  const fileString = readingFile.toString()
  //console.log("fileString: " + fileString)
  fs.readdir(fileString, (err, files) => {
    if (err){
      //console.log("err 1: " + err);
      reject(err)
    }
    else {
      const readingFiles = files.map((file)=>{
        return new Promise((done, notDone)=>{
        const filePaths = path.join(fileString, file)
        //console.log("filePaths: " + filePaths)
        const fileExt = path.extname(filePaths)
        //console.log("fileExt: " + fileExt)
        if (fileExt === ".md"){
            const justMD = filePaths.slice(".md").split(",")
            //console.log("justMD: " + justMD)
            const mdString = justMD.toString()
            //console.log("mdString: " + mdString)
            const resolvePath = path.resolve(mdString)
            //console.log("resolvePath: " + resolvePath)
            fs.readFile(resolvePath, (err, data) => {
              if (err) {
                //console.error("error 2: " + err);
                notDone(err);
              } else {
                //console.log("data:\n" + data)
                done(data)
              }
            })
          }
        })
      })
      resolve(readingFiles)
    }
  })
  })
}

mdLinks('./mdtests').then((readingFiles) => {
  const values = Promise.all(readingFiles)
  // Promise.all(readingFiles).then(values => {
  //   console.log("values; ", values)
  // })
  console.log("filesPromise: ", values)
})
//console.log("function:\n" , mdLinks('./mdtests'))