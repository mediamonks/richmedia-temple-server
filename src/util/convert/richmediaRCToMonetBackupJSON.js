module.exports = function richmediaRCToMonetBackupJSON({ content }) {
  const result = {
    rootAssets: {},
    assetGroups: [],
  };

  result.rootAssets = Object.keys(content).reduce((prev, name) => {
    const value = content[name];
    prev[`${value.type}.${name}`] = value;
    return prev;
  }, {});

  return result;
};
