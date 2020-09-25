#! /usr/bin/env node

const build = require('./src/build');
const program = require('commander');
const packageJson = require('./package');

program
  .version(packageJson.version)
  .option('-g, --glob <data>', 'Globbing pattern like "-p ./src/**/.richmediarc"')
  .option('-ss, --stats', 'Show stats when building')
  .option('-c, --choices <data>', 'predetermined settings')
  .parse(process.argv);

build({
  glob: program.glob,
  stats: program.stats,
  choices: program.choices ? JSON.parse(program.choices) : null,
}).then(r => console.log('done'));
