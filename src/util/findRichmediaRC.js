const getRichmediaRC = require('./getRichmediaRC');
const glob = require('glob');
const doesNestedExist = require('./doesNestedExists');

/**
 * @description will search for files with a pattern.
 * @param {string} globQuery
 * @param {Array<string>} patterns ['data.settings.entry.js', 'data.settings.entry.html']
 * @return {Promise<Array<RCDto>>}
 */
function findRichmediaRC(globQuery = '**/.richmediarc', patterns = []) {
  return new Promise(resolve => {
    const cache = {};
    glob(globQuery, { ignore: ['./node_modules/**/.richmediarc'] }, (err, files) => {
      Promise.all(
        files.map(location =>
          getRichmediaRC(location, './', true, cache).then(data => ({ location, data })),
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
