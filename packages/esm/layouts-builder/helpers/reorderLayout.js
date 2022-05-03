import { ILayoutTargetEnum } from '../interface/internalType.js';
import { addToColumn } from './addToNewColumn.js';
import { addToNewRow } from './addToNewRow.js';
import { removeEmptyLayout } from './removeEmptylayout.js';

var reorderLayoutItem = function reorderLayoutItem(layouts, source, dest, place, target) {
  switch (target) {
    case ILayoutTargetEnum.ROW:
      return addToNewRow(layouts, source, dest, place);

    case ILayoutTargetEnum.COL:
      return addToColumn(layouts, source, dest, place);

    case ILayoutTargetEnum.ITEM:
      return addToColumn(layouts, source, dest, place);
  }
};

var reorderLayout = function reorderLayout(layouts, source, dest, place, target) {
  // Do not run reorder if place doesnt change
  if (source.itemKey === dest.itemKey) return layouts;
  var ordered = reorderLayoutItem(layouts, source, dest, place, target);

  if (ordered) {
    var removeEmpty = removeEmptyLayout(ordered);
    return removeEmpty;
  }

  return layouts;
};

export { reorderLayout };
