const json = require('./package.json');
const fs = require('fs');

const distPackage = Object.assign({}, json);
distPackage.scripts = {};
distPackage.devDependencies = {};

fs.writeFile('./dist/package.json', JSON.stringify(distPackage), { encoding: 'utf8' });
