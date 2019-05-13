module.exports = function richmediaRCToMonetBackupJSON({ content }) {
  const result = {
    rootAssets: {},
    assetGroups: [],
  };

  result.rootAssets = Object.keys(content).reduce((prev, name) => {
    const value = content[name];

    if (value.type === 'monetVideo') {
      value.type = 'video';
      value.url = value.video.url;

      delete value.video;
    }

    prev[`${value.type}.${name}`] = value;
    return prev;
  }, {});

  return result;
};
