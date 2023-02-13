const { existsSync } = require("fs");
const { isAbsolute } = require("path");

const routExist = (pathname) => {
  const isValid = existsSync(pathname);
  return isValid ? true : false;
};

const validateAbsolute = (pathname) => {
  const absolut = isAbsolute(pathname);
  return absolut ? true : false;
};

module.exports = { routExist, validateAbsolute };