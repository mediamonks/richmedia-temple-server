function leafs(obj, fn, maxNesting = 10, path = []) {
  if (maxNesting < 0) {
    return;
  }

  for (var i in obj) {
    const currPath = [...path];
    if (obj.hasOwnProperty(i)) {
      currPath.push(i);
      if (typeof obj[i] === 'object') {
        leafs(obj[i], fn, maxNesting - 1, currPath);
      } else {
        fn(obj[i], obj, i, currPath);
      }
    }
  }
}

module.exports = leafs;
