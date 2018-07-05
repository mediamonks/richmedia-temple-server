const loaderUtils = require('loader-utils');
const isExternalURL = require('../util/isExternalURL');

/**
 * Allows you to import external files into a json value.
 * Can be used for any value, in an object or array.
 */
module.exports = function(content) {
  this.cacheable();
  const loaderContext = this;

  content = typeof content === 'string' ? JSON.parse(content) : content;

  let ruuid = Date.now();
  const replaceItems = [];

  if (content && content.content) {
    Object.keys(content.content).forEach(key => {
      const item = content.content[key];
      if ((item.type === 'video' || item.type === 'image') && !isExternalURL(item.url)) {
        const id = `uuid_replace_${(ruuid++).toString(16)}`;
        replaceItems.push({
          key: loaderUtils.stringifyRequest(loaderContext, id),
          value: `require(${loaderUtils.stringifyRequest(
            loaderContext,
            `file-loader!${item.url}`,
          )})`,
        });

        item.url = id;
      }
    });
  }

  content = JSON.stringify(content)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

  content = replaceItems.reduce((prev, item) => {
    return prev.replace(item.key, item.value);
  }, content);

  return `module.exports = ${content};`;
};
