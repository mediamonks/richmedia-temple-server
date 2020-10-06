const loaderUtils = require('loader-utils');
const isExternalURL = require('../../util/isExternalURL');
const leafs = require("../../util/leafs");
const isFile = require("../../util/isFile");
const fs = require('fs');

/**
 * Allows you to import external files into a json value.
 * Can be used for any value, in an object or array.
 */
module.exports = function RichmediaRCLoader(data) {
  const callback = this.async();
  const options = loaderUtils.getOptions(this);
  const loaderContext = this;

  const {configFilepath, config, isVirtual} = options;

  const prom = Promise.resolve(config)

  if(!isVirtual){
    this.addDependency(configFilepath);

    prom.then(() => {
      return new Promise((resolve, reject) => {
        fs.readFile(configFilepath, 'utf-8', function(err, data) {
          if(err) return reject(err);
          resolve(data);
        });
      })
    })
  }

  prom.then(data => {
    data = typeof data === 'string' ? JSON.parse(data) : data;

    let ruuid = Date.now();
    const replaceItems = [];

    if (data && data.content) {
      leafs(data.content, (value, obj, name) => {
        if(isFile(value) && !isExternalURL(value)){
          const id = `uuid_replace_${ruuid.toString(16)}`;

          replaceItems.push({
            key: loaderUtils.stringifyRequest(loaderContext, id),
            value: `require(${loaderUtils.stringifyRequest(loaderContext, `${value}`)})`,
          });

          this.addDependency(value);

          obj[name] = id;
        }
      });
    }


    data = JSON.stringify(data)
      .replace(/\u2028/g, '\\u2028')
      .replace(/\u2029/g, '\\u2029');

    data = replaceItems.reduce((prev, item) => {
      prev = prev.replace(item.key, item.value);
      return prev;
    }, data);

    callback(null, `module.exports = ${data};`)
  })


};
