const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const handlebars = require('handlebars');
const portfinder = require('portfinder');
const screenshot = require('@mediamonks/richmedia-temple-screenshot');
const util = require('util');
const readFile = util.promisify(fs.readFile);

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

function getNameFromSetting(setting) {
  const urls = path.dirname(setting.location).split('/');
  return urls[urls.length - 1];
}

/**
 *
 * @param {Array<{webpack: *, settings: {location, data}}>} configs
 */
module.exports = async function devServer(configs) {
  const webpackConfigList = configs.map(({ webpack }) => webpack);
  const settingList = configs.map(({ settings }) => settings);
  const port = await portfinder.getPortPromise();
  const template = await templatePromise;

  const app = express();

  webpackConfigList.forEach((config, index) => {
    const compiler = webpack(config);

    app.use(
      webpackDevMiddleware(compiler, {
        publicPath: `/${getNameFromSetting(settingList[index])}/`,
      }),
    );
    app.use(webpackHotMiddleware(compiler));
  });

  app.get('/', (req, res) => {
    const templateConfig = {
      banner: settingList.map(value => {
        const name = getNameFromSetting(value);

        return {
          src: `./${name}/`,
          name,
          width: value.data.settings.size.width,
          height: value.data.settings.size.height,
        };
      }),
    };

    res.send(template(templateConfig));
  });

  app.get('/screenshot/:target', (req, res) => {
    const location = path.join(__dirname, '../tempfolder', 'screenshot.png');

    screenshot
      .fromUrl({
        config: {},
        url: `http://localhost:${port}/${req.params.target}/`,
        location,
      })
      .then(() => readFile(location))
      .then(img => {
        res.contentType('image/png');
        res.end(img, 'binary');
      });
  });

  app.listen(port, () => console.log(`Example app listening on http://localhost:${port}`));

  // eslint-disable-next-line

  process.on('uncaughtException', e => {
    // eslint-disable-next-line
    console.log(e);
    // app.close();
  });
  process.on('SIGTERM', () => app.close());
};
