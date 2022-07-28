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
      styles: layout.styles,
      rows: layout.rows.map(
        ({
          columns,
          id,
          order,
          width,
          className,
          isContainer,
          styles,
        }) => ({
          id,
          order,
          width,
          styles,
          className,
          isContainer: !!isContainer,
          columns: columns.map(
            ({ childIds, id, order, width, className, styles }) => ({
              id,
              className,
              width,
              styles,
              order,
              items: childIds.map((itemKey) => {
                if (
                  itemKey === 'EMPTY_SECTION' &&
                  childIds.length <= 1
                )
                  return {
                    id: 'EMPTY_SECTION',
                  };
                return data.find(
                  (dt) => itemKey!== null &&
                    dt[key] === itemKey ||
                    dt[key]?.toString() === itemKey.toString(),
                );
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
