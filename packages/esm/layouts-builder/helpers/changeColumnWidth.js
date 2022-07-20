import { __assign } from '../../node_modules/tslib/tslib.es6.js';
import { gridValue } from './gridValue.js';
import { keepRowFullWidth } from './keepRowFullWidth.js';

var changeColumnWidth = function changeColumnWidth(layouts, container, cols) {
  return layouts.map(function (section) {
    if (section.id !== container.sectionId) return section;
    return __assign(__assign({}, section), {
      rows: section.rows.map(function (row) {
        if (row.id !== container.rowId) return row;
        var newCols = row.columns.map(function (col, index) {
          var findIndex = row.columns.findIndex(function (thicol) {
            return thicol.id === cols.colId;
          });
          var makeItGrid = row.columns.length % 2 === 0 ? gridValue(2, cols.width) : cols.width;
          if (!makeItGrid) return col;

          if (col.id === cols.colId) {
            return __assign(__assign({}, col), {
              width: Math.round(makeItGrid)
            });
          }

          if (index === findIndex + 1) {
            return __assign(__assign({}, col), {
              width: Math.round(cols.next)
            });
          }

          return col;
        });
        var full = row.columns.length > 1 ? keepRowFullWidth(newCols) : newCols;
        return __assign(__assign({}, row), {
          columns: full
        });
      })
    });
  });
};

export { changeColumnWidth };
