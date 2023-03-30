import { __assign, __spreadArray } from '../../node_modules/tslib/tslib.es6.js';
import { EnumBlockType, EnumPosition } from '../interfaces/types.js';
import v4 from '../../node_modules/uuid/dist/esm-browser/v4.js';

var addChildren = function addChildren(data, children, targetId, postion) {
  return data.map(function (item) {
    var _a;

    return __assign(__assign({}, item), {
      children: (_a = item.children) === null || _a === void 0 ? void 0 : _a.reduce(function (childs, nextChild) {
        if (nextChild.id === targetId) {
          if (postion === "top") {
            return __spreadArray(__spreadArray([], childs, true), [children, nextChild], false);
          }

          return __spreadArray(__spreadArray([], childs, true), [nextChild, children], false);
        }

        return childs.concat(nextChild);
      }, [])
    });
  });
};
var addBlockItem = function addBlockItem(data, block, destinationId, position) {
  return data.map(function (item) {
    var _a;

    return __assign(__assign({}, item), {
      children: (_a = item.children) === null || _a === void 0 ? void 0 : _a.map(function (it) {
        var _a;

        return __assign(__assign({}, it), {
          children: (_a = it.children) === null || _a === void 0 ? void 0 : _a.reduce(function (acc, next) {
            if (next.id.toString() === destinationId) {
              if (position === "top") {
                return __spreadArray(__spreadArray([], acc, true), [block, next], false);
              }

              return __spreadArray(__spreadArray([], acc, true), [next, block], false);
            }

            return acc.concat(next);
          }, [])
        });
      })
    });
  });
};
var addBlockToChildren = function addBlockToChildren(data, block, options) {
  var create = {
    id: v4(),
    type: EnumBlockType.CHILDREN,
    properties: {},
    children: [block]
  };
  return data.map(function (item) {
    var _a;

    return __assign(__assign({}, item), {
      children: (_a = item.children) === null || _a === void 0 ? void 0 : _a.reduce(function (childs, nextChild) {
        if (nextChild.id === options.targetItemId) {
          if (options.position === EnumPosition.LEFT) {
            return __spreadArray(__spreadArray([], childs, true), [create, nextChild], false);
          }

          return __spreadArray(__spreadArray([], childs, true), [nextChild, create], false);
        }

        return childs.concat(nextChild);
      }, [])
    });
  });
};

export { addBlockItem, addBlockToChildren, addChildren };
