module.exports = function getSpreadSheetId(url){
  let [_,url2] = url.split('https://docs.google.com/spreadsheets/d/')
  let [id] = url2.split('/');
  return id;
}
