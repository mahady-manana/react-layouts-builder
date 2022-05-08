import { ILayoutSection } from 'layouts-builder/interface';
import { gridValue } from './gridValue';
import { keepRowFullWidth } from './keepRowFullWidth';

export const changeColumnWidth = (
  layouts: ILayoutSection[],
  container: {
    rowId: any;
    sectionId: any;
  },
  cols: {
    width: number;
    colId: any;
    init: number;
  },
) => {
  return layouts.map((section) => {
    if (section.id !== container.sectionId) return section;
    return {
      ...section,
      rows: section.rows.map((row) => {
        if (row.id !== container.rowId) return row;
        const newCols = row.columns.map((col) => {
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
          const rest = cols.init - makeItGrid;
          const add = rest / (row.columns.length - 1);

          return { ...col, width: Math.round(col.width + add) };
        });

        const full =
          row.columns.length > 1
            ? keepRowFullWidth(newCols)
            : newCols;
        return {
          ...row,
          columns: full,
        };
      }),
    };
  });
};
