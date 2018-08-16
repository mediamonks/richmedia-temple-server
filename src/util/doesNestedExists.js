/**
 * checks if single pattern in property names
 * @param {any} obj
 * @param {Array<string>} pattern
 * @return {boolean}
 */
function doesNestedExist(obj, pattern) {
  for (let i = 0; i < pattern.length; i += 1) {
    if (!obj || !Object.prototype.hasOwnProperty.call(obj, pattern[i])) {
      return false;
    }

    // eslint-disable-next-line
    obj = obj[pattern[i]];
  }

  return true;
}

module.exports = doesNestedExist;
