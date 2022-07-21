import { IRenderableColumn, IRenderableLayout } from 'layouts-builder/interface/renderableInterface';

export const useContainerIdentifier = () => {
  const isSectionContainer = (section: IRenderableLayout) => {
    if (section.container) {
      return true;
    }
    return section.rows.every((row) => row.columns.length > 1);
  };
  const isColumnContainer = (cols: IRenderableColumn) => {
    return cols.items.length > 1;
  };
  return {
    isSectionContainer,
    isColumnContainer,
  };
};
