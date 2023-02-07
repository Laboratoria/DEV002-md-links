const { mdLinks } = require('./index.js');

mdLinks('./Caperta')

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

