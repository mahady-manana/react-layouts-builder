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
    next: number;
  },
) => {
  return layouts.map((section) => {
    if (section.id !== container.sectionId) return section;
    return {
      ...section,
      rows: section.rows.map((row) => {
        if (row.id !== container.rowId) return row;
        const newCols = row.columns.map((col, index) => {
          const findIndex = row.columns.findIndex(thicol => thicol.id === cols.colId)
          const makeItGrid =
            row.columns.length % 2 === 0
              ? gridValue(5, cols.width)
              : cols.width;
            
            console.log("makeItGrid", makeItGrid);
            
          if (!makeItGrid) return col;
          if (col.id === cols.colId) {
            return {
              ...col,
              width: Math.round(makeItGrid),
            };
          }
          
          if (index === findIndex + 1) {
            return {
              ...col,
              width: Math.round(cols.next),
            };
          }

          return col
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
