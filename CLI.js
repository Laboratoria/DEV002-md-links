const { mdLink } = require("./index");

mdLink("README.md", ["--stats"])
  .then((path) => {
   
  })
  .catch((error) => {
    console.log(error);
  });
