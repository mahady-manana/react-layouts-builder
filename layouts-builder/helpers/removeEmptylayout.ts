import { ILayoutSection } from '../interface';

export const removeEmptyLayout = (
  layouts: ILayoutSection[],
): ILayoutSection[] => {
  const noEmptyChild = layouts.map((section) => {
    return {
      ...section,
      rows: section.rows.map((row) => {
        return {
          ...row,
          columns: row.columns.map((col) => {
            return {
              ...col,
              childIds: col.childIds.filter((id) => id),
            };
          }),
        };
      }),
    };
  });
  const noEmptyColumn = noEmptyChild.map((section) => {
    return {
      ...section,
      rows: section.rows.map((row) => {
        return {
          ...row,
          columns: row.columns.filter(
            (col) => col.childIds.length > 0,
          ),
        };
      }),
    };
  });

  const noEmptyRow = noEmptyColumn.map((section) => {
    return {
      ...section,
      rows: section.rows.filter((row) => row.columns.length > 0),
    };
  });

  const noEmptySection = noEmptyRow.filter(
    (section) => section.rows.length > 0,
  );
  return noEmptySection;
};
