import { ILayoutSection } from 'layouts-builder/interface';
import { DestinationType } from 'layouts-builder/interface/internalType';

export const addToItem = (
  layouts: ILayoutSection[],
  itemKey: any,
  dest: Omit<DestinationType, 'place'>,
  bottom?: boolean,
) => {
  const add: ILayoutSection[] = layouts.map((layout) => {
    if (layout.id !== dest.sectionId) return layout;
    return {
      ...layout,
      rows: layout.rows.map((row) => {
        if (row.id !== dest.rowId) return row;
        return {
          ...row,
          columns: row.columns.map((col) => {
            if (col.id !== dest.columnId) {
              return col;
            }
            return {
              ...col,
              childIds: col.childIds.reduce((acc, next) => {
                if (next.toString() === dest.itemKey.toString()) {
                  if (bottom) return acc.concat(next, itemKey);
                  return acc.concat(itemKey, next);
                }
                return acc.concat(next);
              }, [] as any[]),
            };
          }),
        };
      }),
    };
  });

  return add;
};
