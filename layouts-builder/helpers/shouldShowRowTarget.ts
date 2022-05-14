import {
  IRenderableLayout,
  IRenderableRow,
} from 'layouts-builder/interface/renderableInterface';

interface Options {
  rows: IRenderableRow[];
  rowIndex: number;
  sectionIndex: number;
}
export const needRowTarget = (
  layouts: IRenderableLayout[],
  currentRow: IRenderableRow,
  { rows, rowIndex, sectionIndex }: Options,
) => {
  // check row length

  const needIT = currentRow.columns.length > 1;

  const topSiblingRow = rows[rowIndex - 1];
  const bottomSiblingRow = rows[rowIndex + 1];

  const topSectionRows = layouts[sectionIndex - 1]?.rows || [];
  const bottomSectionRows = layouts[sectionIndex + 1]?.rows || [];

  const topRow =
    topSiblingRow || topSectionRows[topSectionRows.length - 1];
  const bottomRow = bottomSiblingRow || bottomSectionRows[0];

  const topOk = topRow ? topRow.columns.length > 1 : needIT;
  const bottomOk = bottomRow ? bottomRow.columns.length > 1 : needIT;

  return {
    top: topOk,
    bottom: bottomOk,
  };
};
