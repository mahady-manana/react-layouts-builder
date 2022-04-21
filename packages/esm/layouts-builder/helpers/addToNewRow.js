import { __assign } from '../../node_modules/tslib/tslib.es6.js';
import { DropTargetPlaceEnum } from '../interface/internalType.js';
import { createNewRow } from './createNewRow.js';
import { removeItemFromSource } from './removeItemFromSource.js';

var addToNewRow = function addToNewRow(layouts, source, dest, place) {
  var newLayouts = layouts.map(function (section) {
    if (section.id !== dest.sectionId) {
      return section;
    }

    var row = createNewRow([source.itemKey]);
    return __assign(__assign({}, section), {
      rows: section.rows.reduce(function (acc, nextRow) {
        if (nextRow.id !== dest.rowId) return acc.concat(nextRow);

        if (place === DropTargetPlaceEnum.ROW_BOTTOM) {
          return acc.concat([nextRow, row]);
        }

        return acc.concat([row, nextRow]);
      }, [])
    });
  }, []);
  var clean = removeItemFromSource(newLayouts, source);
  return clean;
};

export { addToNewRow };
