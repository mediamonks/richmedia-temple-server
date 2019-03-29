const preview = require('./src/preview');
const program = require('commander');
const package = require('./package');

program.version(package.version).parse(process.argv);

preview({});
