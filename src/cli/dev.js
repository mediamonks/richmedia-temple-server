const findJSONConfigs = require('../util/findRichmediaRC');
const configGeneratorByRichmediarcList = require('../webpack/config/createConfigByRichmediarcList');
const devServer = require('../dev-server');
const inquirer = require('inquirer');

module.exports = function dev(allConfigsSelector = './**/.richmediarc') {
  findJSONConfigs(allConfigsSelector, ['settings.entry.js', 'settings.entry.html']).then(
    configs => {
      const questions = [];

      // if (program.target !== 'all' || !program.target) {
      questions.push({
        type: 'list',
        name: 'dev',
        message: 'Please choose the current build to start developing.',
        choices: ['ALL', ...configs.map(({ location }) => location)],
      });

      inquirer.prompt(questions).then(answers => {
        let configsResult = null;

        if (answers.build === 'ALL') {
          configsResult = configs;
        } else {
          configsResult = configs.filter(({ location }) => location === answers.build);
        }

        configGeneratorByRichmediarcList(configsResult, 'development').then(result => {
          const list = result.map((webpack, index) => ({ webpack, rc: configsResult[index] }));
          devServer(list);
        });
      });
      // } else {
      //   startExpress(allConfigsSelector, configs);
      // }
    },
  );
};
