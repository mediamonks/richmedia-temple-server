const findJSONConfigs = require('./util/findRichmediaRC');
const createConfigByRichmediarcList = require('./webpack/config/createConfigByRichmediarcList');
const webpack = require('webpack');
const inquirer = require('inquirer');
const Spinner = require('cli-spinner').Spinner;

module.exports = async function build(configPackages = null, buildTarget = './build') {
  const spinner = new Spinner('processing.. %s');
  spinner.setSpinnerString('⠋⠙⠚⠒⠂⠂⠒⠲⠴⠦⠖⠒⠐⠐⠒⠓⠋');
  spinner.start();

  const allConfigsSelector = './**/.richmediarc';

  const configs = await findJSONConfigs(allConfigsSelector, [
    'settings.entry.js',
    'settings.entry.html',
  ]);

  let answers = {};

  spinner.stop(true);

  if (!configPackages || configPackages.length === 0) {
    const questions = [];

    questions.push(
      {
        type: 'checkbox',
        name: 'build',
        message: 'Please choose the current build to start.',
        choices: [
          { name: 'all' },
          ...configs.map(({ location }) => ({ name: location, checked: false })),
        ],
      },
      {
        type: 'input',
        name: 'buildTarget',
        message: 'Please choose build location',
        default: './build',
      },
    );

    answers = await inquirer.prompt(questions);
  }

  let configsResult = null;

  if (!answers.build) {
    answers.build = [...configPackages];
  }

  if (!answers.buildTarget) {
    answers.buildTarget = buildTarget;
  }

  if (answers.build.find(item => item === 'all')) {
    configsResult = configs;
  } else {
    configsResult = configs.filter(config => answers.build.indexOf(config.location) >= 0);
  }

  const result = await createConfigByRichmediarcList(configsResult, 'production');

  return new Promise((resolve, reject) => {
    webpack(result).run((err, stats) => {
      if (err){
        console.log(err);
        reject(err);
      } else {
        resolve();
      }
    });
  })
};
