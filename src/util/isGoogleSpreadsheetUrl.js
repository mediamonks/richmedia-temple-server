module.exports = function isGoogleSpreadsheetUrl(url){
  if(url.indexOf('https://docs.google.com/spreadsheets') === 0){
    return true;
  }

  return false;
}
