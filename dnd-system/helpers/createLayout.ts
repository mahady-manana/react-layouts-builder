import { v4 as uuidv4 } from 'uuid';
import { IColumn, ISection } from '../interface';

const createNewLayout = (
  data: any[],
  stableDataKey: string,
): ISection[] => {
  return data.map((item: any, index: number) => {
    const columns: IColumn[] = [
      {
        childIds: [item[stableDataKey]],
        id: `column-${uuidv4()}`,
        order: 0,
        className: 'w-full',
        styles: {},
        width: 100,
      },
    ];
    const section: ISection = {
      className: '',
      id: `section-${uuidv4()}`,
      order: 0,
      columns: columns,
    };
    return section;
  });
};
/**
 *
 * @param data   data used in the layer, Type : any[]
 * @param stableDataKey stable key of the data, ex: ```"id", "order"```, etc.
 * @param currentLayouts ``optionnal``, The actual layout if exist
 *
 * @note If 'currentLayouts' is not provided, a completely new layout will be generated,
 * So if there is already a layout in your layer, it will be overdrawn
 * Always provide the current layouts if exist to maintain the current layer
 *
 * @returns
 */
export const createLayout = (
  data: any[],
  stableDataKey: string,
  currentLayouts?: ISection[],
): ISection[] => {
  if (!currentLayouts || currentLayouts?.length === 0) {
    return createNewLayout(data, stableDataKey);
  }
  const getNewData = data.filter((dt) => {
    const isExist = currentLayouts.find((section) => {
      const sectionExist = section.columns.find((col) =>
        col.childIds.includes(dt[stableDataKey]),
      );
      return sectionExist;
    });
    return !isExist;
  });

  const newLayouts = createNewLayout(getNewData, stableDataKey);
  return currentLayouts.concat(newLayouts);
};
