const dev = require('./src/dev');

program
  .version(package.version)
  .option('-p, --package <items>', 'Use like "-p ./src/300x300/.richmediarc"', (val, list) => {
    list.push(val);
    return list;
  }, [])
  .parse(process.argv);

dev(program.package);
