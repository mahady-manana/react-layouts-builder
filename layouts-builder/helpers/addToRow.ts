import { ILayoutSection } from 'layouts-builder/interface';
import { createNewRow } from './createNewRow';

export const addToRow = (
  layouts: ILayoutSection[],
  sectionId: any,
  itemId: any,
) => {
  const newLayouts = layouts.map((section) => {
    if (section.id !== sectionId) {
      return section;
    }

    const row = createNewRow([itemId]);

    return {
      ...section,
      rows: section.rows.concat(row),
    };
  }, [] as ILayoutSection[]);

  return newLayouts;
};
