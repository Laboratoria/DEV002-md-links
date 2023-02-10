const { mdLinks } = require("./index.js");

mdLinks("./routstesting")
  .then(() => {})
  .catch((error) => {
    console.log(error);
  });