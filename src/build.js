const ConfigGeneratorByRichmediarcList = require('./webpack/config/ConfigGeneratorByRichmediarcList');
const findJSONConfigs = require('./util/findJSONConfigs');
const webpack = require('webpack');

module.exports = (env) => {

  findJSONConfigs('./**/.richmediarc', ['data.settings.entry.js', 'data.settings.entry.html']).then(rcDtoList => {

    webpack(ConfigGeneratorByRichmediarcList(rcDtoList, 'production').catch(e => {
      console.log(e);
    }))
  });


};
