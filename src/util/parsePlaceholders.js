const placeholderRegex = /\$\{([\w.\-\[\]\"]+)\}/g;

/**
 *
 * @param {object} model
 * @param {Array<string>} path
 * @returns {string|number}
 */
function getValue(model, path) {
  const resolvedValue = path.reduce((acc, part) => {
    if (acc && acc[part]) {
      return acc[part];
    }

    return undefined;
  }, model);

  if (typeof resolvedValue !== 'string' && typeof resolvedValue !== 'number') {
    throw new Error(`defined path is wrong ${path.join('.')}`);
  }

  return resolvedValue;
}

/**
 *
 * @param {string} source
 * @param {object} model
 */
function parsePlaceholders(source, model) {
  if (typeof source !== 'string') {
    return source;
  }

  return source.replace(placeholderRegex, function(match, placeholderPath) {
    let val = '';

    try {
      val = getValue(model, placeholderPath.split('.'));
    } catch (e) {}

    return val;
  });
}

module.exports = parsePlaceholders;
