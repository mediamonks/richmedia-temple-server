const path = require('path');
const fs = require('fs-extra');
const Ajv = require('ajv');
const draft06 = require('ajv/lib/refs/json-schema-draft-06.json');

const formatErrorMessage = require('../../util/formatErrorMessage');
const createConfig = require('./createConfig');
const getPlatformByRichmediaRc = require('../../util/getPlatformByRichmediaRc');

const schema = require('../../schema/richmediarc.schema.json');

const ajv = new Ajv();
ajv.addMetaSchema(draft06);

const schemaValidate = ajv.compile(schema);

/**
 *
 * @param {string} location
 * @param {any} richmediaRc
 * @return {{filepathHtml: string, filepathJs: string, filepathRichmediaRC: string, outputPath: string}}
 */
function validateSchemaAndCreatePaths(location, richmediaRc) {
  // validate schema
  const valid = schemaValidate(richmediaRc);

  if (!valid) {
    schemaValidate.errors.forEach(error => {
      // eslint-disable-next-line
      console.error(JSON.stringify(error));
    });

    throw new Error(formatErrorMessage(schemaValidate.errors[0]));
  }

  if (
    !richmediaRc ||
    !richmediaRc.settings ||
    !richmediaRc.settings.entry ||
    !richmediaRc.settings.entry.js ||
    !richmediaRc.settings.entry.html
  ) {
    throw new Error(`missing js or/and html in settings.entry in file ${path.resolve(location)}`);
  }

  const list = path.dirname(location).split(path.sep).filter(val => val[0] !== '.' );
  const outputPath = path.resolve(path.join('./build/', list.join('_')));

  const filepathHtml = path.resolve(
    path.join(path.dirname(location), richmediaRc.settings.entry.html),
  );

  const filepathJs = path.resolve(path.join(path.dirname(location), richmediaRc.settings.entry.js));
  const filepathRichmediaRC = path.resolve(location);
  const platform = getPlatformByRichmediaRc(richmediaRc);

  return {
    filepathHtml,
    filepathJs,
    filepathRichmediaRC,
    outputPath,
    platform
  };
}

/**
 *
 * @param {Array<{location, data}>} richmediarcList
 * @param {string} mode
 * @return {Promise<any[]>}
 */
function createConfigByRichmediarcList(richmediarcList, mode) {
  const promiseList = richmediarcList.map(
    ({ location, data }) => {
      /**
       * const {
       *   filepathHtml,
       *   filepathJs,
       *   filepathRichmediaRC,
       *   outputPath,
       * } = validateSchemaAndCreatePaths(location, data);
       */
      const webpackConfig = createConfig({
        ...validateSchemaAndCreatePaths(location, data),
        mode,
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
