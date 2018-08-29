const findJSONConfigs = require('./util/findRichmediaRC');
const configGeneratorByRichmediarcList = require('./webpack/config/createConfigByRichmediarcList');
const devServer = require('./dev-server');
const inquirer = require('inquirer');

module.exports = async function dev(allConfigsSelector = './**/.richmediarc') {
  const configs = await findJSONConfigs(allConfigsSelector, [
    'settings.entry.js',
    'settings.entry.html',
  ]);

  const questions = [];

  if (configs.length > 0) {
    questions.push({
      type: 'list',
      name: 'devLocation',
      message: 'Please choose the current build to start developing.',
      choices: ['ALL', ...configs.map(({ location }) => location)],
    });
  }

  const answers = await inquirer.prompt(questions);
  let configsResult = null;

  if (answers.devLocation === 'ALL') {
    configsResult = configs;
  } else {
    configsResult = configs.filter(({ location }) => location === answers.devLocation);
  }

  const result = await configGeneratorByRichmediarcList(configsResult, 'development');

  if (result.length === 0) {
    throw new Error('could not find a compatible .richmediarc with entry points configured');
  }

  const list = result.map((webpack, index) => ({ webpack, rc: configsResult[index] }));

  devServer(list);
};
