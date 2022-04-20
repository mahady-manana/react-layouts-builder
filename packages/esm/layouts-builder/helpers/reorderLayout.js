import { __assign } from '../../node_modules/tslib/tslib.es6.js';
import { DropTargetPlaceEnum } from '../interface/internalType.js';
import { addItemToColumn } from './addItemToColumn.js';
import { addToNewRow } from './addToNewRow.js';
import { removeEmptyLayout } from './removeEmptylayout.js';
import { removeItemFromSource } from './removeItemFromSource.js';
import { reorderRow } from './reorderRow.js';

var reorderLayoutItem = function reorderLayoutItem(layouts, source, dest, place) {
  if (source.isSection && (place === DropTargetPlaceEnum.SECTION_BOTTOM || place === DropTargetPlaceEnum.SECTION_TOP)) {
    var finalLayouts_1 = reorderRow(layouts, source, dest, place);
    var removeOldItem_1 = finalLayouts_1.map(function (layout) {
      return __assign(__assign({}, layout), {
        columns: layout.columns.map(function (cols, index) {
          if (index === source.columnIndex) {
            return removeItemFromSource(cols, source.columnId, source.itemKey);
          }

          return cols;
        })
      });
    });
    return removeEmptyLayout(removeOldItem_1);
  }

  if (place === DropTargetPlaceEnum.SECTION_BOTTOM || place === DropTargetPlaceEnum.SECTION_TOP) {
    var removeOldItem_2 = layouts.map(function (layout) {
      if (layout.id === source.sectionId) {
        return __assign(__assign({}, layout), {
          columns: layout.columns.map(function (cols, index) {
            if (index === source.columnIndex) {
              return removeItemFromSource(cols, source.columnId, source.itemKey);
            }

            return cols;
          })
        });
      }

      return layout;
    });
    var finalLayouts_2 = addToNewRow(removeOldItem_2, source, dest, place);
    return removeEmptyLayout(finalLayouts_2);
  }

  if (source.isSection) {
    return layouts;
  }

  var finalLayouts = layouts.map(function (section) {
    if (section.id !== dest.sectionId) return section;
    var newCols = section.columns[dest.columnIndex];
    if (!newCols) return section;

    var sectionModified = __assign(__assign({}, section), {
      columns: section.columns.map(function (cols, index) {
        if (index === dest.columnIndex) {
          var add = addItemToColumn(cols, source, dest, place);
          return removeItemFromSource(add, source.columnId, source.itemKey);
        }

        return cols;
      })
    });

    return sectionModified;
  });
  var removeOldItem = finalLayouts.map(function (layout) {
    if (layout.id === source.sectionId) {
      return __assign(__assign({}, layout), {
        columns: layout.columns.map(function (cols, index) {
          console.log(source);

          if (index === source.columnIndex) {
            return removeItemFromSource(cols, source.columnId, source.itemKey);
          }

          return cols;
        })
      });
    }

    return layout;
  });
  return removeEmptyLayout(removeOldItem);
};

export { reorderLayoutItem };
