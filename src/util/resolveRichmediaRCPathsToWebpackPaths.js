const leafs = require('./leafs');

/**
 *
 * @param {compilation} compilation
 * @param {object} richmediarc
 * @param options
 */
module.exports = function resolveRichmediaRCPathsToWebpackPaths(
  compilation,
  richmediarc,
  options = {},
) {
  const mapResources = {};
  for (let module of compilation.modules) {
    if (module.buildInfo.assets) {
      for (const assetName of Object.keys(module.buildInfo.assets)) {
        // const fileName = compilation.getPath(assetName);
        mapResources[module.resource] = assetName; //module.buildInfo.assets[assetName]
      }
    }
  }

  leafs(richmediarc, function(value, obj, name) {
    if (mapResources[value]) {
      obj[name] = mapResources[value];
    }
  });

  return richmediarc;
};
