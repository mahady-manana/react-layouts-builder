import { __assign } from '../../node_modules/tslib/tslib.es6.js';

var changeRowWidth = function changeRowWidth(layouts, inputs) {
  return layouts.map(function (section) {
    if (section.id !== inputs.sectionId) return section;
    return __assign(__assign({}, section), {
      rows: section.rows.map(function (row) {
        if (row.id !== inputs.rowId) return row;
        return __assign(__assign({}, row), {
          width: inputs.width
        });
      })
    });
  });
};

export { changeRowWidth };
