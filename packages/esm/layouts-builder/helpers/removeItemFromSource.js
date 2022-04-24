import { __assign } from '../../node_modules/tslib/tslib.es6.js';

var removeItemFromSource = function removeItemFromSource(layouts, source, duplicate) {
  var finalLayouts = layouts.map(function (section) {
    if (section.id !== source.sectionId) {
      return section;
    }

    return __assign(__assign({}, section), {
      rows: section.rows.map(function (row) {
        if (row.id !== source.rowId) return row;
        return __assign(__assign({}, row), {
          columns: row.columns.map(function (col) {
            if (col.id !== source.columnId) return col;
            return __assign(__assign({}, col), {
              childIds: col.childIds.filter(function (id) {
                if (!id) return true;
                if (duplicate) return id !== 'DUPLICATE';
                return id !== source.itemKey;
              })
            });
          }).filter(function (col) {
            return col.childIds.length > 0;
          })
        });
      })
    });
  });
  return finalLayouts;
};

export { removeItemFromSource };