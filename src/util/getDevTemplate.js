const handlebars = require('handlebars');
const fs = require('fs-extra');
const path = require('path');

let prom;

/**
 *
 * @return {Promise<HandlebarsTemplateDelegate<T>>}
 */
module.exports = function getTemplate() {
  if (!prom) {
    prom = Promise.resolve(true).then(
      () =>
        new Promise((resolve, reject) => {
          fs.readFile(
            path.join(__dirname, '../data/template.dev.hbs'),
            { encoding: 'utf-8' },
            (err, data) => {
              if (err) {
                reject(err);
              } else {
                resolve(handlebars.compile(data));
              }
            },
          );
        }),
    );
  }

  return prom;
};
