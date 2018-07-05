const formatErrorMessage = require('../util/formatErrorMessage');

const glob = require('glob');
const path = require('path');
const fs = require('fs-extra');
const getJSONConfig = require('../util/getJSONConfig');
const factoryWebpackConfig = require('./factoryWebpackConfig');
const Ajv = require('ajv');
const draft06 = require('ajv/lib/refs/json-schema-draft-06.json');
const schema = require('../../../schema/richmediarc.schema');

const ajv = new Ajv();
ajv.addMetaSchema(draft06);

const schemaValidate = ajv.compile(schema);

/**
 *
 * @param mode
 * @param location
 * @return {Promise<any>}
 */
function factoryWebpackConfigGenerator({ mode = 'production', location = '**/.richmediarc' }) {
  return new Promise(resolve => {
    glob(location, {}, (err, files) => {
      const promiseList = files.map(file => {
        const potentialWebpackConfigPath = `${path.dirname(file)}/webpack.config.js`;

        return fs.readJson(file).then(json => {
          return fs.pathExists(potentialWebpackConfigPath).then(exists => {
            if (exists) {
              return require(potentialWebpackConfigPath);
            } else {
              // validate schema
              const valid = schemaValidate(json);

              if (!valid) {
                schemaValidate.errors.forEach(error => {
                  console.error(JSON.stringify(error));
                });

                throw new Error(formatErrorMessage(schemaValidate.errors[0]));
              }

              if (json && json.settings && json.settings.entry) {
                if (!json.settings.entry.js || !json.settings.entry.html) {
                  throw new Error(`missing js or/and html in settings.entry in file ${path.resolve(file)}`);
                }

                // get .richmediarc
                return getJSONConfig(file, './').then(json => {
                  const list = path.dirname(file).split(path.sep);
                  let outputPath = path.resolve(path.join('./build/', list[list.length - 1]));

                  let mainHTMLFilepath = path.resolve(path.join(path.dirname(file), json.settings.entry.html));
                  let mainJSFilepath = path.resolve(path.join(path.dirname(file), json.settings.entry.js));
                  let richmediarcFilepath = path.resolve(file);

                  return factoryWebpackConfig({
                    mainHTMLFilepath,
                    mainJSFilepath,
                    richmediarcFilepath,
                    outputPath,
                    mode,
                  });
                });
              }
            }
          });
        });
      });

      Promise.all(promiseList).then(webpackConfigs => {
        webpackConfigs = webpackConfigs.filter(config => !!config);
        if (webpackConfigs.length === 1) {
          resolve(webpackConfigs[0]);
        } else {
          resolve(webpackConfigs);
        }
      });
    });
  });
}

module.exports = factoryWebpackConfigGenerator;
