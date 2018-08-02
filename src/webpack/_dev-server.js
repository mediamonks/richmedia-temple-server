const findJSONConfigs = require('./util/findJSONConfigs');
const factoryWebpackConfigGenerator = require('./config/ConfigGeneratorByRichmediarcList');
const allConfigsSelector = '**/.richmediarc';

const templatePromise = Promise.resolve(true).then(() => {
  return new Promise((resolve, reject) => {
    fs.readFile('./library/node/template.hbs', { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
});


findJSONConfigs(allConfigsSelector, ['settings.entry.js', 'settings.entry.html']).then(configs => {
  const questions = [];

  if (program.target !== 'all' || !program.target) {
    questions.push({
      type: 'list',
      name: 'build',
      message: 'Please choose the current build to start.',
      choices: ['ALL', ...configs.map(({ url }) => url)],
    });

    inquirer.prompt(questions).then(answers => {
      let location = answers.build;

      if (location === 'ALL') {
        location = allConfigsSelector;
      }

      startExpress(location, configs);
    });
  } else {
    startExpress(allConfigsSelector, configs);
  }
});

module.exports = function(location, configs) {
  const app = express();

  templatePromise.then(value => Handlebars.compile(value)).then(template => {
    factoryWebpackConfigGenerator({ location, mode: 'development' }).then(webpackConfigs => {
      const compiler = webpack(webpackConfigs);

      app.use(webpackDevMiddleware(compiler));
      app.use(webpackHotMiddleware(compiler));

      app.get('/', function(req, res) {
        const templateConfig = {
          banner: configs.map(config => {
            const urls = path.dirname(config.url).split('/');
            const name = urls[urls.length - 1];

            return {
              src: `./${name}/`,
              name,
              width: config.data.settings.size.width,
              height: config.data.settings.size.height,
            };
          }),
        };

        res.send(template(templateConfig));
      });

      app.listen(3000, () => console.log('Example app listening on http://localhost:3000'));

      process.on('uncaughtException', () => app.close());
      process.on('SIGTERM', () => app.close());
    });
  });
};
