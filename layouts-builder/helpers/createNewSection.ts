import { ILayoutSection } from 'layouts-builder/interface';
import { v4 as uuidv4 } from 'uuid';
import { createNewRow } from './createNewRow';

export const createNewSection = (
  itemKey?: any[],
  isContainer?: boolean,
  defaultWidth?: number | string,
): ILayoutSection => {
  const row = createNewRow(itemKey);
  return {
    id: uuidv4(),
    className: '',
    order: 0,
    backgroundColor: '',
    backgroundImage: '',
    width: defaultWidth || '100%',
    defaultWidth: defaultWidth,
    rows: [row],
    container: isContainer,
  };
};
