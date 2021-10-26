/**
 * transforms "object.names.name" into a JSON object
 * @param {key<string>} dot "object.names.name" notation of json object
 * @param {value<string>} value of current object
 * @return {obj}
 */
function createObjectFromJSONPath(key, value) {
    var result = object = {};
    var arr = key.split('.');
    for(var i = 0; i < arr.length-1; i++) {
        object = object[arr[i]] = {};
    }
    object[arr[arr.length-1]] = value;
    return result;
}

module.exports = createObjectFromJSONPath;
