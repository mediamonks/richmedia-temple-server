module.exports = function getPlatformByRichmediaRc(richmediaRc) {
  if (!!richmediaRc.monet) {
    return 'netflix';
  } else if (!!richmediaRc.doubleclick) {
    return 'doubleclick';
  } else {
    return 'unknown';
  }
};
