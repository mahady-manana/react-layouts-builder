import { __assign } from '../../node_modules/tslib/tslib.es6.js';

var useContainerStyles = function useContainerStyles() {
  var changeSectionContainerStyles = function changeSectionContainerStyles(layouts, source, styles) {
    return layouts.map(function (layout) {
      if (layout.id === source.sectionId) {
        return __assign(__assign({}, layout), {
          styles: styles
        });
      }

      return layout;
    });
  };

  var changeColumnContainerStyles = function changeColumnContainerStyles(layouts, _a, styles) {
    var sectionId = _a.sectionId,
        rowId = _a.rowId,
        colId = _a.colId;
    return layouts.map(function (layout) {
      if (layout.id === sectionId) {
        return __assign(__assign({}, layout), {
          rows: layout.rows.map(function (row) {
            if (row.id === rowId) {
              return __assign(__assign({}, row), {
                columns: row.columns.map(function (col) {
                  if (col.id === colId) {
                    return __assign(__assign({}, col), {
                      styles: styles
                    });
                  }

                  return col;
                })
              });
            }

            return row;
          })
        });
      }

      return layout;
    });
  };

  return {
    changeSectionContainerStyles: changeSectionContainerStyles,
    changeColumnContainerStyles: changeColumnContainerStyles
  };
};

export { useContainerStyles };
