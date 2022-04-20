import { ILayoutColumn } from 'layouts-builder/interface';

export const removeItemFromSource = (
  columns: ILayoutColumn[],
  columnId: any,
  itemKey: any,
) => {
  return columns.map((col) => {
    console.log('WILL FOUND', col, columnId, itemKey);

    if (col.id !== columnId) return col;
    console.log('Found');

    const items = col.childIds.filter((key) => key !== itemKey);
    return {
      ...col,
      childIds: items,
    };
  });
};
