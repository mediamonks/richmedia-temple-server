const json = require('./package.json');
const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');

// options is optional
glob("./src/**/*.*", {}, function (er, files) {
  Promise.all(files.map(function(file, index){

    const dest = file.replace('./src/', './dist/');

    return fs.copy(file, dest)
      .then(() => console.log('success!', dest))
      .catch(err => console.error(err))
    // // fs.createReadStream('test.log').pipe(fs.createWriteStream('newLog.log'));
  })).then(result => {

  })
});
