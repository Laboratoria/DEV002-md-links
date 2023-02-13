const { existsSync } = require("fs");

console.log(existsSync("ruta/que/no/existe"));

const routExist = (pathname) => {
  const isValid = existsSync(pathname);
  return isValid ? true : false;
};

module.exports = { routExist };
