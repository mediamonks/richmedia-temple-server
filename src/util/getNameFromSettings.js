const path = require('path');

module.exports = function getNameFromSettings(settings) {
  const urls = path
    .dirname(settings.location)
    .split('/')
    .filter(val => val[0] !== '.');
  return urls.join('_');
};
