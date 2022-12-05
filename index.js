//node index.js

module.exports = () => {
  // ...
};

const fs = require('fs');
const path = require('path');


// fs.readdir(readingFile, (err, files) => {
//   if (err)
//     console.log(err);
//   else {
//     console.log("\nCurrent directory filenames: ");
//     files.forEach(file => {
//       console.log(file);
//     })
//   }
// })

//return fs.readdirSync(readingFile).map(fileName => {

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
                //console.error("error 2 " + err);
                return notDone(err);
              } else {
                console.log("data:\n" + data)
                return done(data)
              }
            })
          }
        })
      })
      //console.log("files " + files)
      //const completeReadingFiles = Promise.all(readingFiles)
      //console.log("mimi:", readingFiles)
      // Promise.all(readingFiles).then(values => {
      //   console.log(values)
        // return resolve("values")
      //})
      return resolve(readingFiles)
    }
  })
  // const filePaths = path.join(fileString, files)
  // //console.log("filePaths: " + filePaths)
  // const fileExt = path.extname(filePaths)
  // //console.log("fileExt: " + fileExt)
  // if (fileExt === ".md"){
  //   const justMD = filePaths.slice(".md").split(",")
  //   //console.log("justMD: " + justMD)
  //   const mdString = justMD.toString()
  //   //console.log("mdString: " + mdString)
  //   const resolvePath = path.resolve(mdString)
  //   //console.log("resolvePath: " + resolvePath)
  //   return fs.readFile(resolvePath, (err, data) => {
  //     if (err) {
  //       //console.error("error " + err);
  //       return err;
  //     } else {
  //     //console.log("data:\n" + data)
  //     return data
  //     }
  //   })
  // }
  })
}
mdLinks('./mdtests').then(async (readingFiles) => {
  const values = await Promise.all(readingFiles)
  // Promise.all(readingFiles).then(values => {
  //   console.log("values; ", values)
  // })
  console.log("filesPromise: ", values)
})
//console.log("function:\n" , mdLinks('./mdtests'))