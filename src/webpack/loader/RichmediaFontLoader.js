const loaderUtils = require('loader-utils');
const subsetFont = require('subset-font');
const getRichmediaRC = require('../../util/getRichmediaRC');
const path = require('path');

function getPropertyValue(obj1, dataToRetrieve) {
  return dataToRetrieve
    .split('.') // split string based on `.`
    .reduce(function(o, k) {
      return o && o[k]; // get inner property if `o` is defined else get `o` and return
    }, obj1); // set initial value as object
}

module.exports = async function(content) {
  const callback = this.async();
  const options = loaderUtils.getOptions(this);
  const loaderContext = this;

  const { configFilepath } = options;
  this.addDependency(configFilepath);
  const data = await getRichmediaRC(configFilepath);

  if (data.settings.hasOwnProperty('fonts')) {

    const fonts = data.settings.fonts;
    let glyphs = [];

    fonts.forEach(font => {

      if (font.src === this.resourcePath) {

        const allContent = font.glyphs.reduce(
          (acc, cur) => acc + getPropertyValue(data, cur),
          '',
        ); // basically concatenate all content found in the glyphs node
        const allContent_arr = allContent.split(''); //create array from it

        glyphs = allContent.split('').filter((value, index, self) => {
          return self.indexOf(value) === index;
        });
      }
    });

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
