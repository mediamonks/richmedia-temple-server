/**
 *
 * @param richmediarc
 * @return {{css: boolean, js: boolean}}
 */
module.exports = function getOptimisationsFromConfig(richmediarc){
  let result = {
    css: true,
    js: true,
  };

  if('settings' in richmediarc
    && 'optimizations' in richmediarc.settings)
  {
    const {optimizations} = richmediarc.settings;

    switch (typeof optimizations){
      case "boolean":{
        if(optimizations === false){
          result.css = false;
          result.html = false;
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
      }
    }
  }

  return result;
}
