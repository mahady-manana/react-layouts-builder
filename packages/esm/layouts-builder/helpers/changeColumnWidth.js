import { __assign } from '../../node_modules/tslib/tslib.es6.js';
import { keepRowFullWidth } from './keepRowFullWidth.js';
import { removeEmptyLayout } from './removeEmptylayout.js';

var addClassColmun = function addClassColmun(column, columnId, width, sibling) {
  var newColumns = column.map(function (col) {
    var _a;

    if (col.id === columnId) {
      return __assign(__assign({}, col), {
        width: width
      });
    }

    return __assign(__assign({}, col), {
      width: ((_a = sibling.find(function (sib) {
        return sib.colId === col.id;
      })) === null || _a === void 0 ? void 0 : _a.width) || col.width
    });
  });
  var checkedWidth = keepRowFullWidth(newColumns);
  return checkedWidth;
};

var changeColumnWidth = function changeColumnWidth(layouts, columnId, width, sibling) {
  var finalLayouts = layouts.map(function (section) {
    if (!section.columns.find(function (cl) {
      return cl.id === columnId;
    })) return section;

    var sectionModified = __assign(__assign({}, section), {
      columns: addClassColmun(section.columns, columnId, width, sibling)
    });

    return sectionModified;
  });
  return removeEmptyLayout(finalLayouts);
};

export { changeColumnWidth };
