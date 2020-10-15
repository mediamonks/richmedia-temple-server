#! /usr/bin/env node

const build = require('./src/build');
const jsonParseDeep = require('./src/util/jsonParseDeep');
const program = require('commander');
const packageJson = require('./package');
const chalk = require('chalk');
const base64 = require("./src/util/base64");

program
  .version(packageJson.version)
  .option('-g, --glob <data>', 'Globbing pattern like "-p ./src/**/.richmediarc"')
  .option('-ss, --stats', 'Show stats when building')
  .option('-c, --choices <data>', 'predetermined settings')
  .parse(process.argv);



build({
  glob: program.glob,
  stats: program.stats,
  choices: program.choices ? JSON.parse(base64.decode(program.choices)) : null,
}).then(r => console.log('done'));
