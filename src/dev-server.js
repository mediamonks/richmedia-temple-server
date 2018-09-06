
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const handlebars = require('handlebars');
const portscanner = require('portscanner');

const templatePromise = Promise.resolve(true).then(
  () =>
    new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, './data/template.hbs'),
        { encoding: 'utf-8' },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(handlebars.compile(data));
          }
        },
      );
    }),
);
/**
 *
 * @param {Array<{webpack: *, settings: {location, data}}>} configs
 */
module.exports = function devServer(configs) {


  const webpackConfigList = configs.map(({ webpack }) => webpack);
  const settingList = configs.map(({ settings }) => settings);

  console.log(webpackConfigList.length);
  const compiler = webpack(webpackConfigList);

  templatePromise.then(template => {
    const app = express();

    app.use(webpackDevMiddleware(compiler));
    app.use(webpackHotMiddleware(compiler));

    app.get('/', (req, res) => {
      const templateConfig = {
        banner: settingList.map(({ location, data }) => {
          const urls = path.dirname(location).split('/');
          const name = urls[urls.length - 1];

          return {
            src: `./${name}/`,
            name,
            width: data.settings.size.width,
            height: data.settings.size.height,
          };
        }),
      };

      res.send(template(templateConfig));
    });

    portscanner.findAPortNotInUse(3000, 3010, '127.0.0.1', function(error, port) {
      app.listen(port, () => console.log(`Example app listening on http://localhost:${port}`));
    })

    // eslint-disable-next-line

    process.on('uncaughtException', e => {
      // eslint-disable-next-line
      console.log(e);
      // app.close();
    });
    process.on('SIGTERM', () => app.close());
  });
};
