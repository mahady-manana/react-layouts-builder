import {
  ILayoutColumn,
  ILayoutSection,
} from 'layouts-builder/interface';
import {
  SourceType,
  DestinationType,
  TargetPlaceEnum,
} from 'layouts-builder/interface/internalType';
import { createNewColumn } from './createNewColumn';
import { keepRowFullWidth } from './keepRowFullWidth';
import { removeItemFromSource } from './removeItemFromSource';

const addToNewColumn = (
  targetColumn: ILayoutColumn[],
  targetColumnId: string,
  sourceItemKey: string,
  place: TargetPlaceEnum,
) => {
  const newCols = targetColumn.reduce((acc, next) => {
    const width = 100 / (targetColumn.length + 1);
    if (next.id !== targetColumnId) {
      return acc.concat({
        ...next,
        width: width,
      });
    }
    const newCol: ILayoutColumn = createNewColumn(
      sourceItemKey ? [sourceItemKey] : undefined,
    );
    const newColAdjustWidth = {
      ...newCol,
      width: width,
    };
    const current = {
      ...next,
      width: width,
    };
    const reorder =
      place === TargetPlaceEnum.LEFT
        ? [newColAdjustWidth, current]
        : [current, newColAdjustWidth];
    return acc.concat(reorder);
  }, [] as ILayoutColumn[]);
  const keepFullWidth = keepRowFullWidth(newCols);
  return keepFullWidth;
};

const addToColmunElement = (
  targetColumn: ILayoutColumn[],
  targetColumnId: string,
  sourceColumnId: any,
  sourceItemKey: string,
  targetItemKey: any,
  targetPlace: TargetPlaceEnum,
) => {
  const newColumns = targetColumn.map((col) => {
    if (col.id !== targetColumnId) {
      return col;
    }

    const newColItems = col.childIds
      .map((k) =>
        sourceColumnId === targetColumnId && k === sourceItemKey
          ? 'DUPLICATE'
          : k,
      )
      .reduce((acc, next) => {
        if (next === targetItemKey) {
          switch (targetPlace) {
            case TargetPlaceEnum.TOP:
              return acc.concat([sourceItemKey, next]);

            case TargetPlaceEnum.BOTTOM:
              return acc.concat([next, sourceItemKey]);

            default:
              return acc.concat(next);
          }
        }

        return acc.concat(next);
      }, [] as (string | number)[]);
    const newCol = {
      ...col,
      childIds: newColItems,
    };

    return newCol;
  }, [] as ILayoutColumn[]);
  const keepFullWidth = keepRowFullWidth(newColumns);
  return keepFullWidth;
};

export const addItemToColumn = (
  column: ILayoutColumn[],
  source: SourceType,
  dest: DestinationType,
  place: TargetPlaceEnum,
) => {
  switch (place) {
    case TargetPlaceEnum.LEFT:
      return addToNewColumn(
        column,
        dest.columnId,
        source.itemKey,
        TargetPlaceEnum.LEFT,
      );

    case TargetPlaceEnum.RIGHT:
      return addToNewColumn(
        column,
        dest.columnId,
        source.itemKey,
        TargetPlaceEnum.RIGHT,
      );
    case TargetPlaceEnum.TOP:
      return addToColmunElement(
        column,
        dest.columnId,
        source.columnId,
        source.itemKey,
        dest.itemKey,
        place,
      );
    case TargetPlaceEnum.BOTTOM:
      return addToColmunElement(
        column,
        dest.columnId,
        source.columnId,
        source.itemKey,
        dest.itemKey,
        place,
      );
    default:
      break;
  }
};

export const addToColumn = (
  layouts: ILayoutSection[],
  source: SourceType,
  dest: DestinationType,
  place: TargetPlaceEnum,
) => {
  const add: ILayoutSection[] = layouts.map((layout) => {
    if (layout.id !== dest.sectionId) return layout;
    return {
      ...layout,
      rows: layout.rows.map((row) => {
        if (row.id !== dest.rowId) return row;
        return {
          ...row,
          columns:
            addItemToColumn(row.columns, source, dest, place) || [],
        };
      }),
    };
  });
  const clean = removeItemFromSource(
    add,
    source,
    source.columnId === dest.columnId &&
      (place === TargetPlaceEnum.BOTTOM ||
        place === TargetPlaceEnum.TOP),
  );
  return clean;
};
