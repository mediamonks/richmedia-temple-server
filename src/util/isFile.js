const r = /(\w+\.(jpg|png|gif|eps|json|js|html|css|svg|mp4|text|md|woff|woff2|otf|hbs|ttf)$)|\.(richmediarc|richmediarc[\w\.]+)$/;

module.exports = function isFile(val) {
  return r.test(val);
};
