import { __assign, __spreadArray } from '../../node_modules/tslib/tslib.es6.js';
import { createLayoutBlock } from '../helpers/create.js';
import { createContainer } from './createContainer.js';

var createBlock = function createBlock(options) {
  if (!options) {
    throw new Error('createBlock(options: CreateBlockOptions): No options was found');
  }

  if (!options.layouts || !options.block) {
    throw new Error('createBlock(options: CreateBlockOptions): Missing options: layouts and block  are required');
  }

  var layouts = options.layouts,
      block = options.block,
      targetedBlockId = options.targetedBlockId;

  if (!targetedBlockId) {
    return createContainer({
      layouts: layouts,
      block: block
    });
  }

  return layouts.map(function (layout) {
    var _a;

    return __assign(__assign({}, layout), {
      children: (_a = layout.children) === null || _a === void 0 ? void 0 : _a.map(function (child) {
        var _a;

        return __assign(__assign({}, child), {
          children: (_a = child.children) === null || _a === void 0 ? void 0 : _a.reduce(function (acc, next) {
            var _a;

            if (((_a = next === null || next === void 0 ? void 0 : next.block) === null || _a === void 0 ? void 0 : _a.id) === targetedBlockId) {
              return __spreadArray(__spreadArray([], acc, true), [next, createLayoutBlock(block)], false);
            }

            return acc.concat(next);
          }, [])
        });
      })
    });
  });
};

export { createBlock };
