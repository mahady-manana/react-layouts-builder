import { ILayoutSection } from '../interface';
import {
  IRenderableColumn,
  IRenderableLayout,
} from '../interface/renderableInterface';

export const createRenderableLayout = (
  data: any[],
  layouts: ILayoutSection[],
  key: string,
): IRenderableLayout[] => {
  const dataLayout = layouts
    .map((layout) => {
      const renderedLayout: IRenderableLayout = {
        id: layout.id,
        order: layout.order,
        className: layout.className,
        columns: layout.columns
          .map((cols) => {
            const items = cols.childIds.map((item) => {
              return data.find((dt) => dt[key] === item) || {};
            });
            const renderedCol: IRenderableColumn = {
              id: cols.id,
              order: cols.order,
              className: cols.className,
              items: items,
              styles: cols.styles,
              width: cols.width,
            };

            return renderedCol;
          })
          .filter((col) => col.items.length > 0),
      };
      return renderedLayout;
    })
    .filter((section) => section.columns.length > 0);

  return dataLayout;
};
