/**
 * Will travel through a object and when it finds a leaf will call the function from the second argument
 *
 * @param {object} source
 * @param {function(leaf: any, source: object, key: any, currPath: Array:string) => void} fn
 * @param {number} maxNesting
 * @param {Array<string>} path
 */
function leafs(source, fn, maxNesting = 10, path = []) {
  if (maxNesting < 0) {
    return;
  }

  for (var i in source) {
    const currPath = [...path];
    if (source.hasOwnProperty(i)) {
      currPath.push(i);
      if (typeof source[i] === 'object') {
        leafs(source[i], fn, maxNesting - 1, currPath);
      } else {
        fn(source[i], source, i, currPath);
      }
    }
  }
}

module.exports = leafs;
