import { ILayoutSection } from 'layouts-builder/interface';
import { SourceType } from 'layouts-builder/interface/internalType';
import { removeEmptyLayout } from './removeEmptylayout';

export const removeItemFromSource = (
  layouts: ILayoutSection[],
  source: SourceType,
  duplicate?: boolean,
) => {
  const finalLayouts: ILayoutSection[] = layouts.map((section) => {
    if (section.id !== source.sectionId) {
      return section;
    }

    return {
      ...section,
      rows: section.rows.map((row) => {
        if (row.id !== source.rowId) return row;

        return {
          ...row,
          columns: row.columns
            .map((col) => {
              if (col.id !== source.columnId) return col;
              return {
                ...col,
                childIds: col.childIds.filter((id) => {
                  if (!id) return true;
                  if (duplicate) return id !== 'DUPLICATE';
                  return id !== source.itemKey;
                }),
              };
            })
            .filter((col) => col.childIds.length > 0),
        };
      }),
    };
  });

  const noEmpty = removeEmptyLayout(finalLayouts);
  return noEmpty;
};
