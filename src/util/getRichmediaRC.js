/* eslint no-param-reassign: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-loop-func: 0 */
/* eslint no-shadow: 0 */

const fs = require('fs-extra');
const path = require('path');
const isExternalURL = require('../util/isExternalURL');
const deepmerge = require('deepmerge');

function readJson(filepath, cacheObject) {
  let promiseJson;
  if (cacheObject && cacheObject[filepath]) {
    promiseJson = Promise.resolve(cacheObject[filepath]);
  } else {
    promiseJson = fs.pathExists(filepath).then(val => {
      if (val) {
        return fs.readJson(filepath).then(json => {
          if (cacheObject && !cacheObject[filepath]) {
            cacheObject[filepath] = json;
          }

          return json;
        });
      }

      return false;
    });
  }

  return promiseJson;
}

/**
 * getJSONConfig retrieves a jsonConfig config file and will
 * also inherit configs from parent jsonConfig files
 *
 * @param {string} filepathRichmediarc
 * @param {string} rootPath
 * @param {boolean} inheritParentConfig
 * @param {any} cacheObject
 * @return {Promise<void | never>}
 */
module.exports = async function getRichmediaRC(
  filepathRichmediarc,
  rootPath = './',
  inheritParentConfig = true,
  cacheObject = null,
) {
  let result = {};

  let filepath = path.resolve(filepathRichmediarc);
  const baseFilepath = filepath;
  const data = path.parse(baseFilepath);

  rootPath = path.resolve(rootPath);

  let resolve = path.resolve(baseFilepath) !== rootPath;

  while (resolve) {
    filepath = path.join(filepath, '..');
    resolve = path.resolve(filepath) !== rootPath;

    const json = await readJson(`${filepath}/${data.name}${data.ext}`, cacheObject);
    if (json && json.content) {
      Object.keys(json.content).forEach(key => {
        const item = json.content[key];
        if (
          (item.type === 'image' || item.type === 'video') &&
          item.url &&
          !isExternalURL(item.url)
        ) {
          json.content[key].url = path.relative(
            path.dirname(baseFilepath),
            path.resolve(path.join(filepath, item.url)),
          );
        }
      });
    }

    if (json) {
      result = deepmerge(json, result);
    }
  }

  return result;
};
