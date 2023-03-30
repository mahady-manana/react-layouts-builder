import { EnumBlockType } from '../interfaces/types.js';
import v4 from '../../node_modules/uuid/dist/esm-browser/v4.js';

var createLayoutContainer = function createLayoutContainer(block) {
  return {
    id: v4(),
    type: EnumBlockType.CONTAINER,
    children: [{
      id: v4(),
      type: EnumBlockType.CHILDREN,
      children: [{
        id: v4(),
        type: EnumBlockType.BLOCK,
        block: block
      }]
    }]
  };
};
var createLayoutBlock = function createLayoutBlock(block) {
  return {
    id: v4(),
    type: EnumBlockType.BLOCK,
    block: block
  };
};

export { createLayoutBlock, createLayoutContainer };
