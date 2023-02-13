const { existsSync } = require("fs");

const routExist = (pathname) => {
  const isValid = existsSync(pathname);
  return isValid ? true : false;
};

module.exports = { routExist };
