/* eslint no-param-reassign: 0 */

const fs = require('fs-extra');
const path = require('path');
const md5File = require('md5-file');
const isExternalURL = require('../../util/isExternalURL');
const getRichmediaRC = require('../../util/getRichmediaRC');
const richmediaRCToMonetBackupJSON = require('../../util/convert/richmediaRCToMonetBackupJSON');
const richmediaRCToMonetManifestJSON = require('../../util/convert/richmediaRCToMonetManifestJSON');

class MonetJSONPlugin {
  constructor(options) {
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

                  fs.readFile(url, (err, source) => {
                    compilation.assets[value.url] = {
                      source: () => source,
                      size() {
                        return Buffer.byteLength(this.source());
                      },
                    };

                    resolve();
                  });
                });
              }

              return null;
            });

            Promise.all(result).then(() => {
              const backupResult = JSON.stringify(richmediaRCToMonetBackupJSON(json));
              const manifestResult = JSON.stringify(richmediaRCToMonetManifestJSON(json));

              // Insert this list into the Webpack build as a new file asset:
              compilation.assets['backup.json'] = {
                source: () => backupResult,
                size() {
                  return this.source().length;
                },
              };

              compilation.assets['manifest.json'] = {
                source: () => manifestResult,
                size() {
                  return this.source().length;
                },
              };

              callback();
            });
          } else {
            callback();
          }
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err);
          throw err;
        });
    });
  }
}

module.exports = MonetJSONPlugin;
