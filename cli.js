const process = require("process")
const { mdLinks } = require("./index.js")
const { countUniqueLinks } = require("./md_links")

const [, , ...args] = process.argv
// console.log([, , ...args])
if (args.length === 0) {
  console.error("Enter a path to be validated");
}
if (args.length === 1) {
  mdLinks(args[0], { validate: false })
    .then(response => console.log(response))
    .catch(error => console.log(error));
} else if (args.length === 2 && (args[1] === "--validate")) {
  mdLinks(args[0], { validate: true })
    .then(response => console.log(response))
    .catch(error => console.log(error));
} else if (args.length === 2 && (args[1] === "--stats")) {
  mdLinks(args[0], { validate: false })
    .then(arrayObjects => console.log(
      "Total links: " + arrayObjects.length + "\n" +
      "Unique links: " + countUniqueLinks(arrayObjects))
    )
    .catch(error => console.log(error));
} else if (args.length === 3 && (args[1] === "--stats" && args[2] === "--validate")) {
  mdLinks(args[0], { validate: true })
    .then(arrayObjects => console.log(
      "Total links: " + arrayObjects.length + "\n" +
      "Unique: " + countUniqueLinks(arrayObjects) + "\n" +
      "Broken: " + arrayObjects.filter(link => link.message === "Fail").length)
    )
    .catch(error => console.log(error));
} else {
  console.log("--Verify the parameters entered--" + "\n" +
  "Ex: " + "\n" +
  "--validate" + "\n" +
  "--stats" + "\n" +
  "--stats --validate");
}
// mdLinks(getPathFromArguments(arguments), getOptionsFromArguments(arguments))
// .then(response => console.log(response))
// .catch(error => console.log(error));

module.exports = { mdLinks }


