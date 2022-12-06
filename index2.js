const fs = require('fs');
const path = require('path');

const mdLinks = (readingFile) => {
return fs.readdirSync(readingFile).map(file => {
const filePaths = path.join(readingFile, file)
  //console.log("filePaths: " + filePaths)
const fileExt = path.extname(filePaths)
  //console.log("fileExt: " + fileExt)
if (fileExt === ".md"){
    const justMD = filePaths.slice(".md").split(",")
    //console.log("justMD: " + justMD)
    const mdString = justMD.toString()
    //console.log("mdString: " + mdString)
    const resolvePath = path.resolve(mdString)
    //console.log("resolvePath: ", resolvePath)
    return fs.readFile(resolvePath, (err, data) => {
    if (err) {
        //console.error("error: " + err);
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