/**
 *
 * @param {object} model
 * @param string path
 * @return {*}
 */
export default function getValue(model, path) {
  path.split('.').forEach(item => {
    if (model[item]) {
      model = model[item];
    }
  });
  return model;
}
