import { ILayoutSection, ILayoutColumn } from '../interface';
import {
  DestinationType,
  DropTargetPlaceEnum,
  SourceType,
} from '../interface/internalType';
import { addItemToColumn } from './addItemToColumn';
import { addToNewRow } from './addToNewRow';
import { keepRowFullWidth } from './keepRowFullWidth';
import { removeEmptyLayout } from './removeEmptylayout';
import { removeItemFromSource } from './removeItemFromSource';
import { reorderRow } from './reorderRow';
import { reorderSection } from './reorderSection';

export const reorderLayoutItem = (
  layouts: ILayoutSection[],
  source: SourceType,
  dest: DestinationType,
  place: DropTargetPlaceEnum,
) => {
  if (
    source.isSection &&
    (place === DropTargetPlaceEnum.SECTION_BOTTOM ||
      place === DropTargetPlaceEnum.SECTION_TOP)
  ) {
    const finalLayouts = reorderRow(layouts, source, dest, place);
    const removeOldItem = finalLayouts.map((layout) => ({
      ...layout,
      columns: layout.columns.map((cols, index) => {
        if (index === source.columnIndex) {
          return removeItemFromSource(
            cols,
            source.columnId,
            source.itemKey,
          );
        }
        return cols;
      }),
    }));
    return removeEmptyLayout(removeOldItem);
  }
  if (
    place === DropTargetPlaceEnum.SECTION_BOTTOM ||
    place === DropTargetPlaceEnum.SECTION_TOP
  ) {
    const removeOldItem = layouts.map((layout) => {
      if (layout.id === source.sectionId) {
        return {
          ...layout,
          columns: layout.columns.map((cols, index) => {
            if (index === source.columnIndex) {
              return removeItemFromSource(
                cols,
                source.columnId,
                source.itemKey,
              );
            }
            return cols;
          }),
        };
      }
      return layout;
    });
    const finalLayouts = addToNewRow(
      removeOldItem,
      source,
      dest,
      place,
    );
    return removeEmptyLayout(finalLayouts);
  }
  if (source.isSection) {
    return layouts;
  }
  const finalLayouts = layouts.map((section) => {
    if (section.id !== dest.sectionId) return section;
    const newCols = section.columns[dest.columnIndex];

    if (!newCols) return section;
    const sectionModified = {
      ...section,
      columns: section.columns.map((cols, index) => {
        if (index === dest.columnIndex) {
          const add = addItemToColumn(cols, source, dest, place);
          return removeItemFromSource(
            add,
            source.columnId,
            source.itemKey,
          );
        }
        return cols;
      }),
    };
    return sectionModified;
  });
  const removeOldItem = finalLayouts.map((layout) => {
    if (layout.id === source.sectionId) {
      return {
        ...layout,
        columns: layout.columns.map((cols, index) => {
          console.log(source);
          if (index === source.columnIndex) {
            return removeItemFromSource(
              cols,
              source.columnId,
              source.itemKey,
            );
          }
          return cols;
        }),
      };
    }
    return layout;
  });
  return removeEmptyLayout(removeOldItem);
};
