import {
  ILayoutColumn,
  ILayoutSection,
} from 'layouts-builder/interface';
import {
  SourceType,
  DestinationType,
  DropTargetPlaceEnum,
} from 'layouts-builder/interface/internalType';
import { createNewColumn } from './createNewColumn';
import { removeItemFromSource } from './removeItemFromSource';

const addToNewColumn = (
  targetColumn: ILayoutColumn[],
  targetColumnId: string,
  sourceItemKey: string,
  place: DropTargetPlaceEnum,
) => {
  const newCols = targetColumn.reduce((acc, next) => {
    const virtualLength =
      targetColumn.length > 1 ? targetColumn.length : 1;
    const newWidth = Math.round(100 / virtualLength);
    const shouldRemoveFromRestWidth = Math.round(
      newWidth / (targetColumn.length + 1),
    );
    if (next.id !== targetColumnId) {
      return acc.concat({
        ...next,
        width: next.width - shouldRemoveFromRestWidth,
      });
    }
    const newCol: ILayoutColumn = createNewColumn(
      sourceItemKey ? [sourceItemKey] : undefined,
    );
    const current = {
      ...next,
      width: next.width - shouldRemoveFromRestWidth,
    };
    const reorder =
      place === DropTargetPlaceEnum.LEFT
        ? [newCol, current]
        : [current, newCol];
    return acc.concat(reorder);
  }, [] as ILayoutColumn[]);
  return newCols;
};

const addToColmunElement = (
  targetColumn: ILayoutColumn[],
  targetColumnId: string,
  sourceColumnId: any,
  sourceItemKey: string,
  targetItemKey: any,
  targetPlace: DropTargetPlaceEnum,
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
            case DropTargetPlaceEnum.TOP:
              return acc.concat([sourceItemKey, next]);

            case DropTargetPlaceEnum.BOTTOM:
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

  return newColumns;
};

export const addItemToColumn = (
  column: ILayoutColumn[],
  source: SourceType,
  dest: DestinationType,
  place: DropTargetPlaceEnum,
) => {
  switch (place) {
    case DropTargetPlaceEnum.LEFT:
      return addToNewColumn(
        column,
        dest.columnId,
        source.itemKey,
        DropTargetPlaceEnum.LEFT,
      );

    case DropTargetPlaceEnum.RIGHT:
      return addToNewColumn(
        column,
        dest.columnId,
        source.itemKey,
        DropTargetPlaceEnum.RIGHT,
      );
    case DropTargetPlaceEnum.TOP:
      return addToColmunElement(
        column,
        dest.columnId,
        source.columnId,
        source.itemKey,
        dest.itemKey,
        place,
      );
    case DropTargetPlaceEnum.BOTTOM:
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
  place: DropTargetPlaceEnum,
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
      (place === DropTargetPlaceEnum.BOTTOM ||
        place === DropTargetPlaceEnum.TOP),
  );
  return clean;
};
