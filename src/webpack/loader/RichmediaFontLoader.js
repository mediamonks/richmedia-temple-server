const loaderUtils = require('loader-utils');
const subsetFont = require('subset-font');
const path = require('path');

function GetPropertyValue(obj1, dataToRetrieve) {
  return dataToRetrieve
    .split('.') // split string based on `.`
    .reduce(function(o, k) {
      return o && o[k]; // get inner property if `o` is defined else get `o` and return
    }, obj1) // set initial value as object
}

function uniqueArray(a) {
  var prims = {"boolean":{}, "number":{}, "string":{}}, objs = [];

  return a.filter(function(item) {
    var type = typeof item;
    if(type in prims)
      return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
    else
      return objs.indexOf(item) >= 0 ? false : objs.push(item);
  });
}

module.exports = async function (content) {

  let callback = this.async();
  const options = loaderUtils.getOptions(this);

  if (options.config.settings.hasOwnProperty('fonts')) {
    const fonts = options.config.settings.fonts;
    let glyphs = [];

    fonts.forEach(font => {
      if (font.src === this.resourcePath) {
        const allContent = font.glyphs.reduce( (acc, cur) => acc + GetPropertyValue(options.config, cur), ""); // basically concatenate all content found in the glyphs node
        const allContent_arr = allContent.split(''); //create array from it
        glyphs = uniqueArray(allContent_arr); //remove all duplicate values
      }
    })

    if (glyphs.length > 1) { // if the font was found in the settings and there were specific glyphs in it
      const subsetBuffer = await subsetFont(Buffer.from(content), glyphs.toString(), {
        targetFormat: 'woff2',
      });

      callback(null, subsetBuffer); // return new buffer with smaller font
    }

    else {
      callback(null, content); // return same font, no changes
    }
  }

  else {
    callback(null, content); // return same font, no changes
  }

};

module.exports.raw = true;
