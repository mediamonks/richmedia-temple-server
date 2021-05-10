const loaderUtils = require('loader-utils');
const isExternalURL = require('../../util/isExternalURL');
const getRichmediaRC = require('../../util/getRichmediaRC');
const leafs = require('../../util/leafs');
const isFile = require('../../util/isFile');
const fs = require('fs');
const parse5 = require('parse5');


module.exports = function InlineSVGLoader(content, sourceMap) {
  const callback = this.async();
  const options = loaderUtils.getOptions(this);
  const loaderContext = this;

  console.log(content);
  // console.log(this..getAssets('yellow_star_1Vc4ioO.svg'));

  // const documentFragment = parse5.parseFragment(content, {
  //   sourceCodeLocationInfo: true,
  // });
  //
  // const inlineImages = getInlineImages(documentFragment);
  // console.log(documentFragment);
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
