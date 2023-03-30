import { __spreadArray, __assign } from '../../node_modules/tslib/tslib.es6.js';
import { EnumBlockType } from '../interfaces/types.js';
import { addChildren, addBlockToChildren, addBlockItem } from './addHelpers.js';
import { removeItemFirstChildren, removeBlockLayout } from './removeHelpers.js';

var moveContainer = function moveContainer(data, options) {
  if (!options.item.id || !options.targetItemId) return data;
  var newData = data.reduce(function (acc, next) {
    if (next.id === options.item.id) {
      return acc;
    }

    if (next.id === options.targetItemId) {
      if (options.position === "top") {
        return __spreadArray(__spreadArray([], acc, true), [options.item, next], false);
      }

      return __spreadArray(__spreadArray([], acc, true), [next, options.item], false);
    }

    return acc.concat(next);
  }, []);
  return removeEmptyLayouts(newData);
};
var moveChildren = function moveChildren(data, options) {
  if (!options.item.id || !options.targetItemId) return data;
  var item = options.item,
      targetItemId = options.targetItemId,
      position = options.position;
  var removedItem = removeItemFirstChildren(data, item.id);
  var addToTarget = addChildren(removedItem, item, targetItemId, position);
  return removeEmptyLayouts(addToTarget);
};
var moveBlock = function moveBlock(data, options) {
  if (!options.item.id || !options.targetItemId) return data;
  var item = options.item,
      targetItemId = options.targetItemId,
      position = options.position;
  var removedItem = removeBlockLayout(data, item.id);

  if (options.targetType === EnumBlockType.CHILDREN) {
    var newData = addBlockToChildren(removedItem, options.item, options);
    return removeEmptyLayouts(newData);
  }

  var addToTarget = addBlockItem(removedItem, item, targetItemId, position);
  return removeEmptyLayouts(addToTarget);
};
function removeEmptyLayouts(layouts) {
  return layouts.map(function (layout) {
    if (!layout.children || layout.children.length === 0) {
      if (!layout.block) {
        // layout is empty, return undefined to remove it
        return undefined;
      } else {
        // layout has a block, keep it
        return layout;
      }
    } else {
      // recursively check children
      var newChildren = removeEmptyLayouts(layout.children).filter(function (child) {
        return child !== undefined;
      });

      if (newChildren.length === 0 && !layout.block) {
        // all children were empty, and layout has no block, return undefined to remove it
        return undefined;
      } else {
        // keep layout with non-empty children (and possibly block)
        return __assign(__assign({}, layout), {
          children: newChildren
        });
      }
    }
  }).filter(function (layout) {
    return layout !== undefined;
  });
}

export { moveBlock, moveChildren, moveContainer, removeEmptyLayouts };
