const loaderUtils = require('loader-utils');
const isExternalURL = require('../../util/isExternalURL');
const getRichmediaRC = require('../../util/getRichmediaRC');
const leafs = require('../../util/leafs');
const isFile = require('../../util/isFile');
const fs = require('fs');
const parse5 = require('parse5');


module.exports = function ConvertHandlebarsOutputToHtmlLoader(content, sourceMap) {
  const callback = this.async();

  // function searchForProperty(model, name, arrpath = [], maxNesting = 5){
  //   if (maxNesting < 0) {
  //     return;
  //   }
  //
  //   for (var i in model) {
  //     const currPath = [...arrpath];
  //     if (model.hasOwnProperty(i)) {
  //
  //       currPath.push(i);
  //       if(i == name){
  //         throw new Error('FOUND ' + currPath.join('.'))
  //       } else if (typeof model[i] === 'object') {
  //         console.log(currPath.join('.') + "\n");
  //         searchForProperty(model[i], name, currPath, currPath, maxNesting - 1);
  //       }
  //     }
  //   }
  // }
  //
  // searchForProperty(this, 'getAsset');

  // console.log(this);
  // const deps = this.getDependencies();
  // const res = deps.map(dep => {
  //   return loaderUtils.interpolateName(loaderContext, dep)
  // })
  // console.log(deps);
  // console.log(res);

  const htmlData = this.exec(content, this.resource)(this);

  // const documentFragment = parse5.parseFragment(htmlData, {
  //   sourceCodeLocationInfo: true,
  // });
  // //
  // const inlineImages = getInlineImages(documentFragment);
  // inlineImages.forEach(inlineImage => {
  //   const src = getImagesSrc(inlineImage);
  //   console.log(this.fs.readFileSync(src));
  //   console.log(src);
  //
  // })

  // const json = JSON.stringify(htmlData).replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
  // callback(null, `module.exports = ${json};`);
  callback(null, htmlData);
};


function isNodeValidInlineImage(node) {
  return !!(
    node.nodeName === 'img' &&
    (node.attrs.filter(item => item.name === 'inline').length) &&
    getImagesSrc(node)
  );
}

function getImagesSrc(inlineImage) {
  const svgSrcObject = inlineImage.attrs.find(item => item.name === 'src');

  // image does not have a src attribute

  if (!svgSrcObject) return '';

  // grab the image src

  const svgSrc = svgSrcObject.value;

  // image src attribute must not be blank and it must be referencing a file with a .svg extension

  return svgSrc && svgSrc.indexOf('.svg') !== -1 ? svgSrc : '';
}

function getInlineImages(documentFragment, inlineImages = []) {
  if (documentFragment.childNodes && documentFragment.childNodes.length) {
    documentFragment.childNodes.forEach(childNode => {
      if (isNodeValidInlineImage(childNode)) {
        inlineImages.push(childNode);
      } else {
        inlineImages = getInlineImages(childNode, inlineImages);
      }
    });
  }

  return inlineImages;
}

/**
 * replace the img with the optimized SVG
 * @param {string} html
 * @param {Object} inlineImage - parse5 document
 * @param {string} svg
 *
 */
function replaceImageWithSVG(html, inlineImage, svg) {
  // Get all passed image attributes except 'inline' and 'src'
  const imgAttributes = inlineImage.attrs.reduce((acc, attr) => {
    const { name, value } = attr;

    return name !== 'inline' && name !== 'src' ? acc + `${name}="${value}" ` : acc;
  }, '');

  // Set the attributes to the output svg
  if (imgAttributes) {
    svg = svg.replace('<svg', `<svg ${imgAttributes}`);
  }

  const start = inlineImage.sourceCodeLocation.startOffset;

  const end = inlineImage.sourceCodeLocation.endOffset;

  // remove the img tag and add the svg content
  return html.substring(0, start) + svg + html.substring(end);
}
