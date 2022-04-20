import v4 from '../../node_modules/uuid/dist/esm-browser/v4.js';

var createNewLayout = function createNewLayout(data, stableDataKey) {
  return [v4()].map(function (id, index) {
    var columns = [{
      childIds: data.map(function (item) {
        return item[stableDataKey];
      }),
      id: "column-".concat(v4()),
      order: 0,
      className: 'w-full',
      width: 100
    }];
    var section = {
      className: '',
      id: "section-".concat(v4()),
      order: 0,
      columns: [columns],
      contentWidth: 1080,
      width: '100%',
      spacing: 2
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


var createLayout = function createLayout(data, stableDataKey, currentLayouts) {
  if (!currentLayouts || (currentLayouts === null || currentLayouts === void 0 ? void 0 : currentLayouts.length) === 0) {
    return createNewLayout(data, stableDataKey);
  } // const getNewData = data.filter((dt) => {
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

export { createLayout };
