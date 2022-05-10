import { __assign } from '../../node_modules/tslib/tslib.es6.js';

var removeEmptyLayout = function removeEmptyLayout(layouts) {
  var noEmptyChild = layouts.map(function (section) {
    return __assign(__assign({}, section), {
      rows: section.rows.map(function (row) {
        return __assign(__assign({}, row), {
          columns: row.columns.map(function (col) {
            return __assign(__assign({}, col), {
              childIds: col.childIds.filter(function (id) {
                return id;
              })
            });
          })
        });
      })
    });
  });
  var noEmptyColumn = noEmptyChild.map(function (section) {
    return __assign(__assign({}, section), {
      rows: section.rows.map(function (row) {
        return __assign(__assign({}, row), {
          columns: row.columns.filter(function (col) {
            return col.childIds.length > 0;
          })
        });
      })
    });
  });
  var noEmptyRow = noEmptyColumn.map(function (section) {
    return __assign(__assign({}, section), {
      rows: section.rows.filter(function (row) {
        return row.columns.length > 0;
      })
    });
  });
  var noEmptySection = noEmptyRow.filter(function (section) {
    return section.rows.length > 0;
  });
  return noEmptySection;
};

export { removeEmptyLayout };
