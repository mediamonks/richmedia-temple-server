const fs = require('fs-extra');
const path = require('path');
const isExternalURL = require('../util/isExternalURL');

/**
 * getJSONConfig retrieves a jsonConfig config file and will
 * also inherit configs from parent jsonConfig files
 *
 * @param {string} jsonConfigGlobbingPath glob like ** / .richmediarc
 * @param {string} rootPath
 * @return {Promise<void>}
 */
function getJSONConfig(jsonConfigGlobbingPath, rootPath = './', inheritParentConfig = true, cacheObject = null) {
  let result = {};
  let filepath = path.resolve(jsonConfigGlobbingPath);
  const baseFilepath = filepath;
  let data = path.parse(filepath);

  rootPath = path.resolve(rootPath);

  let prom = Promise.resolve();
  let resolve = path.resolve(filepath) !== rootPath;

  while (resolve) {
    filepath = path.join(filepath, '..');
    resolve = path.resolve(filepath) !== rootPath;

    prom = prom.then(
      function(filepath) {
        const storedFilepath = `${filepath}/${data.name}${data.ext}`;

        let promiseJson;
        if (cacheObject && cacheObject[storedFilepath]) {
          promiseJson = Promise.resolve(cacheObject[storedFilepath]);
        } else {
          promiseJson = fs.pathExists(storedFilepath).then(val => {
            if (val) {
              return fs.readJson(storedFilepath).then(json => {
                if (cacheObject && !cacheObject[storedFilepath]) {
                  cacheObject[storedFilepath] = json;
                }

                return json;
              });
            }

            return false;
          });
        }

        return promiseJson.then(json => {
          if (json && json.content) {
            Object.keys(json.content).forEach(key => {
              const item = json.content[key];
              if ((item.type === 'image' || item.type === 'video') && item.url && !isExternalURL(item.url)) {
                json.content[key].url = path.relative(
                  path.dirname(baseFilepath),
                  path.resolve(path.join(filepath, item.url))
                );
              }
            });
          }

          if(json){
            result = {
              ...json,
              ...result,
            };
          }
        });
      }.bind(this, filepath)
    );
  }

  return prom.then(() => result);
}

module.exports = getJSONConfig;
