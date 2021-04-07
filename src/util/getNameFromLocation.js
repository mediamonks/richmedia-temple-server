const path = require('path');

module.exports = function getNameFromLocation(location) {
  let list = location.split('/');

  list = list
    .map(val => {
      val = val.replace('.richmediarc', '');
      val = val.toLowerCase();
      val = val.replace(/\W/, '');
      return val;
    })
    .filter(val => ['.', ''].indexOf(val) < 0);

  return list.join('_');
};
