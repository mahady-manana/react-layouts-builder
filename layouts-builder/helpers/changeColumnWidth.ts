import { ILayoutSection } from 'layouts-builder/interface';

export const changeColumnWidth = (
  layouts: ILayoutSection[],
  container: {
    rowId: any;
    sectionId: any;
  },
  cols: {
    width: any;
    colId: any;
  }[],
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
            return {
              ...col,
              width:
                cols.find((cl) => cl.colId === col.id)?.width ||
                col.width,
            };
          }),
        };
      }),
    };
  });
};
