import { createNewRow } from './createNewRow.js';
import v4 from '../../node_modules/uuid/dist/esm-browser/v4.js';

var createNewSection = function createNewSection(itemKey, isContainer, defaultWidth) {
  var row = createNewRow(itemKey);
  return {
    id: v4(),
    className: '',
    order: 0,
    backgroundColor: '',
    backgroundImage: '',
    width: defaultWidth || '100%',
    rows: [row],
    container: isContainer
  };
};

export { createNewSection };
