import { __assign } from '../../node_modules/tslib/tslib.es6.js';
import { DropTargetPlaceEnum } from '../interface/internalType.js';
import { keepRowFullWidth } from './keepRowFullWidth.js';
import { removeEmptyLayout } from './removeEmptylayout.js';

var removeItemFromLayout = function removeItemFromLayout(layouts, source) {
  var layoutWithoutDraggedItem = layouts.map(function (section) {
    if (section.id !== source.sectionId) return section;

    var sectionModified = __assign(__assign({}, section), {
      columns: section.columns.map(function (col, index, columns) {
        var itemColumn = columns.find(function (column) {
          return column.childIds.find(function (child) {
            return child === source.itemKey;
          });
        });
        var hasChildren = (itemColumn === null || itemColumn === void 0 ? void 0 : itemColumn.childIds.length) === 0;
        var width = itemColumn === null || itemColumn === void 0 ? void 0 : itemColumn.width;
        var addWidth = !hasChildren && width ? Math.round(width / (columns.length - 1)) : 0;
        if (col.id !== source.columnId) return __assign(__assign({}, col), {
          width: col.width + addWidth
        });
        return __assign(__assign({}, col), {
          childIds: col.childIds.filter(function (child) {
            return child !== source.itemKey;
          }),
          width: col.width + addWidth
        });
      })
    });

    return sectionModified;
  });
  var removedEmpty = removeEmptyLayout(layoutWithoutDraggedItem);
  return removedEmpty;
};

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
  var checkedWidth = keepRowFullWidth(newCols);
  return checkedWidth;
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

var addNewSectionFromDrag = function addNewSectionFromDrag(layouts, source, dest, place) {
  var newLayouts = removeItemFromLayout(layouts, source);
  var finalLayouts = newLayouts.reduce(function (acc, section) {
    if (section.id !== dest.sectionId) {
      return acc.concat(section);
    }

    var id = new Date().getTime();
    var newSection = {
      className: '',
      id: id.toString(),
      order: 0,
      columns: [{
        childIds: [source.itemKey],
        id: id.toString(),
        order: 0,
        width: 100,
        className: '',
        styles: {}
      }]
    };
    return acc.concat(place === DropTargetPlaceEnum.SECTION_TOP ? [newSection, section] : [section, newSection]);
  }, []);
  return finalLayouts;
};
var reorderSection = function reorderSection(layouts, source, dest, place) {
  if (!source.isSection) return layouts;
  var findSection = layouts.find(function (section) {
    return section.id === source.sectionId;
  });
  if (!findSection) return layouts;
  var finalLayouts = layouts.filter(function (sect) {
    return sect.id !== source.sectionId;
  }).reduce(function (acc, section) {
    if (section.id !== dest.sectionId) {
      return acc.concat(section);
    }

    return acc.concat(place === DropTargetPlaceEnum.SECTION_TOP ? [findSection, section] : [section, findSection]);
  }, []);
  return removeEmptyLayout(finalLayouts);
};
var reorderLayoutItem = function reorderLayoutItem(layouts, source, dest, place) {
  if (source.isSection && (place === DropTargetPlaceEnum.SECTION_BOTTOM || place === DropTargetPlaceEnum.SECTION_TOP)) {
    var finalLayouts_1 = reorderSection(layouts, source, dest, place);
    return removeEmptyLayout(finalLayouts_1);
  }

  if (place === DropTargetPlaceEnum.SECTION_BOTTOM || place === DropTargetPlaceEnum.SECTION_TOP) {
    var finalLayouts_2 = addNewSectionFromDrag(layouts, source, dest, place);
    return removeEmptyLayout(finalLayouts_2);
  }

  if (source.isSection) {
    return layouts;
  }

  var newLayouts = removeItemFromLayout(layouts, source);
  var finalLayouts = newLayouts.map(function (section) {
    if (section.id !== dest.sectionId) return section;

    var sectionModified = __assign(__assign({}, section), {
      columns: addItemToColumn(section.columns, source, dest, place)
    });

    return sectionModified;
  });
  return removeEmptyLayout(finalLayouts);
};

export { addNewSectionFromDrag, removeItemFromLayout, reorderLayoutItem, reorderSection };
