import { ILayoutSection } from 'layouts-builder/interface';
import { gridValue } from './gridValue';

export const changeColumnWidth = (
  layouts: ILayoutSection[],
  container: {
    rowId: any;
    sectionId: any;
  },
  cols: {
    width: number;
    colId: any;
  },
) => {
  return layouts.map((section) => {
    if (section.id !== container.sectionId) return section;
    return {
      ...section,
      rows: section.rows.map((row) => {
        if (row.id !== container.rowId) return row;
        return {
          ...row,
          columns: row.columns.map((col) => {
            const makeItGrid =
              row.columns.length % 2 === 0
                ? gridValue(10, cols.width)
                : cols.width;
            if (!makeItGrid) return col;
            if (col.id === cols.colId) {
              return {
                ...col,
                width: makeItGrid,
              };
            }
            const rest =
              (100 - makeItGrid) / (row.columns.length - 1);
            console.log('rest', rest);

            return { ...col, width: Math.round(rest) };
          }),
        };
      }),
    };
  });
};
