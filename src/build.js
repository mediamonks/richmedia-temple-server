const factoryWebpackConfigGenerator = require('./library/node/webpack/config/factoryWebpackConfigGenerator');

module.exports = (env) => {
  console.log('env', env);
  return factoryWebpackConfigGenerator({ mode: 'production', location: '**/.richmediarc'}).then(webpackConfigs => {
    return webpackConfigs;
  }).catch(e => {
    console.log(e);
  });
};
