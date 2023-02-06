const { mdLinks } = require('./index.js');

mdLinks('./node_modules')

.then(() => {
 mdLinks => console.log(mdLinks)
})
.catch((error) => {
    console.log(error)
})

/*absoOurRelative('./README.md')
.then(() =>  {
    absoOurRelative  => console.log(absoOurRelative)

})
.catch((error) => {
    error => console.error(error)
})*/

