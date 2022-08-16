import { __assign } from '../../node_modules/tslib/tslib.es6.js';
import { removeEmptyLayout } from './removeEmptylayout.js';

var checkNotFoundData = function checkNotFoundData(layouts, data, key) {
  var hasNotFound = false;
  var noNotFoundChild = layouts.map(function (section) {
    return __assign(__assign({}, section), {
      rows: section.rows.map(function (row) {
        return __assign(__assign({}, row), {
          columns: row.columns.map(function (col) {
            return __assign(__assign({}, col), {
              childIds: col.childIds.map(function (id) {
                var isFound = data.find(function (dt) {
                  var _a;

                  return ((_a = dt[key]) === null || _a === void 0 ? void 0 : _a.toString()) === id.toString();
                });

                if (isFound) {
                  return id;
                }

                hasNotFound = true;
                return '';
              })
            });
          })
        });
      })
    });
  });
  var cleanLayouts = removeEmptyLayout(noNotFoundChild);

  if (hasNotFound) {
    return {
      layouts: cleanLayouts,
      update: true
    };
  }

  return {
    layouts: cleanLayouts,
    update: false
  };
};

export { checkNotFoundData };
