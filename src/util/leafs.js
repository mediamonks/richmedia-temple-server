function leafs(obj, fn, maxNesting = 10) {
  if(maxNesting < 0){
    return;
  }
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if( typeof obj[i] === 'object'){
        leafs(obj[i], fn, maxNesting - 1);
      } else {
        fn(obj[i], obj, i);
      }
    }
  }
}

module.exports = leafs;
