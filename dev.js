const dev = require('./src/dev');
const program = require('commander');
const package = require('./package');

program
  .version(package.version)
  .option('-p, --package', 'Globbing pattern like "-p ./src/**/.richmediarc"')
  .option('-s, --stats', 'Show stats when building')
  .parse(process.argv);

dev({
  allConfigsSelector: program.package,
  stats: program.stats,
});
