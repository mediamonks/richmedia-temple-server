module.exports = function richmediaRCToMonetManifestJSON({ content, monet, settings }) {
  const result = {
    rootComponents: [],
    titleComponents: [],
    creativeName: '',
    agencyName: '',
    minTitles: 0,
    maxTitles: 0,
    width: 0,
    height: 0,
  };

  result.rootComponents = Object.keys(content).map(name => content[name]);

  if (monet) {
    result.creativeName = monet.creative;
    result.agencyName = monet.agency;
  }

  result.width = settings.size.width;
  result.height = settings.size.height;

  return result;
};
