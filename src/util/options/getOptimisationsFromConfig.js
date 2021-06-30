/**
 *
 * @param richmediarc
 * @return {{css: boolean, javascript: boolean, html: boolean, image: boolean}}
 */
module.exports = function getOptimisationsFromConfig(richmediarc){
  let result = {
    css: true,
    js: true,
    html: true,
    image: true,
  };

  if('settings' in richmediarc
    && 'optimizations' in richmediarc.settings)
  {
    const {optimizations} = richmediarc.settings;

    switch (typeof optimizations){
      case "boolean":{
        if(optimizations === false){
          result.css = false;
          result.js = false;
          result.html = false;
          result.image = false;
        }
        break;
      }

      case "object":{
        if('css' in optimizations && !optimizations.css){
          result.css = false;
        }

        if('js' in optimizations && !optimizations.js){
          result.js = false;
        }

        if('html' in optimizations && !optimizations.html){
          result.html = false;
        }

        if('image' in optimizations && !optimizations.image){
          result.image = false;
        }
      }
    }
  }

  return result;
}
