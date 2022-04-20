import { __assign } from '../../node_modules/tslib/tslib.es6.js';
import { DropTargetPlaceEnum } from '../interface/internalType.js';

var addToNewColumn = function addToNewColumn(targetColumn, targetColumnId, sourceItemKey, place) {
  var newCols = targetColumn.reduce(function (acc, next) {
    var virtualLength = targetColumn.length > 1 ? targetColumn.length : 1;
    var newWidth = Math.round(100 / virtualLength);
    var shouldRemoveFromRestWidth = Math.round(newWidth / (targetColumn.length + 1));

    if (next.id !== targetColumnId) {
      return acc.concat(__assign(__assign({}, next), {
        width: next.width - shouldRemoveFromRestWidth
      }));
    }

    var newCol = {
      childIds: [sourceItemKey],
      id: new Date().getTime().toString(),
      order: 999,
      className: 'w-full',
      width: newWidth - shouldRemoveFromRestWidth
    };

    var current = __assign(__assign({}, next), {
      width: next.width - shouldRemoveFromRestWidth
    });

    var reorder = place === DropTargetPlaceEnum.LEFT ? [newCol, current] : [current, newCol];
    return acc.concat(reorder);
  }, []);
  return newCols;
};

var addToColmunElementToTop = function addToColmunElementToTop(targetColumn, targetColumnId, sourceItemKey, targetItemKey) {
  var newColumns = targetColumn.map(function (col) {
    if (col.id !== targetColumnId) {
      return col;
    }

    var newColItems = col.childIds.reduce(function (acc, next) {
      if (next !== targetItemKey) {
        return acc.concat(next);
      }

      return acc.concat([sourceItemKey, next]);
    }, []);

    var newCol = __assign(__assign({}, col), {
      childIds: newColItems
    });

    return newCol;
  }, []);
  return newColumns;
};

var addToColmunElementToBottom = function addToColmunElementToBottom(targetColumn, targetColumnId, sourceItemKey, targetItemKey) {
  var newColumns = targetColumn.map(function (col) {
    if (col.id !== targetColumnId) {
      return col;
    }

    var newColItems = col.childIds.reduce(function (acc, next) {
      if (next !== targetItemKey) {
        return acc.concat(next);
      }

      return acc.concat([next, sourceItemKey]);
    }, []);

    var newCol = __assign(__assign({}, col), {
      childIds: newColItems
    });

    return newCol;
  }, []);
  return newColumns;
};

var addItemToColumn = function addItemToColumn(column, source, dest, place) {
  if (place === DropTargetPlaceEnum.LEFT) {
    return addToNewColumn(column, dest.columnId, source.itemKey, DropTargetPlaceEnum.LEFT);
  }

  if (place === DropTargetPlaceEnum.RIGHT) {
    return addToNewColumn(column, dest.columnId, source.itemKey, DropTargetPlaceEnum.RIGHT);
  }

  if (place === DropTargetPlaceEnum.TOP) {
    return addToColmunElementToTop(column, dest.columnId, source.itemKey, dest.itemKey);
  }

  if (place === DropTargetPlaceEnum.BOTTOM) {
    return addToColmunElementToBottom(column, dest.columnId, source.itemKey, dest.itemKey);
  }

  return column;
};

export { addItemToColumn };
