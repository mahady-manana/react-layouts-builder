import { ILayoutRow } from 'layouts-builder/interface';
import { v4 as uuidv4 } from 'uuid';
import { createNewColumn } from './createNewColumn';

export const createNewRow = (
  itemkey?: any[],
  iscontianer?: boolean,
): ILayoutRow => {
  const newColumn = createNewColumn(itemkey);
  return {
    id: uuidv4(),
    width: 'auto' as any,
    order: 0,
    className: '',
    columns: [newColumn],
    isContainer: iscontianer,
  };
};
