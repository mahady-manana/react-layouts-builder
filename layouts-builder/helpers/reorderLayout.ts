import { ILayoutSection, ILayoutColumn } from '../interface';
import {
  DestinationType,
  DropTargetPlaceEnum,
  SourceType,
} from '../interface/internalType';
import { keepRowFullWidth } from './keepRowFullWidth';
import { removeEmptyLayout } from './removeEmptylayout';

export const removeItemFromLayout = (
  layouts: ILayoutSection[],
  source: SourceType,
) => {
  const layoutWithoutDraggedItem = layouts.map((section) => {
    if (section.id !== source.sectionId) return section;
    const sectionModified = {
      ...section,
      columns: section.columns.map((col, index, columns) => {
        const itemColumn = columns.find((column) => {
          return column.childIds.find(
            (child) => child === source.itemKey,
          );
        });
        const hasChildren = itemColumn?.childIds.length === 0;
        const width = itemColumn?.width;

        const addWidth =
          !hasChildren && width
            ? Math.round(width / (columns.length - 1))
            : 0;

        if (col.id !== source.columnId)
          return {
            ...col,
            width: col.width + addWidth,
          };
        return {
          ...col,
          childIds: col.childIds.filter(
            (child) => child !== source.itemKey,
          ),
          width: col.width + addWidth,
        };
      }),
    };
    return sectionModified;
  });
  const removedEmpty = removeEmptyLayout(layoutWithoutDraggedItem);
  return removedEmpty;
};
export const removeSectionFromLayout = (
  layouts: ILayoutSection[],
  source: SourceType,
) => {
  const layoutWithoutDraggedItem = layouts.filter(
    (section) => section.id !== source.sectionId,
  );
  return layoutWithoutDraggedItem;
};

const addToNewColumn = (
  targetColumn: ILayoutColumn[],
  targetColumnId: string,
  sourceItemKey: string,
  place: DropTargetPlaceEnum,
) => {
  const newCols = targetColumn.reduce((acc, next) => {
    const virtualLength =
      targetColumn.length > 1 ? targetColumn.length : 1;
    const newWidth = Math.round(100 / virtualLength);
    const shouldRemoveFromRestWidth = Math.round(
      newWidth / (targetColumn.length + 1),
    );
    if (next.id !== targetColumnId) {
      return acc.concat({
        ...next,
        width: next.width - shouldRemoveFromRestWidth,
      });
    }
    const newCol: ILayoutColumn = {
      childIds: [sourceItemKey],
      id: new Date().getTime().toString(),
      order: 999,
      className: 'w-full',
      width: newWidth - shouldRemoveFromRestWidth,
    };
    const current = {
      ...next,
      width: next.width - shouldRemoveFromRestWidth,
    };
    const reorder =
      place === DropTargetPlaceEnum.LEFT
        ? [newCol, current]
        : [current, newCol];
    return acc.concat(reorder);
  }, [] as ILayoutColumn[]);
  const checkedWidth = keepRowFullWidth(newCols);

  return checkedWidth;
};

const addToColmunElementToTop = (
  targetColumn: ILayoutColumn[],
  targetColumnId: string,
  sourceItemKey: string,
  targetItemKey: any,
) => {
  const newColumns = targetColumn.map((col) => {
    if (col.id !== targetColumnId) {
      return col;
    }
    const newColItems = col.childIds.reduce((acc, next) => {
      if (next !== targetItemKey) {
        return acc.concat(next);
      }

      return acc.concat([sourceItemKey, next]);
    }, [] as (string | number)[]);
    const newCol = {
      ...col,
      childIds: newColItems,
    };

    return newCol;
  }, [] as ILayoutColumn[]);
  return newColumns;
};
const addToColmunElementToBottom = (
  targetColumn: ILayoutColumn[],
  targetColumnId: string,
  sourceItemKey: string,
  targetItemKey: any,
) => {
  const newColumns = targetColumn.map((col) => {
    if (col.id !== targetColumnId) {
      return col;
    }

    const newColItems = col.childIds.reduce((acc, next) => {
      if (next !== targetItemKey) {
        return acc.concat(next);
      }

      return acc.concat([next, sourceItemKey]);
    }, [] as (string | number)[]);
    const newCol = {
      ...col,
      childIds: newColItems,
    };

    return newCol;
  }, [] as ILayoutColumn[]);

  return newColumns;
};

const addItemToColumn = (
  column: ILayoutColumn[],
  source: SourceType,
  dest: DestinationType,
  place: DropTargetPlaceEnum,
) => {
  if (place === DropTargetPlaceEnum.LEFT) {
    return addToNewColumn(
      column,
      dest.columnId,
      source.itemKey,
      DropTargetPlaceEnum.LEFT,
    );
  }
  if (place === DropTargetPlaceEnum.RIGHT) {
    return addToNewColumn(
      column,
      dest.columnId,
      source.itemKey,
      DropTargetPlaceEnum.RIGHT,
    );
  }
  if (place === DropTargetPlaceEnum.TOP) {
    return addToColmunElementToTop(
      column,
      dest.columnId,
      source.itemKey,
      dest.itemKey,
    );
  }
  if (place === DropTargetPlaceEnum.BOTTOM) {
    return addToColmunElementToBottom(
      column,
      dest.columnId,
      source.itemKey,
      dest.itemKey,
    );
  }
  return column;
};

export const addNewSectionFromDrag = (
  layouts: ILayoutSection[],
  source: SourceType,
  dest: DestinationType,
  place: DropTargetPlaceEnum,
) => {
  const newLayouts = removeItemFromLayout(layouts, source);
  const finalLayouts = newLayouts.reduce((acc, section) => {
    if (section.id !== dest.sectionId) {
      return acc.concat(section);
    }
    const id = new Date().getTime();
    const newSection: ILayoutSection = {
      className: '',
      id: id.toString(),
      order: 0,
      columns: [
        {
          childIds: [source.itemKey],
          id: id.toString(),
          order: 0,
          width: 100,
          className: '',
          styles: {},
        },
      ],
    };
    return acc.concat(
      place === DropTargetPlaceEnum.SECTION_TOP
        ? [newSection, section]
        : [section, newSection],
    );
  }, [] as ILayoutSection[]);
  return finalLayouts;
};

export const reorderSection = (
  layouts: ILayoutSection[],
  source: SourceType,
  dest: DestinationType,
  place: DropTargetPlaceEnum,
) => {
  if (!source.isSection) return layouts;
  const findSection = layouts.find(
    (section) => section.id === source.sectionId,
  );
  if (!findSection) return layouts;
  const finalLayouts = layouts
    .filter((sect) => sect.id !== source.sectionId)
    .reduce((acc, section) => {
      if (section.id !== dest.sectionId) {
        return acc.concat(section);
      }

      return acc.concat(
        place === DropTargetPlaceEnum.SECTION_TOP
          ? [findSection, section]
          : [section, findSection],
      );
    }, [] as ILayoutSection[]);
  return removeEmptyLayout(finalLayouts);
};

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
    const finalLayouts = reorderSection(layouts, source, dest, place);
    return removeEmptyLayout(finalLayouts);
  }
  if (
    place === DropTargetPlaceEnum.SECTION_BOTTOM ||
    place === DropTargetPlaceEnum.SECTION_TOP
  ) {
    const finalLayouts = addNewSectionFromDrag(
      layouts,
      source,
      dest,
      place,
    );
    return removeEmptyLayout(finalLayouts);
  }
  if (source.isSection) {
    return layouts;
  }
  const newLayouts = removeItemFromLayout(layouts, source);
  const finalLayouts = newLayouts.map((section) => {
    if (section.id !== dest.sectionId) return section;
    const sectionModified = {
      ...section,
      columns: addItemToColumn(section.columns, source, dest, place),
    };
    return sectionModified;
  });
  return removeEmptyLayout(finalLayouts);
};
