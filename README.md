# Markdown Links
***
## Features
***
Markdown es un lenguaje de marcado ligero muy popular entre developers. Es usado en muchísimas plataformas que manejan texto plano (GitHub, foros, blogs, ...), y es muy común encontrar varios archivos en ese formato en cualquier tipo de repositorio (empezando por el tradicional README.md).

Estos archivos Markdown normalmente contienen links (vínculos/ligas) que muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una herramienta usando Node.js, que lea y analice archivos en formato Markdown, para verificar los links que contengan y reportar algunas estadísticas.


![md-links](https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg)

## Introduction
***
Node.js es un entorno de ejecución para JavaScript construido con el motor de JavaScript V8 de Chrome. Esto nos va a permitir ejecutar JavaScript en el entorno del sistema operativo, ya sea tu máquina o un servidor, lo cual nos abre las puertas para poder interactuar con el sistema en sí, archivos, redes, ...

En este proyecto nos alejamos un poco del navegador para construir un programa que se ejecute usando Node.js, donde aprenderemos sobre cómo interactuar con el sistema archivos, con el entorno (proceso, env, stdin/stdout/stderr), ...

## Objectives
***
El objetivo de esta librería es crear una herramienta que facilite a las personas a encontrar los links que hay dentro de un texto plano y verificar el status de estos, es decir, la librería verifica si los links estan rotos o son links funcionales y hace diferentes reportes con la información resumida.

## Flowchart

![flowchart](./imgdrawio/drawio1.png)
![flowchart](./imgdrawio/drawio2.png)
![flowchart](./imgdrawio/drawio3.png)

## Usability mode
***
La manera en que debe usarse es tecleando en la terminal primero el nombre del archivo o carpeta a analizar y despues alguno de los siguientes comandos:

mdlinks - Para obtener un reporte de los links que hay en el archivo o carpeta, asi como la ruta de cada uno de ellos
--validate - para obtener un reporte de los links, su status, es decir, si esta roto o no y la ruta absoluta del archivo donde se encuentra el link
-- stats - con este comado se encontrará una estadística de los links totales y los links únicos.
-stats -validate - con este comando la librería arroja una estadística de los totales, los únicos y los links que están rotos.
Esta librería utiliza la recursividad, por lo que si la ruta que se le agregó es carpeta, analiza todos los archivos con extetnsióm .md que haya dentro de la misma y si es carpeta, busca dentro de la misma, hasta desglosarse en puros archivos .md

### Este proyecto consta de DOS partes
***
1) JavaScript API
El módulo debe poder importarse en otros scripts de Node.js y debe ofrecer la siguiente interfaz:

mdLinks(path, options)
Argumentos
path: Ruta absoluta o relativa al archivo o directorio. Si la ruta pasada es relativa, debe resolverse como relativa al directorio desde donde se invoca node - current working directory).

options: Un objeto con únicamente la siguiente propiedad:
validate: Booleano que determina si se desea validar los links encontrados.
Valor de retorno
La función debe retornar una promesa (Promise) que resuelva a un arreglo (Array) de objetos (Object), donde cada objeto representa un link y contiene las siguientes propiedades

Con validate: false :

href: URL encontrada.
text: Texto que aparecía dentro del link ().
file: Ruta del archivo donde se encontró el link.
Con validate:true :

href: URL encontrada.
text: Texto que aparecía dentro del link (<a>).
file: Ruta del archivo donde se encontró el link.
status: Código de respuesta HTTP.
ok: Mensaje fail en caso de fallo u ok en caso de éxito.
Ejemplo (resultados como comentarios)
const mdLinks = require("md-links");

 
2) CLI (Command Line Interface - Interfaz de Línea de Comando)
El ejecutable de nuestra aplicación debe poder ejecutarse de la siguiente manera a través de la terminal:

md-links <path-to-file> [options]

Por ejemplo:

 md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
El comportamiento por defecto no debe validar si las URLs responden ok o no, solo debe identificar el archivo markdown (a partir de la ruta que recibe como argumento), analizar el archivo Markdown e imprimir los links que vaya encontrando, junto con la ruta del archivo donde aparece y el texto que hay dentro del link (truncado a 50 caracteres).

Options
--validate
Si pasamos la opción --validate, el módulo debe hacer una petición HTTP para averiguar si el link funciona o no. Si el link resulta en una redirección a una URL que responde ok, entonces consideraremos el link como ok.

Por ejemplo:

 md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
Vemos que el output en este caso incluye la palabra ok o fail después de la URL, así como el status de la respuesta recibida a la petición HTTP a dicha URL.

--stats
Si pasamos la opción --stats el output (salida) será un texto con estadísticas básicas sobre los links.

 md-links ./some/example.md --stats
Total: 3
Unique: 3
También podemos combinar --stats y --validate para obtener estadísticas que necesiten de los resultados de la validación.

md --stats --validate





En tu consola ejecuta el siguiente comando:

### npm i mdlinks-taniafe

























































































































































































































































































































































































































