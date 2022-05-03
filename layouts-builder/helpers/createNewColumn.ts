import { ILayoutColumn } from 'layouts-builder/interface';
import { v4 as uuidv4 } from 'uuid';

export const createNewColumn = (itemKey?: any[]): ILayoutColumn => {
  return {
    id: uuidv4(),
    order: 0,
    width: 100,
    className: '',
    childIds: itemKey || ['EMPTY_SECTION'],
  };
};
