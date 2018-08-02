const getJSONConfig = require('./getJSONConfig');
const RCDto = require('../data/RCDto');
const glob = require('glob');

function doesNestedExist(obj, pattern) {
  for (let i = 0; i < pattern.length; i++) {
    if (!obj || !obj.hasOwnProperty(pattern[i])) {
      return false;
    }

    obj = obj[pattern[i]];
  }

  return true;
}

/**
 *
 * @param {string} globQuery
 * @param {Array<string>} patterns ['data.settings.entry.js', 'data.settings.entry.html']
 * @return {Promise<Array<RCDto>>}
 */
function findJSONConfigs(globQuery = '**/.richmediarc', patterns = []) {
  return new Promise(resolve => {
    const cache = {};
    glob(globQuery, {}, (er, files) => {
      Promise.all(
        files.map(location =>
          getJSONConfig(location, './', true, cache).then(json => new RCDto(location, json)),
        ),
      ).then(result => {
        const resolvedPatterns = patterns.map(pattern => pattern.split('.'));

        result = result.filter(({ data }) => {
          return resolvedPatterns.every(pattern => doesNestedExist(data, pattern));
        });
        resolve(result);
      });
    });
  });
}

module.exports = findJSONConfigs;
