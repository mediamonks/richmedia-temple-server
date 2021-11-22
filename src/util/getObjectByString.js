/**
 * Gets actual arrays and objects via String
 * @param {Object} o
 * @param {String} s
 * @return {Object}
 */
function getObjectByString(o, s) {
  s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  s = s.replace(/^\./, '');           // strip a leading dot
  const a = s.split('.');
  for (let i = 0, n = a.length; i < n; ++i) {
    let k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
}

module.exports = getObjectByString;
