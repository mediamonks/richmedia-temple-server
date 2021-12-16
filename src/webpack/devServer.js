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

const isGoogleSpreadsheetUrl = require('../util/isGoogleSpreadsheetUrl');
const getGoogleSheetIdFromUrl = require('../util/getGoogleSheetIdFromUrl');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const extendObject = require('../util/extendObject');
const createObjectFromJSONPath = require('../util/createObjectFromJSONPath');
const getDataFromGoogleSpreadsheet = require('../util/getDataFromGoogleSpreadsheet');

const cacheSpreadSheets = {};
const cacheSheets = {};


const readFile = util.promisify(fs.readFile);
const getTemplate = require('../util/getDevTemplate');
const getNameFromLocation = require('../util/getNameFromLocation');

handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

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

  if (openLocation) {
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

    config.mode = 'development';
    // config.entry.main = [
    //   `webpack-hot-middleware/client?path=/${name}/${hmrPath}&reload=true`,
    //   ...config.entry.main,
    // ];

    config.output = {
      ...config.output,
      hotUpdateChunkFilename: '.hot/.hot-update.js',
      hotUpdateMainFilename: '.hot/.hot-update.json',
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
        path: `/${name}/${hmrPath}`,
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
        const isDevelopment = true;

        if (value.data.settings.expandable) {
          width = value.data.settings.expandable.width;
          height = value.data.settings.expandable.height;
          title += `_EXP_${width}x${height}`;
        }

        return {
          src: `./${name}/`,
          name,
          title,
          width,
          height,
          isDevelopment,
        };
      }),
      query: req.query,
      settings: {
        isGoogleSpreadsheetBanner: typeof configs[0].settings.data.settings.contentSource !== 'undefined'
      },
    };

    res.send(template(templateConfig));
  });

  app.get('/screenshot/:target', (req, res) => {
    const name = req.params.target;

    const folder = path.join(process.cwd(), 'tmpFolder');
    if (!fs.existsSync(folder)) {
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

  app.get("/reload_dynamic_data", async function (req, res) {
    const contentSource = configs[0].settings.data.settings.contentSource;
    const spreadsheetData = await getDataFromGoogleSpreadsheet(contentSource);

    configs.forEach(config => {
      let row = spreadsheetData.rows[config.settings.row.rowNumber-2]; //for example, row number 2 is array element 0

      const staticRow = spreadsheetData.headerValues.reduce((prev, name) => {
        prev[name] = row[name];
        return prev;
      }, {});

      let staticRowObject = {};
      for (const key in staticRow) {
        if (staticRow.hasOwnProperty(key)) {
          let obj = createObjectFromJSONPath(key, staticRow[key]);
          extendObject(staticRowObject, obj);
        }
      }

      // filter out everything that is not needed.
      if (config.settings.data.settings.contentSource.filter) {
        const filters = [];
        if (config.settings.data.settings.contentSource.filter instanceof Array) {
          filters.push(...config.settings.data.settings.contentSource.filter);
        } else {
          filters.push(config.settings.data.settings.contentSource.filter);
        }

        // for loop so i can break or return emmediatly
        for (let j = 0; j < filters.length; j++) {
          const filter = filters[j];
          for (const key in filter) {
            if (filter.hasOwnProperty(key) && staticRowObject[key] && staticRowObject[key] !== filter[key]) {
              return;
            }
          }
        }
      }

      // new content object with updated content from sheet
      let content = extendObject({}, (config.settings.data.content || {}), staticRowObject)

      // next 4 lines is reading existing richmediarc from the disk, updating the content object, and then writing the new file to disk again
      const configFile = fs.readFileSync(config.settings.location, {encoding:'utf8', flag:'r'})
      const configFileJson = JSON.parse(configFile);

      if (!util.isDeepStrictEqual(configFileJson.content, content)) { //compare 'new' content with old content. If anything has changed, write a new file
        configFileJson.content = content;
        fs.writeFileSync(config.settings.location, Buffer.from(JSON.stringify(configFileJson)));
      }
    })

    res.send('ok');
  });


  app.post('/api/upload', (req, res) => {});

  const server = app.listen(port, () => {});

  // eslint-disable-next-line
  process.stdin.resume();//so the program will not close instantly

  const doCleanup = () => {
    configs.forEach(config => {
      try {
        if (config.settings.willBeDeletedAfterServerCloses) {
          //console.log('checking ' + config.settings.location)
          const fileData = fs.readFileSync(config.settings.location, {encoding: 'utf8'});
          const fileDataJson = JSON.parse(fileData);

          if (config.settings.uniqueHash === fileDataJson.uniqueHash) {
            //console.log('valid. deleting ' + config.settings.location)
            fs.unlinkSync(config.settings.location);
          }
        }

      } catch (e) {
        console.log(e);
        console.log('Could not clean up file(s). Manual cleanup needed');
      }
    })
  }

  function exitHandler(options, exitCode) {
    if (options.cleanup) doCleanup();
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) process.exit();
  }

  //do something when app is closing
  process.on('exit', exitHandler.bind(null,{cleanup:true}));

  //catches ctrl+c event
  process.on('SIGINT', exitHandler.bind(null, {exit:true}));

  // catches "kill pid" (for example: nodemon restart)
  process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
  process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

  //catches uncaught exceptions
  process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

};
