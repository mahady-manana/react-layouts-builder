import { __assign } from '../../node_modules/tslib/tslib.es6.js';

var removeItemFromSource = function removeItemFromSource(columns, columnId, itemKey) {
  return columns.map(function (col) {
    console.log('WILL FOUND', col, columnId, itemKey);
    if (col.id !== columnId) return col;
    console.log('Found');
    var items = col.childIds.filter(function (key) {
      return key !== itemKey;
    });
    return __assign(__assign({}, col), {
      childIds: items
    });
  });
};

export { removeItemFromSource };
