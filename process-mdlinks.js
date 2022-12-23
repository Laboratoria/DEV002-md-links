const process = require("process")

process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
  });