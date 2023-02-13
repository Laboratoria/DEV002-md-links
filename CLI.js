const { mdLink } = require("./index");

mdLink(
  
)
  .then((path) => {
    console.log(path);
  })
  .catch((error) => {
    console.log(error);
  });
