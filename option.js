const { mdLinks } = require('./promise.js');

const md_Links = (pathname, options) => {
    if ((options === null || options === undefined) || options === '{ validate: false }' || options.validate === false/*&& (secondOption === null || firstOption === undefined)*/) {
        // console.log(`You entered ${pathname} only without options`);
        mdLinks(pathname, '')
            .then(links => {
                console.log(links);
            })
    } else if (options === '{ validate: true }' || options.validate === true) {
        // console.log(`You entered ${pathname} and '{ validate: true }'`);
        mdLinks(pathname, ['--validate'])
            .then(outcome => {
                console.log(outcome);
            })
    }
}

// md_Links('./test/folder', '{ validate: true }');
