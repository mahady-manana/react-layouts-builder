import { __assign } from '../../node_modules/tslib/tslib.es6.js';

var removeEmptyColumn = function removeEmptyColumn(layouts) {
  return layouts.map(function (section) {
    var newColumns = section.columns.filter(function (col) {
      return (col.childIds.length || 0) > 0;
    });
    return __assign(__assign({}, section), {
      columns: newColumns
    });
  });
};

var removeEmptyLayout = function removeEmptyLayout(layouts) {
  var notEmptyCol = removeEmptyColumn(layouts);
  return notEmptyCol.filter(function (section) {
    return section.columns.length > 0;
  });
};

export { removeEmptyLayout };
