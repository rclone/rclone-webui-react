var deepObjectsMerge = function deepObjectsMerge(target, source) {
  // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
  var _arr = Object.keys(source);

  for (var _i = 0; _i < _arr.length; _i++) {
    var key = _arr[_i];

    if (source[key] instanceof Object) {
      Object.assign(source[key], deepObjectsMerge(target[key], source[key]));
    }
  } // Join `target` and modified `source`


  Object.assign(target || {}, source);
  return target;
};
//# sourceMappingURL=deep-objects-merge.js.map