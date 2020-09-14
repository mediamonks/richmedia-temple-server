const isGoogleSpreadsheetUrl = require('./isGoogleSpreadsheetUrl');
const getGoogleSheetIdFromUrl = require('./getGoogleSheetIdFromUrl');
const {GoogleSpreadsheet} = require('google-spreadsheet');
const chalk = require('chalk');

module.exports = async function expandWithSpreadsheetData(configs){
  // add support for google sheets.
  // detect if contentSource is available in
  const newConfigList = [];
  for (let i = 0; i < configs.length; i++) {
    const {data, location} = configs[i];
    if(data
      && data.settings
      && data.settings.contentSource)
    {
      const contentSource = data.settings.contentSource;

      if(isGoogleSpreadsheetUrl(contentSource.url)){
        console.log(`${chalk.green('✔')} Detecting spreadsheet in ${location}`);

        // get data.
        const id = getGoogleSheetIdFromUrl(contentSource.url);
        const doc = new GoogleSpreadsheet(id);
        doc.useApiKey(contentSource.apiKey);
        await doc.loadInfo();

        const sheet = doc.sheetsByIndex[0];
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
            location: `${location}.row_${index}`
          });
        })
      }
    } else {
      newConfigList.push({data, location});
    }
  }

  return newConfigList;
}
