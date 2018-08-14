const getJSONConfig = require('./getRichmediaRC');
const RCDto = require('../data/RCDto');
const glob = require('glob');
const doesNestedExist = require('./doesNestedExists');

/**
 *
 * @param {string} globQuery
 * @param {Array<string>} patterns ['data.settings.entry.js', 'data.settings.entry.html']
 * @return {Promise<Array<RCDto>>}
 */
function findRichmediaRC(globQuery = '**/.richmediarc', patterns = []) {
  return new Promise(resolve => {
    const cache = {};
    glob(globQuery, {}, (err, files) => {
      Promise.all(
        files.map(location =>
          getJSONConfig(location, './', true, cache).then(json => new RCDto(location, json)),
        ),
      ).then(result => {
        const resolvedPatterns = patterns.map(pattern => pattern.split('.'));

        resolve(
          result.filter(({ data }) =>
            resolvedPatterns.every(pattern => doesNestedExist(data, pattern)),
          ),
        );
      });
    });
  });
}

module.exports = findRichmediaRC;
