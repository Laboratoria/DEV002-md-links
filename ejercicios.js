//-----------PRIMEROS PASOS: ejercicios previos a desarrollar proyecto---------------

const fs = require('fs');
const path = require('path');

//console.log(path)

const fileName = 'README.md'
const dirName = './files-to-read'

//console.log(fs);

console.log('START')

//---------Leyando un archivo md con ruta fija---------
const readFileFn = (file) => {
  fs.readFile(file, 'utf-8', (error, data) => {
    if (!error) {
      console.log(data);
    } else {
      console.log(`Error: ${error}`);
    }
  });
};
//readFileFn(fileName);

//-----------Leyendo extensión de archivo---------------
const ext = path.extname(fileName)
//console.log(ext)

//---------Leyendo archivos desde un directorio---------
function readDirFn(path) {
  fs.readdirSync(path).forEach(file => {
    console.log(file)
  })
};
//readDirFn('../DEV002-data-lovers');

//-----------Uniendo dos fragmentos de ruta------------
const joinedPath = path.join('./files-to-read', 'check.txt')
//console.log(joinedPath);
//readFileFn(joinedPath);

//-------------Recursividad------------------------------
function factorialCiclo(n) {
  if (n < 1) {
    throw new Error('Ingrese un número entero positivo');
  }
  let accum = 1;
  for (let i = 1; i <= n; i++) {
    accum = accum * i
  }
  return accum;
};

// console.log(factorialCiclo(5));

function factorialRecursiva(n) {
  if (n < 1) {
    throw new Error('Ingrese un número entero positivo');
  }
  if (n === 1) { //caso base -> necesario para decirle a la funcion cuando terminar, sino en teoria continua hasta el infinito, y en la pc, hasta agotar sus recursos
    return 1;
  }
  return (n * factorialRecursiva(n - 1));
};

//console.log(factorialRecursiva(5))

function fib(n) {
  if (n < 0) {
    throw new Error('Ingrese un número igual o mayor a 0');
  }
  if (n === 0) {
    return 0;
  }
  else if (n === 1) {
    return 1;
  }
  return (fib(n - 1) + fib(n - 2));
};

//console.log(fib(-2))
// console.log(fib(0))
// console.log(fib(1))
// console.log(fib(5))
// console.log(fib(6))
// console.log(fib(7))

// funcion para recorrer el DOM y funcion para ejecutar en el DOM
function walkTheDOM(node, funcToApply) { //recibe un nodo y una fn aplicable a cada uno de ellos
  funcToApply(node); //aplicando funcion a nodo
  let child = node.firstChild; //primer hijo (nodo) que se ha recibido
  while (child) { // mientras child exista
    walkTheDOM(child, funcToApply); //recorremos sub-arbol con la misma funcion
    child = child.nextSibling; //obetenemos proximo hermano y se repite
  }//no se especifica un caso base, ya que "nextSibling" retorna null cuando ya no hay más nodos. Ahi se detiene la funcion.
};

function reverseTextNodes(elem) { //recorre el DOM e invierte todos los textos
  walkTheDOM(elem, (node) => {
    if (node.nodeType === 3) { //es texto?
      const text = node.data.trim(); //extrae texto y quita espacios vacios
      if (text.length > 0) { //si hay texto
        node.data = text.split('').reverse().join(''); //revierte el texto
      }
    }
  })
}

//----------------Promesas--------------------------------------------
// En el sgte ejemplo la fn1 de ejecuta 2 seg despues del resto del codigo
// const fn1 = () => {
//   setTimeout(() => {
//     console.log('Hola');
//   }, 2000);
// };

// const fn2 = () => {
//   console.log('mundo');
// };

// fn1();
// fn2();

const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Hola');
  }, 2000);
});

myPromise
  .then(res => {
    console.log(res + ' mundo')
    console.log('END')
  })

//-----------------------------------------------------
//console.log('END')

//---------Exportando----------------------------------
module.exports = { readFileFn }


