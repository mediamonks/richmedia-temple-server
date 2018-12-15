const dev = require('./src/dev');
const program = require('commander');
const package = require('./package');

program
  .version(package.version)
  .option('-p, --package <items>', 'Use like "-p ./src/300x300/.richmediarc"', (val, list) => {
    list.push(val);
    return list;
  }, [])
  .parse(process.argv);

dev(program.package);
