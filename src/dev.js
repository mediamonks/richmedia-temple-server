const createConfigByRichmediarcList = require('./webpack/config/createConfigByRichmediarcList');
const devServer = require('./webpack/devServer');

const findJSONConfigs = require('./util/findRichmediaRC');
const inquirer = require('inquirer');
const chalk = require('chalk');

module.exports = async function dev({ allConfigsSelector = './**/.richmediarc*' }) {
  // start with showing search message
  console.log(`${chalk.blue('i')} Searching for configs`);

  const configs = await findJSONConfigs(allConfigsSelector, [
    'settings.entry.js',
    'settings.entry.html',
  ]);


  if (configs.length === 0) {
    throw new Error('could not find a compatible .richmediarc with entry points configured');
  }

  console.log(`${chalk.green('✔')} Found ${configs.length} config(s)`);

  const question = {};
  let answers = {
    devLocation: 'all',
  };

  if (configs.length === 1) {
    console.log(`  Choosing ${configs[0].location}`);
    answers.devLocation = configs[0].location;
  } else {
    answers = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'devLocation',
        message: 'Please select config(s) build:',
        choices: [
          { name: 'all', checked: false },
          ...configs.map(config => {

            let name = config.location;

            if(config.data.name){
              // name += ` (${config.data.name})`
            }

            return {
              name,
              checked: false
            };
          }),
        ],
        validate(answer) {
          if (answer.length < 1) {
            return `${chalk.red('✖ You must choose at least one.')} `;
          }
          return true;
        },
      },
    ]);
  }

  let configsResult = null;

  if (answers.devLocation.indexOf('all') > -1) {
    configsResult = configs;
  } else {
    configsResult = configs.filter(({ location }) => {
      return answers.devLocation.indexOf(location) > -1;
    });
  }

  let list = await createConfigByRichmediarcList(configsResult, {
    mode: 'development',
    stats: false,
  });

  list = list.map((webpack, index) => {
    return {
      webpack,
      settings: configsResult[index]
    }
  });

  devServer(list);
};
