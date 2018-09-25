module.exports = function getPlatformByRichmediaRc(richmediaRc) {
  if (!!richmediaRc.monet) {
    return 'monet';
  } else if (!!richmediaRc.doubleclick) {
    return 'doubleclick';
  } else {
    return 'unknown';
  }
};
