const r = /\$\{([\w\.]+)\}/g;

function getValue(model, path) {
  path.forEach(item => {
    if (model[item]) {
      model = model[item];
    }
  });

  if (typeof model !== 'string' && typeof model !== 'number') {
    throw new Error(`defined path is wrong ${path.join('.')}`);
  }

  return model;
}

/**
 *
 * @param {string} str
 * @param {object} obj
 */
function placeholders(str, obj){
  if(r.test(str)){
    str = str.replace(r, function (match, p1) {
      let val = '';

      try {

        val = getValue(obj, p1.split('.'))
      } catch (e){
      }

      return val;
    })
  }

  return str;
}


module.exports = placeholders;
