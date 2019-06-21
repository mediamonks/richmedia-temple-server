const build = require('./src/build');
const program = require('commander');
const package = require('./package');

program
  .version(package.version)
  .option('-p, --package <type>', 'Globbing pattern like "-p ./src/**/.richmediarc"')
  .option('-s, --stats', 'Show stats when building')
  .parse(process.argv);

build({
  allConfigsSelector: program.package,
  stats: program.stats,
});
