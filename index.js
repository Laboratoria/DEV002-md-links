const { routExist } = require("./validator");

const mdLink = (path, options) => {
  return new Promise((resolve, reject) => {
    if (options === undefined) {
      reject('invalid route');
    } else {
      routExist(path);
      resolve('the route exists')
    }
  });
};

module.exports = { mdLink };
