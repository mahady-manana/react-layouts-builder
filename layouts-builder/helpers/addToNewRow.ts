import {
  ILayoutColumn,
  ILayoutRow,
  ILayoutSection,
} from 'layouts-builder/interface';
import {
  DestinationType,
  DropTargetPlaceEnum,
  SourceType,
} from 'layouts-builder/interface/internalType';
import { createNewRow } from './createNewRow';
import { removeItemFromSource } from './removeItemFromSource';

export const addToNewRow = (
  layouts: ILayoutSection[],
  source: SourceType,
  dest: DestinationType,
  place: DropTargetPlaceEnum,
) => {
  const newLayouts = layouts.map((section) => {
    if (section.id !== dest.sectionId) {
      return section;
    }

    const row = createNewRow([source.itemKey]);

    return {
      ...section,
      rows: section.rows.reduce((acc, nextRow) => {
        if (nextRow.id !== dest.rowId) return acc.concat(nextRow);

        if (place === DropTargetPlaceEnum.ROW_BOTTOM) {
          return acc.concat([nextRow, row]);
        }

        return acc.concat([row, nextRow]);
      }, [] as ILayoutRow[]),
    };
  }, [] as ILayoutSection[]);

  const clean = removeItemFromSource(newLayouts, source);
  return clean;
};
