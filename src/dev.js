const createConfigByRichmediarcList = require('./webpack/config/createConfigByRichmediarcList');
const devServer = require('./webpack/devServer');
const expandWithSpreadsheetData = require('./util/expandWithSpreadsheetData');

const saveChoicesInPackageJson = require('./util/saveChoicesInPackageJson');
const findJSONConfigs = require('./util/findRichmediaRC');
const parsePlaceholdersInObject = require('./util/parsePlaceholdersInObject');
const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');

module.exports = async function dev({glob = './**/.richmediarc*', choices = null, stats = null}) {

  // start with showing search message
  console.log(`${chalk.blue('i')} Searching for configs`);
  const mode = 'development';

  let configs = await findJSONConfigs(glob, ['settings.entry.js', 'settings.entry.html']);

  if (configs.length === 0) {
    throw new Error('could not find a compatible .richmediarc with entry points configured');
  }

  console.log(`${chalk.green('✔')} Found ${configs.length} config(s)`);
  console.log(`${chalk.green('✔')} Taking a look if it has Spreadsheets`);

  // parse placeholders in content source so it works with spreadsheets
  configs.forEach(config => {
    if (config.data.settings.contentSource) {
      config.data.settings.contentSource = parsePlaceholdersInObject(
        config.data.settings.contentSource,
        config.data,
      );
    }
  });

  configs = await expandWithSpreadsheetData(configs, mode);

  // parse placeholders for everything
  configs.forEach(config => {
    if (config.data) {
      config.data = parsePlaceholdersInObject(config.data, config.data);
    }
  });

  if (!choices) {
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

              return {
                name,
                checked: false,
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
        },
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

  //if the richmediarc location doesn't actually exist, assume its a config derived from google spreadsheets, so we write one to disk
  configsResult.forEach(config => {
    if (!fs.existsSync(config.location)) {
      const data = Buffer.from(JSON.stringify(config.data));
      fs.writeFileSync(config.location, data);
    }
  })

  let list = await createConfigByRichmediarcList(configsResult, {
    mode,
    stats: false,
  });

  list = list.map((webpack, index) => {
    return {
      webpack,
      settings: configsResult[index],
    };
  });

  await devServer(list, choices.openLocation);
};
