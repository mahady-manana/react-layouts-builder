import { ILayoutSection } from 'layouts-builder/interface';

export const changeRowWidth = (
  layouts: ILayoutSection[],
  inputs: {
    width: number;
    rowId: any;
    sectionId: any;
  },
) => {
  return layouts.map((section) => {
    if (section.id !== inputs.sectionId) return section;
    return {
      ...section,
      rows: section.rows.map((row) => {
        if (row.id !== inputs.rowId) return row;
        return {
          ...row,
          width: inputs.width,
        };
      }),
    };
  });
};
