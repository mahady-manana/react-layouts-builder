import { CSSProperties } from 'react';
import { ILayoutColumn, ILayoutSection } from '../interface';

const addClassColmun = (
  column: ILayoutColumn[],
  columnId: string,
  cssProps: {
    className: string;
    styles?: CSSProperties;
  },
  siblingCSSProps?: {
    className?: string;
    styles?: CSSProperties;
  },
) => {
  const newColumns = column.map((col) => {
    if (col.id === columnId) {
      return {
        ...col,
        className: cssProps.className,
        styles: cssProps.styles,
      };
    }

    return {
      ...col,
      className: siblingCSSProps?.className,
      styles: siblingCSSProps?.styles,
    };
  });
  return newColumns;
};

export const addClassnameToColumn = (
  layouts: ILayoutSection[],
  columnId: string,
  cssProps: {
    className: string;
    styles?: CSSProperties;
  },
  siblingCSSProps?: {
    className?: string;
    styles?: CSSProperties;
  },
) => {
  const finalLayouts = layouts.map((section) => {
    if (!section.columns.find((cl) => cl.id === columnId))
      return section;
    const sectionModified = {
      ...section,
      columns: addClassColmun(
        section.columns,
        columnId,
        cssProps,
        siblingCSSProps,
      ),
    };
    return sectionModified;
  });
  return finalLayouts;
};
