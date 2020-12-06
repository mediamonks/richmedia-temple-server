const r = /(\w+\.(js)$)$/;

module.exports = function isJsFile(val){
  return r.test(val);
}
