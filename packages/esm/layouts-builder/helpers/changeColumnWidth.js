import { __assign } from '../../node_modules/tslib/tslib.es6.js';
import { gridValue } from './gridValue.js';

var changeColumnWidth = function changeColumnWidth(layouts, container, cols) {
  return layouts.map(function (section) {
    if (section.id !== container.sectionId) return section;
    return __assign(__assign({}, section), {
      rows: section.rows.map(function (row) {
        if (row.id !== container.rowId) return row;
        return __assign(__assign({}, row), {
          columns: row.columns.map(function (col) {
            var makeItGrid = gridValue(10, cols.width);
            if (!makeItGrid) return col;

            if (col.id === cols.colId) {
              return __assign(__assign({}, col), {
                width: makeItGrid
              });
            }

            var rest = (100 - makeItGrid) / (row.columns.length - 1);
            console.log('rest', rest);
            return __assign(__assign({}, col), {
              width: Math.round(rest)
            });
          })
        });
      })
    });
  });
};

export { changeColumnWidth };
