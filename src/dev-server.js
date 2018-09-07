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

function getNameFromSetting(setting) {
  const urls = path.dirname(setting.location).split('/');
  return urls[urls.length - 1];
}

/**
 *
 * @param {Array<{webpack: *, settings: {location, data}}>} configs
 */
module.exports = function devServer(configs) {
  const webpackConfigList = configs.map(({ webpack }) => webpack);
  const settingList = configs.map(({ settings }) => settings);

  // const compiler = webpack(webpackConfigList, (err, stats) => {
  //   if (err) {
  //     console.error(err.stack || err);
  //     if (err.details) {
  //       console.error(err.details);
  //     }
  //     return;
  //   }
  //
  //   const info = stats.toJson();
  //
  //   if (stats.hasErrors()) {
  //     console.error(info.errors);
  //   }
  //
  //   if (stats.hasWarnings()) {
  //     console.warn(info.warnings);
  //   }
  // });

  templatePromise.then(template => {
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

          console.log(value);

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

    portscanner.findAPortNotInUse(3000, 3010, '127.0.0.1', function(error, port) {
      app.listen(port, () => console.log(`Example app listening on http://localhost:${port}`));
    });

    // eslint-disable-next-line

    process.on('uncaughtException', e => {
      // eslint-disable-next-line
      console.log(e);
      // app.close();
    });
    process.on('SIGTERM', () => app.close());
  });
};
