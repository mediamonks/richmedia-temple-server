const leafs = require('./leafs');
const parsePlaceholders = require('./parsePlaceholders');

/**
 *
 * @param {Object} objectSource
 * @param {Object} model
 */
function parsePlaceholdersInObject(objectSource, model){
  leafs(objectSource, (value, source, key, path) => {
    source[key] = parsePlaceholders(value, model);
  });

  return objectSource;
}

module.exports = parsePlaceholdersInObject;
