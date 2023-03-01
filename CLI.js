#!/usr/bin/env node
const { argv } = require("process")
const { mdLink } = require("./index");


//creamos los siguientes argumentos (path, [--validate, --stats])
let path = argv[2];
let options_One = argv[3];
let options_Two = argv[4];
const options = [options_One, options_Two];

mdLink(path, options);

module.exports = mdLink