const webpack = require('webpack');
const inquirer = require('inquirer');
const chalk = require('chalk');
const Spinner = require('cli-spinner').Spinner;
const fs = require('fs-extra');
const path = require('path');
const glob = require('glob-promise');

const findJSONConfigs = require('./util/findRichmediaRC');
const createConfigByRichmediarcList = require('./webpack/config/createConfigByRichmediarcList');
const getNameFromSettings = require('./util/getNameFromSettings');
const getTemplate = require('./util/getBuildTemplate');

/**
 *
 * @param {object} options
 * @param {string} options.allConfigsSelector
 * @param {boolean} options.stats
 * @param {object} options.answers
 * @param {boolean} options.answers.emptyBuildDir
 * @param {Array<string>} options.answers.build
 * @return {Promise<any | never>}
 */
module.exports = async function build({
  allConfigsSelector = './**/.richmediarc',
  stats = false,
  answers = {},
}) {
  const buildTarget = './build';

  const spinner = new Spinner('processing.. %s');
  spinner.setSpinnerString('/-\\|');
  spinner.start();

  const configs = await findJSONConfigs(allConfigsSelector, [
    'settings.entry.js',
    'settings.entry.html',
  ]);

  spinner.stop(true);

  if (configs.length === 0) {
    throw new Error('could not find a compatible .richmediarc with entry points configured');
  }

  const questions = [];

  const filesBuild = await glob(`${buildTarget}/**/*`);

  if (filesBuild.length > 0) {
    if (typeof answers.emptyBuildDir !== 'boolean') {
      questions.push({
        type: 'confirm',
        name: 'emptyBuildDir',
        message: `Empty build dir? ${chalk.red(
          `( ${filesBuild.length} files in ${path.resolve(buildTarget)})`,
        )}`,
      });
    }
  }

  if (configs.length > 1) {
    if (answers.build instanceof Array) {
      questions.push({
        type: 'checkbox',
        name: 'build',
        message: 'Please choose the current build to start.',
        choices: [
          { name: 'all', checked: false },
          ...configs.map(({ location }) => ({ name: location, checked: false })),
        ],
        validate: function(answer) {
          if (answer.length < 1) {
            return 'You must choose at least one.';
          }
          return true;
        },
      });
    }
  } else {
    console.log(`${chalk.green('✔')} One config found ${configs[0].location}`);
    answers.build = [configs[0].location];
  }

  answers = {
    ...answers,
    ...(await inquirer.prompt(questions)),
  };

  if (answers.emptyBuildDir) {
    await fs.emptyDir(buildTarget);
  }

  let configsResult = null;

  if (answers.build.find(item => item === 'all')) {
    configsResult = configs;
  } else {
    configsResult = configs.filter(config => answers.build.indexOf(config.location) >= 0);
  }

  const result = await createConfigByRichmediarcList(configsResult, {
    mode: 'production',
    stats: stats,
  });

  return new Promise((resolve, reject) => {
    webpack(result).run((err, stats) => {
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          err.details.forEach((item, index) => {
            console.error(index, item);
          });
        }
        return;
      }

      const info = stats.toJson();

      if (stats.hasErrors()) {
        info.errors.forEach((item, index) => {
          console.log(chalk.red(item));
        });
      }

      if (stats.hasWarnings()) {
        info.warnings.forEach(item => {
          console.log(chalk.green(item));
        });
      }

      resolve();
    });
  })
    .then(async () => {
      const template = await getTemplate();

      const templateConfig = {
        banner: configsResult.map(item => {
          const name = getNameFromSettings(item);

          return {
            src: `./${name}/`,
            name,
            width: item.data.settings.size.width,
            height: item.data.settings.size.height,
          };
        }),
      };

      return fs.outputFile('./build/index.html', template(templateConfig));
    })
    .then(() => {
      return glob(`${buildTarget}/**/*`);
    });
};
