import { ILayoutSection } from 'layouts-builder/interface';

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
            if (col.id === cols.colId) {
              return {
                ...col,
                width: cols.width,
              };
            }
            const rest =
              (100 - cols.width) / (row.columns.length - 1);
            console.log('rest', rest);

            return { ...col, width: Math.round(rest) };
          }),
        };
      }),
    };
  });
};
