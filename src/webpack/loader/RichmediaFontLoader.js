const loaderUtils = require('loader-utils');
const subsetFont = require('subset-font');
const getRichmediaRC = require('../../util/getRichmediaRC');
const getObjectByString = require('../../util/getObjectByString');
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const get = require('lodash.get');

module.exports = async function(content) {
  const callback = this.async();
  const options = loaderUtils.getOptions(this);
  const loaderContext = this;
  let { configFilepath, config, isVirtual } = options;
  let glyphs = [];

  if (!isVirtual) {
    this.addDependency(configFilepath);
    config = await getRichmediaRC(configFilepath);
  }

  if (config.settings.hasOwnProperty('fonts')) {
    for (const collection of config.settings.fonts) {
      for (const font of collection.sources) {
        if (!fs.existsSync(font)) console.warn(chalk.red("WARNING: " + font + " doesn't exist. Please check the path in .richmediarc"));

        if (font === this.resourcePath) {
          const allContent = collection.subset.glyphs.reduce(function(acc, cur) {
              return acc + getObjectByString(config, cur)}
            ,'');

          // basically concatenate all content found in the glyphs node
          const allContent_arr = allContent.split(''); //create array from it

          glyphs = allContent.split('').filter((value, index, self) => {
            return self.indexOf(value) === index; //return array with only unique values
          });
        }
      }
    }

    if (glyphs.length > 1) {
      let targetFormat = path.extname(this.resourcePath).substr(1);
      if (targetFormat === 'ttf') targetFormat = 'truetype';

      // if the font was found in the settings and there were specific glyphs in it
      const subsetBuffer = await subsetFont(Buffer.from(content), glyphs.toString(), {
        targetFormat: targetFormat,
      });

      callback(null, subsetBuffer); // return new buffer with smaller font
    } else {
      callback(null, content); // return same font, no changes
    }

  } else {
    callback(null, content); // return same font, no changes
  }
};

module.exports.raw = true;
