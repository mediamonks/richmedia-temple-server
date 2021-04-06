const isGoogleSpreadsheetUrl = require('./isGoogleSpreadsheetUrl');
const getGoogleSheetIdFromUrl = require('./getGoogleSheetIdFromUrl');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const chalk = require('chalk');

const cacheSpreadSheets = {};
const cacheSheets = {};

module.exports = async function expandWithSpreadsheetData(configs) {
  // add support for google sheets.
  // detect if contentSource is available in
  const newConfigList = [];

  const hasSameLocation = location => {
    for (let i = 0; i < newConfigList.length; i++) {
      const newConfigListElement = newConfigList[i];
      if (newConfigListElement.location === location) {
        return true;
      }
    }
  };

  /**
   *
   * @param {string} location
   * @param {object} contentSource
   * @param {object} row
   * @param {number} index
   * @param {number} offset
   * @return {string}
   */
  const getUniqueLocation = (location, contentSource, row, index, offset = 0) => {
    if (contentSource.idField) {
      let name = `${location}.${row[contentSource.idField]}`;

      if (offset > 0) {
        name = `${name}_${offset}`;
      }

      if (hasSameLocation(name)) {
        return getUniqueLocation(location, contentSource, row, index, offset + 1);
      } else {
        return name;
      }
    }

    return `${location}.row_${index}`;
  };

  for (let i = 0; i < configs.length; i++) {
    const { data, location } = configs[i];

    if (data && data.settings && data.settings.contentSource) {
      const contentSource = data.settings.contentSource;

      console.log(`${chalk.green('✔')} Detecting spreadsheet in ${location}`);

      if (!isGoogleSpreadsheetUrl(contentSource.url)) {
        throw new Error('settings.contentSource.url is not a valid google spreadsheet url.');
      }

      // get data.
      const id = getGoogleSheetIdFromUrl(contentSource.url);

      if(!cacheSpreadSheets[id]){
        console.log(`gathering google sheets data for ${id}`);
        cacheSpreadSheets[id] = new GoogleSpreadsheet(id);
        cacheSpreadSheets[id].useApiKey(contentSource.apiKey);
        await cacheSpreadSheets[id].loadInfo();
      }

      const doc = cacheSpreadSheets[id];

      let sheet;

      if (contentSource.tabName) {
        sheet = doc.sheetsByTitle[contentSource.tabName];

        if (!sheet) {
          console.log(
            `${chalk.green(
              '✔',
            )} Selecting first tab from sheet because tabName was incorrectly named (check tabNames in spreadsheet).`,
          );
          sheet = doc.sheetsByIndex[0];
        } else {
          console.log(`${chalk.green('✔')} Selecting "${contentSource.tabName}" from sheet.`);
        }
      } else {
        console.log(
          `${chalk.green('✔')} Selecting first tab from sheet because tabName was not defined.`,
        );
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

        // filter out everything that is not needed.
        if(contentSource.filter){
          const filters = [];
          if(contentSource.filter instanceof Array){
            filters.push(...contentSource.filter);
          } else {
            filters.push(contentSource.filter);
          }

          // for loop so i can break or return emmediatly
          for (let j = 0; j < filters.length; j++) {
            const filter = filters[j];
            for (const key in filter) {
              if (filter.hasOwnProperty(key)
                && staticRow[key]
                && staticRow[key] !== filter[key])
              {
                return;
              }
            }
          }
        }

        newConfigList.push({
          data: {
            ...data,
            content: {
              ...(data.content || {}),
              ...staticRow,
            },
          },
          location: getUniqueLocation(location, contentSource, row, index),
        });
      });
    } else {
      newConfigList.push({ data, location });
    }
  }

  return newConfigList;
};
