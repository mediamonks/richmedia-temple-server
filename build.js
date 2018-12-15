const build = require('./src/build');
const program = require('commander');
const package = require('./package');

program
  .version(package.version)
  .option('-p, --package <items>', 'Use like "-p ./src/300x300/.richmediarc"', (val, list) => {
    list.push(val);
    return list;
  }, [])
  .option('-l, --location [value]', 'Specify build location')
  .parse(process.argv);

build(program.package, program.location);
