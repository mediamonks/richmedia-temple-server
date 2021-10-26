/**
 * Merge two objects without overwriting the default object
 * @param {target<arguments>} - arguments (target, obj1, obj2) or ({}, obj1, obj2)
 * @return {obj}
 */
function extendObject (target) {
    for(let i=1; i<arguments.length; ++i) {
        let from = arguments[i];
        if(typeof from !== 'object') continue;
        for(var j in from) {
            if(from.hasOwnProperty(j)) {
                target[j] = typeof from[j]==='object' && !Array.isArray(from[j])
                    ? extendObject({}, target[j], from[j])
                    : from[j];
            }
        }
    }
    return target;
}

module.exports = extendObject;
