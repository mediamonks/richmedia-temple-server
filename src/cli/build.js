const findJSONConfigs = require('../util/findJSONConfigs');
const ConfigGeneratorByRichmediarcList = require('../webpack/config/ConfigGeneratorByRichmediarcList');

const build = require('../build');
const inquirer = require('inquirer');


module.exports = function(){

  const allConfigsSelector = './**/.richmediarc';

  findJSONConfigs(allConfigsSelector, ['settings.entry.js', 'settings.entry.html']).then(configs => {
    const questions = [];

    // if (program.target !== 'all' || !program.target) {
    questions.push({
      type: 'list',
      name: 'build',
      message: 'Please choose the current build to start.',
      choices: ['ALL', ...configs.map(({ location }) => location)],
    });

    inquirer.prompt(questions).then(answers => {


      let configsResult = null;

      if (answers.build === 'ALL') {
        configsResult = configs;
      } else {
        configsResult = configs.filter(({location}) => location === answers.build)
      }

      ConfigGeneratorByRichmediarcList(configsResult).then(result => {


        const list = result.map((webpack, index) => ({webpack, rc: configsResult[index]}));
        build(list);
      });

    });
    // } else {
    //   startExpress(allConfigsSelector, configs);
    // }
  });
};
