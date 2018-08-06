const glob = require('glob');
const path = require('path');
const fs = require('fs-extra');
const Ajv = require('ajv');
const draft06 = require('ajv/lib/refs/json-schema-draft-06.json');

const formatErrorMessage = require('../../util/formatErrorMessage');
const webpackConfigGenerator = require('./ConfigGenerator');

const schema = require('../../schema/richmediarc.schema.json');

const ajv = new Ajv();
ajv.addMetaSchema(draft06);

const schemaValidate = ajv.compile(schema);

/**
 *
 * @param {Array<{RCDto}>} richmediarcList
 * @return {Promise<any>}
 */
function ConfigGeneratorByRichmediarcList(richmediarcList, mode) {
  return new Promise(resolve => {
    const promiseList = richmediarcList.map(({ location, data }) => {
      console.log(location, data);
      const potentialWebpackConfigPath = `${path.dirname(location)}/webpack.config.js`;

      return fs.pathExists(potentialWebpackConfigPath).then(exists => {
        if (exists) {
          return require(potentialWebpackConfigPath);
        } else {
          // validate schema
          const valid = schemaValidate(data);

          if (!valid) {
            schemaValidate.errors.forEach(error => {
              console.error(JSON.stringify(error));
            });

            throw new Error(formatErrorMessage(schemaValidate.errors[0]));
          }

          if (data && data.settings && data.settings.entry) {
            if (!data.settings.entry.js || !data.settings.entry.html) {
              throw new Error(
                `missing js or/and html in settings.entry in file ${path.resolve(file)}`,
              );
            }

            // get .richmediarc
            const list = path.dirname(location).split(path.sep);
            let outputPath = path.resolve(path.join('./build/', list[list.length - 1]));

            let mainHTMLFilepath = path.resolve(
              path.join(path.dirname(location), data.settings.entry.html),
            );

            let mainJSFilepath = path.resolve(
              path.join(path.dirname(location), data.settings.entry.js),
            );

            let richmediarcFilepath = path.resolve(location);

            return webpackConfigGenerator({
              mainHTMLFilepath,
              mainJSFilepath,
              richmediarcFilepath,
              outputPath,
              mode,
            });
          }
        }
      });
    });

    Promise.all(promiseList).then(webpackConfigs => {
      webpackConfigs = webpackConfigs.filter(config => !!config);
      resolve(webpackConfigs);
    });
  });
}

module.exports = ConfigGeneratorByRichmediarcList;
