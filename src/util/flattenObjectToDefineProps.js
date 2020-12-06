const leafs = require("./leafs");
const isFile = require("./isFile");

function flattenObjectToDefineProps(obj){
  const result = {};
  leafs(obj, (val, obj, name, path) => {

    path = path.map(item => item.trim().replace(/ /g, '-').replace(/\W/g, ''))

    result[`${path.join('.')}`] = val;
  });


  return result;
}

module.exports = flattenObjectToCSSVars;
