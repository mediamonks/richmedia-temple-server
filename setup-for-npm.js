const fs = require('fs-extra');
const json = require('./package.json');

fs.copy('./src/', './dist/', {}, err => {
  const distPackage = Object.assign({}, json);
  distPackage.scripts = {};
  distPackage.devDependencies = {};

  fs.writeFile('./dist/package.json', JSON.stringify(distPackage), { encoding: 'utf8' });
});
