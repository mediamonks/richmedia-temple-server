/* eslint no-param-reassign: 0 */
/* eslint class-methods-use-this: 0 */

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
    compiler.hooks.emit.tapPromise('MonetJSONPlugin', async compilation => {
      const json = await getRichmediaRC(this.config);

      if (json.content) {
        const result = Object.keys(json.content).map(key => {
          const value = json.content[key];

          if ((value.type === 'image' || value.type === 'video') && !isExternalURL(value.url)) {
            const url = path.join(path.dirname(this.config), value.url);
            const data = path.parse(url);
            value.url = `${md5File.sync(url)}${data.ext}`;

            return new Promise(resolve => {
              fs.readFile(url, (err, source) => {
                compilation.assets[value.url] = {
                  source: () => source,
                  size() {
                    return Buffer.byteLength(this.source());
                  },
                };

                resolve(compilation);
              });
            });
          }

          return null;
        });

        await Promise.all(result);
        const backupResult = JSON.stringify(
          richmediaRCToMonetBackupJSON(JSON.parse(JSON.stringify(json))),
        );
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

        return compilation;
      }

      return compilation;
    });
  }
}

module.exports = MonetJSONPlugin;
