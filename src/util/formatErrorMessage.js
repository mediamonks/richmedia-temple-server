/**
 *
 * @param {keyword: string, dataPath, schemaPath,params,message} error
 */
module.exports = function formatErrorMessage(error) {
  let result = '';

  result += `${error.dataPath.substr(1)} ${error.message}`;
  return result;
};
