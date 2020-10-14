const isGoogleSpreadsheetUrl = require('./isGoogleSpreadsheetUrl');
const getGoogleSheetIdFromUrl = require('./getGoogleSheetIdFromUrl');
const {GoogleSpreadsheet} = require('google-spreadsheet');
const chalk = require('chalk');

module.exports = async function expandWithSpreadsheetData(configs){
  // add support for google sheets.
  // detect if contentSource is available in
  const newConfigList = [];

  const hasSameLocation = (location) => {
    for (let i = 0; i < newConfigList.length; i++) {
      const newConfigListElement = newConfigList[i];
      if(newConfigListElement.location === location){
        return true;
      }
    }
  }

  const getUniqueLocation = (location, contentSource, row, index, offset = 0) => {
    if(contentSource.idField){
      let name = `${location}.${row[contentSource.idField]}`;

      if(offset > 0){
        name = `${name}_${offset}`
      }

      if(hasSameLocation(name)){
        return getUniqueLocation(location, contentSource, row, index, offset + 1)
      } else {
        return name;
      }
    }

    return `${location}.row_${index}`
  }

  for (let i = 0; i < configs.length; i++) {
    const {data, location} = configs[i];
    if(data
      && data.settings
      && data.settings.contentSource)
    {
      const contentSource = data.settings.contentSource;

      console.log(`${chalk.green('✔')} Detecting spreadsheet in ${location}`);

      if(!isGoogleSpreadsheetUrl(contentSource.url)){
        throw new Error('settings.contentSource.url is not a valid google spreadsheet url.')
      }

      // get data.
      const id = getGoogleSheetIdFromUrl(contentSource.url);
      const doc = new GoogleSpreadsheet(id);
      doc.useApiKey(contentSource.apiKey);
      await doc.loadInfo();

      let sheet;

      if(contentSource.tabName){

        sheet = doc.sheetsByTitle[contentSource.tabName];
        if(!sheet){
          console.log(`${chalk.green('✔')} Selecting first tab from sheet because tabName was incorrectly named (check tabNames in spreadsheet).`);
          sheet = doc.sheetsByIndex[0];
        } else {
          console.log(`${chalk.green('✔')} Selecting "${contentSource.tabName}" from sheet.`);
        }
      } else {
        console.log(`${chalk.green('✔')} Selecting first tab from sheet because tabName was not defined.`);
        sheet = doc.sheetsByIndex[0];
      }

      const rows = await sheet.getRows();
      const headerValues = sheet.headerValues;

      console.log(`${chalk.green('✔')} adding ${rows.length} items for development`);

      rows.forEach((row, index) => {
        const staticRow = headerValues.reduce((prev, name) => {
          prev[name] = row[name];
          return prev;
        }, {});

        newConfigList.push({
          data: {
            ...data,
            content:{
              ...(data.content || {}),
              ...staticRow,
            }
          },
          location: getUniqueLocation(location, contentSource, row, index)
        });
      })

    } else {
      newConfigList.push({data, location});
    }
  }

  return newConfigList;
}
