import { ILayoutSection } from 'layouts-builder/interface';
import { removeEmptyLayout } from './removeEmptylayout';

export const checkNotFoundData = (
  layouts: ILayoutSection[],
  data: any[],
  key: string,
) => {
  let hasNotFound: boolean = false;
  const noNotFoundChild: ILayoutSection[] = layouts.map((section) => {
    return {
      ...section,
      rows: section.rows.map((row) => {
        return {
          ...row,
          columns: row.columns.map((col) => {
            return {
              ...col,
              childIds: col.childIds.map((id) => {
                const isFound = data.find(
                  (dt) => dt[key]?.toString() === id.toString(),
                );
                if (isFound) {
                  return id;
                }
                hasNotFound = true;
                return '';
              }),
            };
          }),
        };
      }),
    };
  });

  const cleanLayouts = removeEmptyLayout(noNotFoundChild);

  if (hasNotFound) {
    return {
      layouts: cleanLayouts,
      update: true,
    };
  }
  return {
    layouts: cleanLayouts,
    update: false,
  };
};
