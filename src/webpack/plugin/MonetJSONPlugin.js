const fs = require('fs-extra');
const path = require('path');
const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin');
const md5File = require('md5-file');
const isExternalURL = require('../../util/isExternalURL');
const getRichmediaRC = require('../../util/getJSONConfig');

class MonetJSONPlugin {
  constructor(options, ...rest) {
    console.log(options);
    this.config = options.config;
  }

  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      getRichmediaRC(this.config)
        .then(json => {

          if (json.content) {
            const result = Object.keys(json.content).map(key => {
              const value = json.content[key];
              if ((value.type === 'image' || value.type === 'video') && !isExternalURL(value.url)) {

                return new Promise(resolve => {
                  const url = path.join(path.dirname(this.config), value.url);
                  const data = path.parse(url);
                  value.url = `${md5File.sync(url)}${data.ext}`;

                  fs.readFile(url, (err, data) => {

                    compilation.assets[value.url] = {
                      source: () => data,
                      size: function() {
                        return Buffer.byteLength(this.source());
                      },
                    };

                    resolve();
                  });
                });
              }
            });

            Promise.all(result).then(() => {
              const backupResult = JSON.stringify(getBackupFromConfig(json));
              const manifestResult = JSON.stringify(getManifestFromConfig(json));

              // Insert this list into the Webpack build as a new file asset:
              compilation.assets['backup.json'] = {
                source: function() {
                  return backupResult;
                },
                size: function() {
                  return backupResult.length;
                },
              };

              compilation.assets['manifest.json'] = {
                source: function() {
                  return manifestResult;
                },
                size: function() {
                  return manifestResult.length;
                },
              };

              callback();
            });
          } else {
            callback();
          }
        })
        .catch(err => {
          console.log(err);
          throw err;
        });
    });
  }
}

function getBackupFromConfig(json) {
  const result = {
    rootAssets: {},
    assetGroups: [],
  };

  result.rootAssets = Object.keys(json.content).reduce((prev, name) => {
    const value = json.content[name];
    prev[`${value.type}.${name}`] = value;
    return prev;
  }, {});

  return result;
}

function getManifestFromConfig(json) {
  const result = {
    rootComponents: [],
    titleComponents: [],
    creativeName: '{creativeName}',
    agencyName: 'Mediamonks',
    minTitles: 0,
    maxTitles: 0,
    width: 300,
    height: 250,
  };

  result.rootComponents = Object.keys(json.content).map(name => {
    return json.content[name];
  });

  result.creativeName = json.monet.creativeName;
  result.agencyName = json.monet.agencyName;
  result.width = json.settings.size.width;
  result.height = json.settings.size.height;

  return result;
}

function autoResolveAssets(assets) {}

module.exports = MonetJSONPlugin;
