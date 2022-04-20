import { ILayoutColumn, ILayoutSection } from '../interface';
import { keepRowFullWidth } from './keepRowFullWidth';
import { removeEmptyLayout } from './removeEmptylayout';

const addClassColmun = (
  column: ILayoutColumn[],
  columnId: string,
  width: number,
  sibling: { colId: string; width: number }[],
) => {
  const newColumns = column.map((col) => {
    if (col.id === columnId) {
      return {
        ...col,
        width: width,
      };
    }

    return {
      ...col,
      width:
        sibling.find((sib) => sib.colId === col.id)?.width ||
        col.width,
    };
  });
  const checkedWidth = keepRowFullWidth(newColumns);
  return checkedWidth;
};

export const changeColumnWidth = (
  layouts: ILayoutSection[],
  columnId: string,
  width: number,
  sibling: { colId: string; width: number }[],
) => {
  // const finalLayouts = layouts.map((section) => {
  //   if (!section.columns.find((cl) => cl.id === columnId))
  //     return section;
  //   const sectionModified = {
  //     ...section,
  //     columns: addClassColmun(
  //       section.columns,
  //       columnId,
  //       width,
  //       sibling,
  //     ),
  //   };
  //   return sectionModified;
  // });
  // return removeEmptyLayout(finalLayouts);
  return layouts;
};
