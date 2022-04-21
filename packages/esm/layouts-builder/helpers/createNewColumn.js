import v4 from '../../node_modules/uuid/dist/esm-browser/v4.js';

var createNewColumn = function createNewColumn(itemKey) {
  return {
    id: v4(),
    order: 0,
    width: 1080,
    className: '',
    childIds: itemKey || []
  };
};

export { createNewColumn };
