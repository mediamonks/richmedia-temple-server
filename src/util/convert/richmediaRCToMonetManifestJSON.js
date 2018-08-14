module.exports = function richmediaRCToMonetManifestJSON({ content, monet, settings }) {
  const result = {
    rootComponents: [],
    titleComponents: [],
    creativeName: '{creativeName}',
    agencyName: 'Mediamonks',
    minTitles: 0,
    maxTitles: 0,
    width: 0,
    height: 0,
  };

  result.rootComponents = Object.keys(content).map(name => content[name]);

  result.creativeName = monet.creativeName;
  result.agencyName = monet.agencyName;
  result.width = settings.size.width;
  result.height = settings.size.height;

  return result;
};
