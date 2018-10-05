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

function getNameFromSettings(settings) {
  const urls = path.dirname(settings.location).split('/');
  return urls[urls.length - 1];
}

function getSettingsFromSettingsListByName(name, settingsList) {
  const result = settingsList.find(settings => getNameFromSettings(settings) === name);
}

/**
 *
 * @param {Array<{webpack: *, settings: {location, data}}>} configs
 */
module.exports = async function devServer(configs) {
  const webpackConfigList = configs.map(({ webpack }) => webpack);
  const settingsList = configs.map(({ settings }) => settings);
  const port = await portfinder.getPortPromise();
  const template = await templatePromise;

  console.log(settingsList);

  const app = express();

  webpackConfigList.forEach((config, index) => {
    const compiler = webpack(config);

    app.use(
      webpackDevMiddleware(compiler, {
        publicPath: `/${getNameFromSettings(settingsList[index])}/`,
      }),
    );
    app.use(webpackHotMiddleware(compiler));
  });

  app.get('/', (req, res) => {
    const templateConfig = {
      banner: settingsList.map(value => {
        const name = getNameFromSettings(value);

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
    const name = req.params.target;
    const location = path.join(__dirname, '../tempfolder', 'screenshot.png');
    const result = settingsList.find(val => getNameFromSettings(val) === name);

    const data = {
      config: {},
      url: `http://localhost:${port}/${name}/`,
      location,
    };

    if (
      result &&
      result.data &&
      result.data.settings &&
      result.data.settings.size &&
      result.data.settings.size.width &&
      result.data.settings.size.height
    ) {
      data.clip = {
        x: 0,
        y: 0,
        width: result.data.settings.size.width,
        height: result.data.settings.size.height,
      };
    }

    screenshot
      .fromUrl(data)
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
