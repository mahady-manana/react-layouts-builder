import {
  ContainerSource,
  ILayoutSection,
} from 'layouts-builder/interface';
import { CSSProperties } from 'react';

export const useContainerStyles = () => {
  const changeSectionContainerStyles = (
    layouts: ILayoutSection[],
    source: ContainerSource,
    styles?: CSSProperties,
  ): ILayoutSection[] => {
    return layouts.map((layout) => {
      if (layout.id === source.sectionId) {
        return {
          ...layout,
          styles,
        };
      }
      return layout;
    });
  };
  const changeColumnContainerStyles = (
    layouts: ILayoutSection[],
    { sectionId, rowId, colId }: ContainerSource,
    styles?: CSSProperties,
  ): ILayoutSection[] => {
    return layouts.map((layout) => {
      if (layout.id === sectionId) {
        return {
          ...layout,
          rows: layout.rows.map((row) => {
            if (row.id === rowId) {
              return {
                ...row,
                columns: row.columns.map((col) => {
                  if (col.id === colId) {
                    return {
                      ...col,
                      styles,
                    };
                  }
                  return col;
                }),
              };
            }
            return row;
          }),
        };
      }
      return layout;
    });
  };
  return {
    changeSectionContainerStyles,
    changeColumnContainerStyles,
  };
};
