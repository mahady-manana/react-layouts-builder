import { __assign } from '../../node_modules/tslib/tslib.es6.js';
import { keepRowFullWidth } from './keepRowFullWidth.js';
import { removeEmptyLayout } from './removeEmptylayout.js';

var removeItemFromSource = function removeItemFromSource(layouts, source, duplicate) {
  var finalLayouts = layouts.map(function (section) {
    if (section.id !== source.sectionId) {
      return section;
    }

    return __assign(__assign({}, section), {
      rows: section.rows.map(function (row) {
        if (row.id !== source.rowId) return row;
        var newColmuns = row.columns.map(function (col) {
          if (col.id !== source.columnId) return col;
          return __assign(__assign({}, col), {
            childIds: col.childIds.filter(function (id) {
              if (!id) return true;
              if (duplicate) return id !== 'DUPLICATE';
              return id.toString() !== source.itemKey.toString();
            })
          });
        }).filter(function (col) {
          return col.childIds.length > 0;
        });
        var keepFullWidth = keepRowFullWidth(newColmuns);
        return __assign(__assign({}, row), {
          columns: keepFullWidth
        });
      })
    });
  });
  var noEmpty = removeEmptyLayout(finalLayouts);
  return noEmpty;
};

export { removeItemFromSource };
