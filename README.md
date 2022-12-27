# Markdown Links 🔗

## Índice

* [1. Descripción del proyecto](#1-descripción-del-proyecto)
* [2. Proceso de creación](#2-proceso-de-creación)
* [3. Instrucciones de instalación/uso](#2-instrucciones-de-instalación/uso)
* [4. Consideraciones generales](#4-consideraciones-generales)

***

## 1. Descripción del proyecto
Markdown Links es una librería, que se desarrolló usando Node.js, para que lea y analice archivos en formato Markdown, para verificar el estado de los links que contengan y reportar algunas estadísticas.
## 2. Organización y plan de acción

📅 Trello, para organizar el sprint, es en donde está el planning.

📅 Git-Hub Projects, para crear el plan de acción para priorizar y organizar el trabajo.

![](img-README/Git-Hub_Projects.png)

### - Diagrama de flujo
![](img-README/Diagrama_Flujo.jpeg)

## 2. Instrucciones de instalación/uso
### - Instalación
 A través de la **terminal**:

`npm install @kamojeda/md-links`

### - Uso
Debe poder ejecutarse de la siguiente
manera a través de la **terminal**:

`@kamojeda/md-links <path-to-file> [options]`
Por ejemplo:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

También puedes importar con `require` para usarlo
  programáticamente **en tu código** con:

`const mdLinks = require("@kamojeda/md-links")`

Ofrece la siguiente interfaz:
#### `mdLinks(path, options)`

### - Argumentos

* `path`: Ruta **absoluta** o **relativa** al **archivo** o **directorio**.
Si la ruta pasada es relativa, se resuelve como relativa al directorio
desde donde se invoca node - _current working directory_).
* `options`: Un objeto con **únicamente** la siguiente propiedad:
  - `validate`: Booleano que determina si se desea validar los links
    encontrados.

### - Valor de retorno

La función debe **retorna una promesa** (`Promise`) que **resuelve a un arreglo**
(`Array`) de objetos (`Object`), donde cada objeto representa un link y contiene
las siguientes propiedades

Con `validate:false` :

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.

Con `validate:true` :

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de respuesta HTTP.
* `ok`: Mensaje `fail` en caso de fallo u `ok` en caso de éxito.

#### Ejemplo (resultados como comentarios)
```js
const mdLinks = require("@kamojeda/md-links");

mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }, ...]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);
```

Otra flag que podemos utilizar es --stats ($ md-links ./carpeta/archivo.md --stats), este comando nos mostrará en consola el total de links que tenemos en el o los archivos que se le entregan mediante la ruta; esto se muestra con totalLinks:cantidad. Por último, podemos utilizar ambos comandos ($ md-links ./carpeta/archivo.md--validate  --stats) para poder ver el total de links, el total de links únicos, el total de links válidos y el de los inválidos; esto se muestra con totalLinks: cantidad, validLinks: cantidad, brokenLinks: cantidad. En el caso de que la ruta que se le entrega en la terminal sea inválida, se muestra el mensaje “INVALID PATH”.

## 4. Consideraciones generales

### 1) JavaScript API

El módulo debe poder **importarse** en otros scripts de Node.js y debe ofrecer la
siguiente interfaz:

#### `mdLinks(path, options)`

##### Argumentos

* `path`: Ruta **absoluta** o **relativa** al **archivo** o **directorio**.
Si la ruta pasada es relativa, debe resolverse como relativa al directorio
desde donde se invoca node - _current working directory_).
* `options`: Un objeto con **únicamente** la siguiente propiedad:
  - `validate`: Booleano que determina si se desea validar los links
    encontrados.

##### Valor de retorno

La función debe **retornar una promesa** (`Promise`) que **resuelva a un arreglo**
(`Array`) de objetos (`Object`), donde cada objeto representa un link y contiene
las siguientes propiedades

Con `validate:false` :

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.

Con `validate:true` :

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de respuesta HTTP.
* `ok`: Mensaje `fail` en caso de fallo u `ok` en caso de éxito.

### 2) CLI (Command Line Interface - Interfaz de Línea de Comando)

El ejecutable de nuestra aplicación debe poder ejecutarse de la siguiente
manera a través de la **terminal**:

`md-links <path-to-file> [options]`

Por ejemplo:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

El comportamiento por defecto no debe validar si las URLs responden ok o no,
solo debe identificar el archivo markdown (a partir de la ruta que recibe como
argumento), analizar el archivo Markdown e imprimir los links que vaya
encontrando, junto con la ruta del archivo donde aparece y el texto
que hay dentro del link (truncado a 50 caracteres).

#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo debe hacer una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.

Por ejemplo:

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

Vemos que el _output_ en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

##### `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```





