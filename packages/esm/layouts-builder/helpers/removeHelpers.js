import { __assign } from '../../node_modules/tslib/tslib.es6.js';

var removeItemFirstChildren = function removeItemFirstChildren(data, itemId) {
  return data.map(function (item) {
    var _a;

    return __assign(__assign({}, item), {
      children: (_a = item.children) === null || _a === void 0 ? void 0 : _a.filter(function (it) {
        return it.id !== itemId;
      })
    });
  });
};
var removeBlockLayout = function removeBlockLayout(data, blockId) {
  return data.map(function (item) {
    var _a;

    return __assign(__assign({}, item), {
      children: (_a = item.children) === null || _a === void 0 ? void 0 : _a.map(function (it) {
        var _a;

        return __assign(__assign({}, it), {
          children: (_a = it.children) === null || _a === void 0 ? void 0 : _a.filter(function (block) {
            return block.id !== blockId;
          })
        });
      })
    });
  });
}; // export const removeBlockItem = (data: LayoutType[], blockId: string) => {
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

export { removeBlockLayout, removeItemFirstChildren };
