import { __assign } from '../../node_modules/tslib/tslib.es6.js';

var addToItem = function addToItem(layouts, itemKey, dest, bottom) {
  var add = layouts.map(function (layout) {
    if (layout.id !== dest.sectionId) return layout;
    return __assign(__assign({}, layout), {
      rows: layout.rows.map(function (row) {
        if (row.id !== dest.rowId) return row;
        return __assign(__assign({}, row), {
          columns: row.columns.map(function (col) {
            if (col.id !== dest.columnId) {
              return col;
            }

            return __assign(__assign({}, col), {
              childIds: col.childIds.reduce(function (acc, next) {
                if (next.toString() === dest.itemKey.toString()) {
                  if (bottom) return acc.concat(next, itemKey);
                  return acc.concat(itemKey, next);
                }

                return acc.concat(next);
              }, [])
            });
          })
        });
      })
    });
  });
  return add;
};

export { addToItem };
