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
      width: layout.width,
      container: layout.container,
      rows: layout.rows.map(
        ({ columns, id, order, width, className, isContainer }) => ({
          id,
          order,
          width,
          className,
          isContainer: !!isContainer,
          columns: columns.map(
            ({ childIds, id, order, width, className }) => ({
              id,
              className,
              width,
              order,
              items: childIds.map((itemKey) => {
                if (
                  itemKey === 'EMPTY_SECTION' &&
                  childIds.length <= 1
                )
                  return {
                    id: 'EMPTY_SECTION',
                  };
                return data.find((dt) => dt[key] === itemKey);
              }),
            }),
          ),
        }),
      ),
    };
    return renderedLayout;
  });

  return dataLayout;
};
