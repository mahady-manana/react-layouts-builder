import { ILayoutSection } from '../interface';
import { createNewSection } from './createNewSection';

// const createNewLayout = (
//   data: any[],
//   stableDataKey: string,
// ): ILayoutSection[] => {
//   return [uuidv4()].map((id: any, index: number) => {
//     const columns: ILayoutColumn[] = [
//       {
//         childIds: data.map((item) => item[stableDataKey]),
//         id: `column-${uuidv4()}`,
//         order: 0,
//         className: 'w-full',

//         width: 100,
//       },
//     ];
//     const section: ILayoutSection = {
//       className: '',
//       id: `section-${uuidv4()}`,
//       order: 0,
//       columns: [columns],
//       contentWidth: 1080,
//       width: '100%',
//       spacing: 2,
//     };
//     return section;
//   });
// };
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
  currentLayouts?: ILayoutSection[],
  options?: {
    width?: number;
    isContainer?: boolean;
  },
): ILayoutSection[] => {
  if (!currentLayouts || currentLayouts?.length === 0) {
    const layouts = data.map((dataItem) =>
      createNewSection(
        [dataItem[stableDataKey]?.toString()],
        options?.isContainer,
        options?.width,
      ),
    );

    return layouts;

    // const newSections = createNewSection(
    //   data.map((dt) => dt[stableDataKey]),
    // );
    // return [newSections];
  }
  // const getNewData = data.filter((dt) => {
  //   const isExist = currentLayouts.find((section) => {
  //     const sectionExist = section.columns.find((col) =>
  //       col.childIds.includes(dt[stableDataKey]),
  //     );
  //     return sectionExist;
  //   });
  //   return !isExist;
  // });

  // const newLayouts = createNewLayout(getNewData, stableDataKey);
  // return currentLayouts.concat(newLayouts);
  return [];
};
