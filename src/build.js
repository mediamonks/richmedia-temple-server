const webpack = require('webpack');
const inquirer = require('inquirer');
const chalk = require('chalk');
const Spinner = require('cli-spinner').Spinner;
const fs = require('fs-extra');
const path = require('path');
const globPromise = require('glob-promise');

const findRichmediaRC = require('./util/findRichmediaRC');
const createConfigByRichmediarcList = require('./webpack/config/createConfigByRichmediarcList');
const getNameFromLocation = require('./util/getNameFromLocation');
const getTemplate = require('./util/getBuildTemplate');
const expandWithSpreadsheetData = require('./util/expandWithSpreadsheetData');
const saveChoicesInPackageJson = require('./util/saveChoicesInPackageJson');

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
                                        glob = './**/.richmediarc*',
                                        stats = false,
                                        choices = {},
                                      }) {
  const buildTarget = './build';

  const spinner = new Spinner('processing.. %s');
  spinner.setSpinnerString('/-\\|');
  spinner.start();

  let configs = await findRichmediaRC(glob, [
    'settings.entry.js',
    'settings.entry.html',
  ]);

  spinner.stop(true);

  if (configs.length === 0) {
    throw new Error('could not find a compatible .richmediarc with entry points configured');
  }

  configs = await expandWithSpreadsheetData(configs);

  const questions = [];

  const filesBuild = await globPromise(`${buildTarget}/**/*`);

  if(!choices){
    let options = {};
    if (filesBuild.length > 0) {
      if (typeof options.emptyBuildDir !== 'boolean') {
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
      if (!(options.build instanceof Array)) {
        questions.push({
          type: 'checkbox',
          name: 'build',
          message: 'Please choose the current build to start.',
          choices: [
            {name: 'all', checked: false},
            ...configs.map(({location}) => ({name: location, checked: false})),
          ],
          validate: function (answer) {
            if (answer.length < 1) {
              return 'You must choose at least one.';
            }
            return true;
          },
        });
      }
    } else {
      console.log(`${chalk.green('✔')} One config found ${configs[0].location}`);
      options.build = [configs[0].location];
    }

    options = {
      ...options,
      ...(await inquirer.prompt(questions)),
    };

    choices = options;

    await saveChoicesInPackageJson('build', {
      glob,
      choices,
      stats,
    });

  }

  if (choices.emptyBuildDir) {
    await fs.emptyDir(buildTarget);
  }

  let configsResult = null;

  if (choices.build.find(item => item === 'all')) {
    configsResult = configs;
  } else {
    configsResult = configs.filter(config => choices.build.indexOf(config.location) >= 0);
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
				const name = getNameFromLocation(item.location);
				let width = item.data.settings.size.width;
				let height = item.data.settings.size.height;
				let title = name;

				// if (item.data.settings.expandable) {
				//   width = item.data.settings.expandable.width;
				//   height = item.data.settings.expandable.height;
				//   title += "_EXP_" + width + "x" + height;
				// }

				return {
					src: `./${name}/`,
					name,
					title,
					width,
					height,
				};
			}),
		};

		return fs.outputFile('./build/index.html', template(templateConfig));
	})
	.then(() => {
		return globPromise(`${buildTarget}/**/*`);
	});
};
