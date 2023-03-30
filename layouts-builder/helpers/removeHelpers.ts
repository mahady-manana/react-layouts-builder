import { LayoutType } from "../interfaces/types";

export const removeContainer = (
  data: LayoutType[],
  containerId: string
): LayoutType[] => {
  return data.filter((item) => item.id !== containerId);
};

export const removeItemFirstChildren = (
  data: LayoutType[],
  itemId: string
): LayoutType[] => {
  return data.map((item) => {
    return {
      ...item,
      children: item.children?.filter((it) => it.id !== itemId),
    };
  });
};

export const removeBlockLayout = (data: LayoutType[], blockId: string) => {
  return data.map((item) => {
    return {
      ...item,
      children: item.children?.map((it) => ({
        ...it,
        children: it.children?.filter((block) => {
          return block.id !== blockId;
        }),
      })),
    };
  });
};
// export const removeBlockItem = (data: LayoutType[], blockId: string) => {
//   return data.map((item) => {
//     return {
//       ...item,
//       children: item.children?.map((it) => ({
//         ...it,
//         children: it.children?.filter(
//           (block) => block?.block?.id.toString() === blockId.toString()
//         ),
//       })),
//     };
//   });
// };
