const isGoogleSpreadsheetUrl = require('./isGoogleSpreadsheetUrl');
const getGoogleSheetIdFromUrl = require('./getGoogleSheetIdFromUrl');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const chalk = require('chalk');
const extendObject = require('./extendObject');
const createObjectFromJSONPath = require('./createObjectFromJSONPath');
const fs = require('fs')
const crypto = require('crypto')
const getDataFromGoogleSpreadsheet = require("./getDataFromGoogleSpreadsheet");

const cacheSpreadSheets = {};
const cacheSheets = {};

module.exports = async function expandWithSpreadsheetData(configs, mode) {
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
    const locStringPt1 = location.substr(0, location.lastIndexOf('.'));
    const locStringPt2 = location.substr(location.lastIndexOf('.'), location.length);
    location = locStringPt1 + 'googlesheet'; // doing this to create a unique location

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
      const spreadsheetData = await getDataFromGoogleSpreadsheet(contentSource);

      console.log(`${chalk.green('✔')} adding ${spreadsheetData.rows.length} items for development`);

      spreadsheetData.rows.forEach((row, index) => {
        const staticRow = spreadsheetData.headerValues.reduce((prev, name) => {
          prev[name] = row[name];
          return prev;
        }, {});

        let staticRowObject = {};
        for (const key in staticRow) {
          if (staticRow.hasOwnProperty(key)) {
            let obj = createObjectFromJSONPath(key, staticRow[key]);
            extendObject(staticRowObject, obj);
          }
        }

        // filter out everything that is not needed.
        if (contentSource.filter) {
          const filters = [];
          if (contentSource.filter instanceof Array) {
            filters.push(...contentSource.filter);
          } else {
            filters.push(contentSource.filter);
          }

          // for loop so i can break or return emmediatly
          for (let j = 0; j < filters.length; j++) {
            const filter = filters[j];
            for (const key in filter) {
              if (filter.hasOwnProperty(key) && staticRowObject[key] && staticRowObject[key] !== filter[key]) {
                return;
              }
            }
          }
        }

        let content = extendObject({}, (data.content || {}), staticRowObject)

        let uniqueLocation = getUniqueLocation(location, contentSource, row, index);
        const uniqueHash = crypto.randomBytes(20).toString('hex');

        let newObj = {
          data: {
            ...data,
            content,
            uniqueHash
          },
          location: uniqueLocation,
          willBeDeletedAfterServerCloses: true,
          row,
          uniqueHash,
          mode
        };

        newConfigList.push(newObj);
      });
    } else {
      newConfigList.push({ data, location });
    }
  }

  return newConfigList;
};
