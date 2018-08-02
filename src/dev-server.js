const program = require('commander');
const inquirer = require('inquirer');
const fs = require('fs-extra');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const Handlebars = require('handlebars');


/**
 *
 * @param {Array<{webpack: *, rc: RCDto}>} configs
 */
module.exports = function devServer(configs) {
  const webpackConfigs = configs.map(({webpack}) => webpack);
  const rcConfigs = configs.map(({rc}) => rc);
  const compiler = webpack(webpackConfigs);

  const app = express();

  app.use(webpackDevMiddleware(compiler));
  app.use(webpackHotMiddleware(compiler));

  app.get('/', function(req, res) {
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

  app.listen(3000, () => console.log('Example app listening on http://localhost:3000'));

  process.on('uncaughtException', () => app.close());
  process.on('SIGTERM', () => app.close());
};
