const path = require('path');
const fs = require('fs-extra');
const Ajv = require('ajv');
const draft07 = require('ajv/lib/refs/json-schema-draft-07.json');

const createConfig = require('./createConfig');
const getPlatformByRichmediaRc = require('../../util/getPlatformByRichmediaRc');

const schema = require('../../schema/richmediarc.schema.json');

/**
 *
 * @param {string} richmediaConfigLocation
 * @param {any} richmediaConfig
 * @return {{filepathHtml: string, filepathJs: string, filepathRichmediaRC: string, outputPath: string}}
 */
function validateSchemaAndCreatePaths(richmediaConfigLocation, richmediaConfig) {
  const ajv = new Ajv({ allErrors: true });
  const validate = ajv.compile(schema);
  const valid = validate(richmediaConfig);

  if (!valid) {
    throw new Error('Invalid: ' + ajv.errorsText(validate.errors));
  }

  if (
    !richmediaConfig ||
    !richmediaConfig.settings ||
    !richmediaConfig.settings.entry ||
    !richmediaConfig.settings.entry.js ||
    !richmediaConfig.settings.entry.html
  ) {
    throw new Error(
      `missing js or/and html in settings.entry in file ${path.resolve(richmediaConfigLocation)}`,
    );
  }

  const list = path
    .dirname(richmediaConfigLocation)
    .split('/')
    .filter(val => val[0] !== '.');

  const outputPath = path.resolve(path.join('./build/', list.join('_')));

  const filepathHtml = path.resolve(
    path.join(path.dirname(richmediaConfigLocation), richmediaConfig.settings.entry.html),
  );

  const filepathJs = path.resolve(
    path.join(path.dirname(richmediaConfigLocation), richmediaConfig.settings.entry.js),
  );
  const filepathRichmediaRC = path.resolve(richmediaConfigLocation);
  const platform = getPlatformByRichmediaRc(richmediaConfig);

  return {
    filepathHtml,
    filepathJs,
    filepathRichmediaRC,
    outputPath,
    platform,
  };
}

/**
 *
 * @param {Array<{location, data}>} richmediarcList
 * @param {string} mode
 * @return {Promise<any[]>}
 */
function createConfigByRichmediarcList(richmediarcList, { mode, stats }) {
  const promiseList = richmediarcList.map(
    ({ location, data }) => {
      /**
       * const {
       *   filepathHtml,
       *   filepathJs,
       *   filepathRichmediaRC,
       *   outputPath,
       *   platform
       * } = validateSchemaAndCreatePaths(location, data);
       */
      const webpackConfig = createConfig({
        ...validateSchemaAndCreatePaths(location, data),
        richmediarc: data,
        options: {
          mode,
          stats,
        },
      });

      const webpackFilepath = path.resolve(`${path.dirname(location)}/webpack.config.js`);

      // check if webpackconfig exists
      return fs.pathExists(webpackFilepath).then(exists => {
        if (exists) {
          // eslint-disable-next-line
          const webpack = require(webpackFilepath);

          if (typeof webpack === 'function') {
            return webpack(webpackConfig);
          }

          return webpack;
        }

        return webpackConfig;
      });
    },
    // projects can have there own webpack config. this will override the generated one.
  );

  return Promise.all(promiseList).then(webpackConfigs => webpackConfigs.filter(config => !!config));
}

module.exports = createConfigByRichmediarcList;
