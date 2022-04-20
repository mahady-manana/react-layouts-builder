import { ILayoutColumn } from 'layouts-builder/interface';
import {
  SourceType,
  DestinationType,
  DropTargetPlaceEnum,
} from 'layouts-builder/interface/internalType';

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
    const newCol: ILayoutColumn = {
      childIds: [sourceItemKey],
      id: new Date().getTime().toString(),
      order: 999,
      className: 'w-full',
      width: newWidth - shouldRemoveFromRestWidth,
    };
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

const addToColmunElementToTop = (
  targetColumn: ILayoutColumn[],
  targetColumnId: string,
  sourceItemKey: string,
  targetItemKey: any,
) => {
  const newColumns = targetColumn.map((col) => {
    if (col.id !== targetColumnId) {
      return col;
    }
    const newColItems = col.childIds.reduce((acc, next) => {
      if (next !== targetItemKey) {
        return acc.concat(next);
      }

      return acc.concat([sourceItemKey, next]);
    }, [] as (string | number)[]);
    const newCol = {
      ...col,
      childIds: newColItems,
    };

    return newCol;
  }, [] as ILayoutColumn[]);
  return newColumns;
};
const addToColmunElementToBottom = (
  targetColumn: ILayoutColumn[],
  targetColumnId: string,
  sourceItemKey: string,
  targetItemKey: any,
) => {
  const newColumns = targetColumn.map((col) => {
    if (col.id !== targetColumnId) {
      return col;
    }

    const newColItems = col.childIds.reduce((acc, next) => {
      if (next !== targetItemKey) {
        return acc.concat(next);
      }

      return acc.concat([next, sourceItemKey]);
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
  if (place === DropTargetPlaceEnum.LEFT) {
    return addToNewColumn(
      column,
      dest.columnId,
      source.itemKey,
      DropTargetPlaceEnum.LEFT,
    );
  }
  if (place === DropTargetPlaceEnum.RIGHT) {
    return addToNewColumn(
      column,
      dest.columnId,
      source.itemKey,
      DropTargetPlaceEnum.RIGHT,
    );
  }
  if (place === DropTargetPlaceEnum.TOP) {
    return addToColmunElementToTop(
      column,
      dest.columnId,
      source.itemKey,
      dest.itemKey,
    );
  }
  if (place === DropTargetPlaceEnum.BOTTOM) {
    return addToColmunElementToBottom(
      column,
      dest.columnId,
      source.itemKey,
      dest.itemKey,
    );
  }
  return column;
};
