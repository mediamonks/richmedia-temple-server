const leafs = require("./leafs");

/**
 *
 * @param obj
 * @return string
 */
function getUniqueCharsUsedInObjectPropValues(obj){
  const result = [];
  leafs(obj, (val, obj, name, path) => {

    val = val.replace(/[^\w]/, '')

    val.splice('').forEach(char => {
      if(result.indexOf(char) < 0){
        result.push(char);
      }
    })
  });

  return result.join('');
}

module.exports = getUniqueCharsUsedInObjectPropValues;
