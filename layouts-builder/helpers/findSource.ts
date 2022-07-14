import { ILayoutSection } from "layouts-builder/interface";
import { SourceType } from "layouts-builder/interface/internalType";

export const findSourceLayout = (
    layouts: ILayoutSection[],
    itemId: any,
  ) => {
    const source = {} as SourceType;
    const find = layouts.find((section) => {
      const row = section.rows.find((row) => {
        const cols = row.columns.find((col) => {
          const isit = col.childIds.find(
            (id) => id.toString() === itemId?.toString()
          );
          return isit;
        });
        source.columnId = cols?.id;
        return cols;
      });
      source.rowId = row?.id;
      return row;
    });
    source.sectionId = find?.id;
    if (!find) return;
  
    source.itemKey = itemId;
  
    if (!source.columnId || !source.sectionId || !source.rowId) return;
    return source;
  };