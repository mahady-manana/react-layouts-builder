import { ILayoutTargetEnum } from '../interface/internalType.js';
import { addToColumn } from './addToNewColumn.js';
import { addToNewRow } from './addToNewRow.js';
import { removeEmptyLayout } from './removeEmptylayout.js';

// import { ILayoutSection, ILayoutColumn } from '../interface';
//   layouts: ILayoutSection[],
//   source: SourceType,
//   dest: DestinationType,
//   place: DropTargetPlaceEnum,
// ) => {
//   if (
//     source.isSection &&
//     (place === DropTargetPlaceEnum.SECTION_BOTTOM ||
//       place === DropTargetPlaceEnum.SECTION_TOP)
//   ) {
//     const finalLayouts = reorderRow(layouts, source, dest, place);
//     const removeOldItem = finalLayouts.map((layout) => ({
//       ...layout,
//       columns: layout.columns.map((cols, index) => {
//         if (index === source.columnIndex) {
//           return removeItemFromSource(
//             cols,
//             source.columnId,
//             source.itemKey,
//           );
//         }
//         return cols;
//       }),
//     }));
//     return removeEmptyLayout(removeOldItem);
//   }
//   if (
//     place === DropTargetPlaceEnum.SECTION_BOTTOM ||
//     place === DropTargetPlaceEnum.SECTION_TOP
//   ) {
//     const removeOldItem = layouts.map((layout) => {
//       if (layout.id === source.sectionId) {
//         return {
//           ...layout,
//           columns: layout.columns.map((cols, index) => {
//             if (index === source.columnIndex) {
//               return removeItemFromSource(
//                 cols,
//                 source.columnId,
//                 source.itemKey,
//               );
//             }
//             return cols;
//           }),
//         };
//       }
//       return layout;
//     });
//     const finalLayouts = addToNewRow(
//       removeOldItem,
//       source,
//       dest,
//       place,
//     );
//     return removeEmptyLayout(finalLayouts);
//   }
//   if (source.isSection) {
//     return layouts;
//   }
//   const finalLayouts = layouts.map((section) => {
//     if (section.id !== dest.sectionId) return section;
//     const newCols = section.columns[dest.columnIndex];
//     if (!newCols) return section;
//     const sectionModified = {
//       ...section,
//       columns: section.columns.map((cols, index) => {
//         if (index === dest.columnIndex) {
//           const add = addItemToColumn(cols, source, dest, place);
//           return removeItemFromSource(
//             add,
//             source.columnId,
//             source.itemKey,
//           );
//         }
//         return cols;
//       }),
//     };
//     return sectionModified;
//   });
//   const removeOldItem = finalLayouts.map((layout) => {
//     if (layout.id === source.sectionId) {
//       return {
//         ...layout,
//         columns: layout.columns.map((cols, index) => {
//           console.log(source);
//           if (index === source.columnIndex) {
//             return removeItemFromSource(
//               cols,
//               source.columnId,
//               source.itemKey,
//             );
//           }
//           return cols;
//         }),
//       };
//     }
//     return layout;
//   });
//   return removeEmptyLayout(removeOldItem);
// };

var reorderLayoutItem = function reorderLayoutItem(layouts, source, dest, place, target) {
  switch (target) {
    case ILayoutTargetEnum.ROW:
      return addToNewRow(layouts, source, dest, place);

    case ILayoutTargetEnum.COL:
      return addToColumn(layouts, source, dest, place);

    case ILayoutTargetEnum.ITEM:
      return addToColumn(layouts, source, dest, place);
  }
};

var reorderLayout = function reorderLayout(layouts, source, dest, place, target) {
  var ordered = reorderLayoutItem(layouts, source, dest, place, target);

  if (ordered) {
    var removeEmpty = removeEmptyLayout(ordered);
    return removeEmpty;
  }

  return layouts;
};

export { reorderLayout };
