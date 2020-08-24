const r = /(\w+\.(jpg|png|gif|eps|json|js|html|css)$)|\.(richmediarc|richmediarc\.\w+)$/;

module.exports = function isFile(val){
  return r.test(val);
}
