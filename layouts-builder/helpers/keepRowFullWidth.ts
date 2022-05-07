import { ILayoutColumn } from '../interface';

export const keepRowFullWidth = (
  columns: ILayoutColumn[],
): ILayoutColumn[] => {
  const diffWidth = columns.reduce(
    (acc, next) => acc + next.width,
    0,
  );

  if (diffWidth < 98 || diffWidth > 101) {
    const rest = 100 - diffWidth;
    const shouldAdd = Math.round(rest / columns.length);
    return columns.map((col) => ({
      ...col,
      width: col.width + shouldAdd,
    }));
  }

  return columns;
};
