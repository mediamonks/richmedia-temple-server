/* eslint no-param-reassign: 0 */
/* eslint class-methods-use-this: 0 */

const fs = require('fs-extra');
const path = require('path');
const md5File = require('md5-file');
const isExternalURL = require('../../util/isExternalURL');
const getRichmediaRC = require('../../util/getRichmediaRC');
const isFile = require('../../util/isFile');
const leafs = require("../../util/leafs");

class RichmediaRCPlugin {
  constructor(options) {
    this.config = options.config;
  }

  apply(compiler) {
    compiler.hooks.emit.tapPromise('RichmediaRCPlugin', async compilation => {
      const json = await getRichmediaRC(this.config.filepath);

      const all = [];
      leafs(json.content, (value, obj, name) => {
        if (isFile(value) && !isExternalURL(value)) {
          all.push(new Promise(resolve => {

            fs.readFile(value, (err, source) => {
              const data = path.parse(value);
              obj[name] = `${md5File.sync(value)}${data.ext}`;
              compilation.assets[obj[name]] = {
                source: () => source,
                size() {
                  return Buffer.byteLength(this.source());
                },
              };

              resolve(compilation);
            });
          }));
        }
      });

      await Promise.all(result);
      const result = JSON.stringify(json);

      // Insert this list into the Webpack build as a new file asset:
      compilation.assets['.richmediarc'] = {
        source: () => result,
        size() {
          return this.source().length;
        },
      };

      return compilation;
    });
  }
}

module.exports = RichmediaRCPlugin;
