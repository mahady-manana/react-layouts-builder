import { createNewColumn } from './createNewColumn.js';
import v4 from '../../node_modules/uuid/dist/esm-browser/v4.js';

var createNewRow = function createNewRow(itemkey) {
  var newColumn = createNewColumn(itemkey);
  return {
    id: v4(),
    width: 1080,
    order: 0,
    className: '',
    columns: [newColumn]
  };
};

export { createNewRow };
