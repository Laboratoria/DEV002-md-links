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
  const fileString = readingFile.toString()
  return fs.readdir(fileString, (err, files) => {
    if (err){
      //console.log(err);
      return err
    }
    else {
      //console.log("\nCurrent directory filenames: ");
      files.forEach(file => {
        //console.log(file);
      return file
      })
    }
  const filePaths = path.join(fileString, files)
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
    return fs.readFile(resolvePath, (err, data) => {
      if (err) {
        //console.error("error " + err);
        return err;
      } else {
      //console.log("data:\n" + data)
      return data
      }
    })
  }
  })
}
console.log("function:\n" , mdLinks('./mdtests'))