import { ISection } from "../interface"
import {
  IRenderableColumn,
  IRenderableLayout
} from "../interface/renderableInterface"
import { sortLayoutLayerOrder } from "./sortLayoutLayer"

export const createRenderableLayout = (
  data: any[],
  layouts: ISection[],
  key: string
): IRenderableLayout[] => {
  const dataLayout = layouts
    .map((layout) => {
      const renderedLayout: IRenderableLayout = {
        id: layout.id,
        order: layout.order,
        className: layout.className,
        columns: layout.columns
          .map((cols) => {
            const renderedCol: IRenderableColumn = {
              id: cols.id,
              order: cols.order,
              className: cols.className,
              items:
                data.filter((item) => cols.childIds.includes(item[key])) || [],
              styles: cols.styles,
              width: cols.width
            }
            return renderedCol
          })
          .sort(sortLayoutLayerOrder("order"))
          .filter((col) => col.items.length > 0)
      }
      return renderedLayout
    })
    .filter((section) => section.columns.length > 0)

  return dataLayout
}
