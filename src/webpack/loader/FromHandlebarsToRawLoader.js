const loaderUtils = require('loader-utils');

module.exports = function FromHandlebarsToRawLoader(content, sourceMap) {
  const callback = this.async();
  const options = loaderUtils.getOptions(this);
  const { configLoaderName } = options;

  const bla = `
module.exports = function(){
  const config = require("${configLoaderName}");
  const exec = `;

  content = content.replace("module.exports = ", bla)
  content += `
return exec(config); }`;

  callback(null, content);
};
