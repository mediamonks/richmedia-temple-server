const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const express = require('express');
const handlebars = require('handlebars');
const portfinder = require('portfinder');
const screenshot = require('@mediamonks/richmedia-temple-screenshot');
const util = require('util');
const chalk = require('chalk');
const opener = require('opener');

const readFile = util.promisify(fs.readFile);
const getTemplate = require('../util/getDevTemplate');
const getNameFromLocation = require('../util/getNameFromLocation');

/**
 *
 * @param {Array<{webpack: *, settings: {location, data}}>} configs
 * @param {boolean} openLocation
 */
module.exports = async function devServer(configs, openLocation = true) {
  const webpackConfigList = configs.map(({ webpack }) => webpack);
  const settingsList = configs.map(({ settings }) => settings);
  const port = await portfinder.getPortPromise();
  const template = await getTemplate();

  const httpLocation = `http://localhost:${port}`;

  if(openLocation){
    // opener
    opener(httpLocation);
  }

  console.log(`${chalk.blue('i')} Server running. Please go to ${httpLocation}
${chalk.grey.bold('-------------------------------------------------------')}
`);

  const app = express();

  webpackConfigList.forEach((config, index) => {
    const hmrPath = '__webpack_hmr';
    const name = getNameFromLocation(settingsList[index].location);

    config.mode =  'development';
    // config.entry.main = [
    //   `webpack-hot-middleware/client?path=/${name}/${hmrPath}&reload=true`,
    //   ...config.entry.main,
    // ];


    config.output = {
      ...config.output,
      "hotUpdateChunkFilename": ".hot/.hot-update.js",
      "hotUpdateMainFilename": ".hot/.hot-update.json"
    };



    const compiler = webpack(config);

    app.use(
      webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: `/${name}/`,
        // publicPath: config.output.publicPath,
        // publicPath: config.output.path,
      }),
    );

    app.use(
      webpackHotMiddleware(compiler, {
        path: `/${name}/${hmrPath}`
      }),
    );
    //
    // app.use(webpackHotMiddleware(compiler, {
    //   path: `/${getNameFromSettings(settingsList[index])}/__webpack_hmr`
    // }));
  });

  app.get('/', (req, res) => {
    const templateConfig = {
      banner: settingsList.map(value => {
        const name = getNameFromLocation(value.location);
        let width = value.data.settings.size.width;
        let height = value.data.settings.size.height;
				let title = name;

        if(value.data.settings.expandable){
          width = value.data.settings.expandable.width;
          height = value.data.settings.expandable.height;
          title += "_EXP_" + width + "x" + height;
				}

        return {
          src: `./${name}/`,
          name,
          title,
          width,
					height,
        };
      }),
    };

    res.send(template(templateConfig));
  });

  app.get('/screenshot/:target', (req, res) => {
    const name = req.params.target;

    const folder = path.join(process.cwd(), 'tmpFolder');
    if (!fs.existsSync(folder)){
      fs.mkdirSync(folder);
    }

    const location = path.join(folder, 'screenshot.png');
    const result = settingsList.find(val => getNameFromLocation(val.location) === name);

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

  app.post('/api/upload', (req, res) => {});

  app.listen(port, () => {});

  // eslint-disable-next-line

  process.on('uncaughtException', e => {
    // eslint-disable-next-line
    console.log(e);
    // app.close();
  });
  process.on('SIGTERM', () => app.close());
};
