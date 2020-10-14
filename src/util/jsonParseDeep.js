module.exports = function jsonParseDeep(json, max = 5){
  let count = 0;
  while (typeof json === 'string' && count < max){
    json = JSON.parse(json);
    count++;
  }

  return json;
}
