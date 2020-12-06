const puppeteer = require('puppeteer');
// const apng = require('node-apng');
// const fs = require('fs-extra');
// const jimp = require('jimp');

async function recordUsingScreencast(setup) {
  let buffers;
  let cuts;
  let timestamp;
  let session;

  let resolve;
  // TODO: Hook up the reject using try-catch blocks in start and stop
  let reject;
  const deffered = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  async function start(page) {
    // Clear the buffers and cuts and reset the timestamp from the previous recording
    buffers = [];
    cuts = [];
    timestamp = Date.now();
    session = await page.target().createCDPSession();
    await session.send('Page.startScreencast');
    session.on('Page.screencastFrame', event => {
      const buffer = Buffer.from(event.data, 'base64');
      buffers.push(buffer);
      cuts.push(Date.now());
    });
  }

  async function stop() {
    await session.send('Page.stopScreencast');
    // Drop the first frame because it always has wrong dimensions
    buffers.shift(0);
    cuts.shift(0);
    resolve(makeApng(buffers, cuts, timestamp));
  }

  await setup(start, stop);
  return deffered;
}

function makeApng(buffers, cuts, timestamp) {
  const delays = cuts.reduce((a, c, i) => { a.push(c - (cuts[i - 1] || timestamp)); return a; }, []);
  return apng(buffers, index => ({ numerator: delays[index], denominator: 1000 }));
}

async function setup(url, start, stop) {
  const browser = await puppeteer.launch();
  const [page] = await browser.pages();
  await page.goto(url);
  await start(page);
  await page.waitForTimeout(5000);
  await stop();
  await browser.close();
}


/**
 *
 * @param url
 * @param {number} duration
 * @return {Promise<Buffer>}
 */
async function createVideo(url, duration = 15){
  const s = (start, stop) => setup(url, start, stop);
  return await recordUsingScreencast(s);
}

module.exports = createVideo;
