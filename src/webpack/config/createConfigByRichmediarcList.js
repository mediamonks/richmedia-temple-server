const path = require('path');
const fs = require('fs-extra');
const Ajv = require('ajv');
const draft06 = require('ajv/lib/refs/json-schema-draft-06.json');

const formatErrorMessage = require('../../util/formatErrorMessage');
const createConfig = require('./createConfig');

const schema = require('../../schema/richmediarc.schema.json');

const ajv = new Ajv();
ajv.addMetaSchema(draft06);

const schemaValidate = ajv.compile(schema);

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

  const list = path.dirname(location).split(path.sep);
  const outputPath = path.resolve(path.join('./build/', list[list.length - 1]));

  const filepathHtml = path.resolve(
    path.join(path.dirname(location), richmediaRc.settings.entry.html),
  );

  const filepathJs = path.resolve(path.join(path.dirname(location), richmediaRc.settings.entry.js));

  const filepathRichmediaRC = path.resolve(location);

  return {
    filepathHtml,
    filepathJs,
    filepathRichmediaRC,
    outputPath,
  };
}

/**
 *
 * @param {Array<{RCDto}>} richmediarcList
 * @param {string} mode
 * @return {Promise<any[]>}
 */
function createConfigByRichmediarcList(richmediarcList, mode) {
  const promiseList = richmediarcList.map(
    ({ location, data }) =>
      validateSchemaAndCreatePaths(location, data)
        .then(({ filepathHtml, filepathJs, filepathRichmediaRC, outputPath }) =>
          createConfig({
            filepathHtml,
            filepathJs,
            filepathRichmediaRC,
            outputPath,
            mode,
          }),
        )
        .then(config => {
          const filepathPotentialWebpackConfig = `${path.dirname(location)}/webpack.config.js`;

          // check if webpackconfig exists
          return fs.pathExists(filepathPotentialWebpackConfig).then(exists => {
            if (exists) {
              // eslint-disable-next-line
              const webpack = require(filepathPotentialWebpackConfig);

              if (typeof webpack === 'function') {
                return webpack(config);
              }

              return webpack;
            }

            return config;
          });
        }),
    // projects can have there own webpack config. this will override the generated one.
  );

  return Promise.all(promiseList).then(webpackConfigs => webpackConfigs.filter(config => !!config));
}

module.exports = createConfigByRichmediarcList;
