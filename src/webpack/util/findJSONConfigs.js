const getJSONConfig = require('./getJSONConfig');
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
 * @return {Promise<any>}
 */
function findJSONConfigs(globQuery = '**/.richmediarc', patterns = []) {
  return new Promise(resolve => {
    const cache = {};
    glob(globQuery, {}, (er, files) => {
      Promise.all(
        files.map(file =>
          getJSONConfig(file, './', true, cache).then(json => ({
            url: file,
            data: json,
          }))
        )
      ).then(result => {
        const resolvedPatterns = patterns.map(pattern => pattern.split('.'));

        result = result.filter(({ data }) => {
          return resolvedPatterns.every(pattern => doesNestedExist(data, pattern));
        });
        resolve(result);
        delete cache;
      });
    });
  });
}

module.exports = findJSONConfigs;
