const handlebars = require('handlebars');
const fs = require('fs-extra');
const path = require('path');

let prom;

handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

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
            path.join(__dirname, '../data/template.hbs'),
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
