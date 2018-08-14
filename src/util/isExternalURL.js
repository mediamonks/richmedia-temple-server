const reg = /^https?:\/\//;

function isExternalURL(url) {
  return reg.test(url);
}

module.exports = isExternalURL;
