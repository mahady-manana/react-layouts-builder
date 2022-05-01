import { createNewColumn } from './createNewColumn.js';
import v4 from '../../node_modules/uuid/dist/esm-browser/v4.js';

var createNewRow = function createNewRow(itemkey, iscontianer) {
  var newColumn = createNewColumn(itemkey);
  return {
    id: v4(),
    width: 'auto',
    order: 0,
    className: '',
    columns: [newColumn],
    isContainer: iscontianer
  };
};

export { createNewRow };
