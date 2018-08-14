const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const handlebars = require('handlebars');

const templatePromise = Promise.resolve(true).then(
  () =>
    new Promise((resolve, reject) => {
      fs.readFile('./data/template.hbs', { encoding: 'utf-8' }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(handlebars.compile(data));
        }
      });
    }),
);
/**
 *
 * @param {Array<{webpack: *, rc: RCDto}>} configs
 */
module.exports = function devServer(configs) {
  const webpackConfigs = configs.map(({ webpack: webpackConfig }) => webpackConfig);
  const rcConfigs = configs.map(({ rc }) => rc);
  const compiler = webpack(webpackConfigs);

  templatePromise.then(template => {
    const app = express();

    app.use(webpackDevMiddleware(compiler));
    app.use(webpackHotMiddleware(compiler));

    app.get('/', (req, res) => {
      const templateConfig = {
        banner: rcConfigs.map(config => {
          const urls = path.dirname(config.location).split('/');
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

    // eslint-disable-next-line
    app.listen(3000, () => console.log('Example app listening on http://localhost:3000'));

    process.on('uncaughtException', () => app.close());
    process.on('SIGTERM', () => app.close());
  });
};
