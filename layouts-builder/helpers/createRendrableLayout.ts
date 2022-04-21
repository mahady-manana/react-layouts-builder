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
  const dataLayout = layouts.map((layout) => {
    const renderedLayout: IRenderableLayout = {
      id: layout.id,
      order: layout.order,
      className: layout.className,
      backgroundColor: layout.backgroundColor,
      backgroundImage: layout.backgroundImage,
      contentWidth: layout.contentWidth,
      spacing: layout.spacing,
      width: layout.width,
      rows: layout.rows.map(
        ({ columns, id, order, width, className }) => ({
          id,
          order,
          width,
          className,
          columns: columns.map(
            ({ childIds, id, order, width, className }) => ({
              id,
              className,
              width,
              order,
              items: childIds.map((itemKey) =>
                data.find((dt) => dt[key] === itemKey),
              ),
            }),
          ),
        }),
      ),
    };
    return renderedLayout;
  });

  return dataLayout;
};
