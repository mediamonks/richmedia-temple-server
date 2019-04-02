const henk = require('@mediamonks/henk');
const build = require('./build');

module.exports = async function preview() {
  await build({
    answers: {
      emptyBuildDir: true,
    },
  });

  await henk({
    inputDir: './build',
    type: 'mm-preview',
  });
};
