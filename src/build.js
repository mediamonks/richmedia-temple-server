const findJSONConfigs = require('./util/findRichmediaRC');
const createConfigByRichmediarcList = require('./webpack/config/createConfigByRichmediarcList');
const webpack = require('webpack');
const inquirer = require('inquirer');

module.exports = async function build() {
  const allConfigsSelector = './**/.richmediarc';

  const configs = await findJSONConfigs(allConfigsSelector, [
    'settings.entry.js',
    'settings.entry.html',
  ]);
  const questions = [];

  questions.push(
    {
      type: 'list',
      name: 'build',
      message: 'Please choose the current build to start.',
      choices: ['ALL', ...configs.map(({ location }) => location)],
    },
    {
      type: 'list',
      name: 'buildTarget',
      message: 'Please choose build location',
      choices: ['./build', 'other location'],
    },
  );

  let answers = await inquirer.prompt(questions);

  if (answers.buildTarget === 'other location') {
    answers = {
      ...answers,
      ...(await inquirer.prompt([
        {
          type: 'input',
          name: 'buildTarget',
          message: 'Please type in build location',
          default: './build',
        },
      ])),
    };
  }

  let configsResult = null;

  if (answers.build === 'ALL') {
    configsResult = configs;
  } else {
    configsResult = configs.filter(({ location }) => location === answers.build);
  }

  const result = await createConfigByRichmediarcList(configsResult);

  const compiler = webpack(result).run((err, stats) => {
    console.log(err);
  })
};
