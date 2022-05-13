import { ILayoutSection } from 'layouts-builder/interface';
import {
  SourceType,
  DestinationType,
  TargetPlaceEnum,
  ILayoutTargetEnum,
} from 'layouts-builder/interface/internalType';
import { addToColumn } from './addToNewColumn';
import { addToNewRow } from './addToNewRow';
import { removeEmptyLayout } from './removeEmptylayout';

const reorderLayoutItem = (
  layouts: ILayoutSection[],
  source: SourceType,
  dest: DestinationType,
  place: TargetPlaceEnum,
  target: ILayoutTargetEnum,
) => {
  switch (target) {
    case ILayoutTargetEnum.ROW:
      return addToNewRow(layouts, source, dest, place);

    case ILayoutTargetEnum.COL:
      return addToColumn(layouts, source, dest, place);
    case ILayoutTargetEnum.ITEM:
      return addToColumn(layouts, source, dest, place);
    default:
      break;
  }
};
export const reorderLayout = (
  layouts: ILayoutSection[],
  source: SourceType,
  dest: DestinationType,
  place: TargetPlaceEnum,
  target: ILayoutTargetEnum,
) => {
  // Do not run reorder if place doesnt change
  if (source.itemKey === dest.itemKey) return layouts;

  const ordered = reorderLayoutItem(
    layouts,
    source,
    dest,
    place,
    target,
  );

  if (ordered) {
    const removeEmpty = removeEmptyLayout(ordered);

    return removeEmpty;
  }
  return layouts;
};
