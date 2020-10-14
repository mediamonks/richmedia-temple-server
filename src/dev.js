
const createConfigByRichmediarcList = require('./webpack/config/createConfigByRichmediarcList');
const devServer = require('./webpack/devServer');
const expandWithSpreadsheetData = require('./util/expandWithSpreadsheetData');

const saveChoicesInPackageJson = require("./util/saveChoicesInPackageJson");
const findJSONConfigs = require('./util/findRichmediaRC');
const inquirer = require('inquirer');
const chalk = require('chalk');

module.exports = async function dev({ glob = './**/.richmediarc*', choices = null, stats = null }) {

  // start with showing search message
  console.log(`${chalk.blue('i')} Searching for configs`);

  let configs = await findJSONConfigs(glob, [
    'settings.entry.js',
    'settings.entry.html',
  ]);

  if (configs.length === 0) {
    throw new Error('could not find a compatible .richmediarc with entry points configured');
  }

  console.log(`${chalk.green('✔')} Found ${configs.length} config(s)`);
  console.log(`${chalk.green('✔')} Taking a look if it has Spreadsheets`);

  configs = await expandWithSpreadsheetData(configs);

  if(!choices) {
    let answers = {
      location: 'all',
    };

    if (configs.length === 1) {
      console.log(`  Choosing ${configs[0].location}`);
      answers.location = configs[0].location;
    } else {
      answers = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'location',
          message: 'Please select config(s) build:',
          choices: [
            {name: 'all', checked: false},
            ...configs.map(config => {

              let name = config.location;

              if (config.data.name) {
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
        {
          type: 'confirm',
          name: 'openLocation',
          message: 'Do you want a browser to open to your dev location?',
          default: true,
        }
      ]);
    }

    await saveChoicesInPackageJson('dev', {
      glob,
      choices: answers,
      stats,
    });

    choices = answers;
  }

  let configsResult = null;

  if (choices.location.indexOf('all') > -1) {
    configsResult = configs;
  } else {
    configsResult = configs.filter(({location}) => {
      return choices.location.indexOf(location) > -1;
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

  await devServer(list, choices.openLocation);
};
