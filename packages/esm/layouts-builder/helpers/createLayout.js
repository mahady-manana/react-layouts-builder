import v4 from '../../node_modules/uuid/dist/esm-browser/v4.js';

var createNewLayout = function createNewLayout(data, stableDataKey) {
  return data.map(function (item, index) {
    var columns = [{
      childIds: [item[stableDataKey]],
      id: "column-".concat(v4()),
      order: 0,
      className: 'w-full',
      width: 100
    }];
    var section = {
      className: '',
      id: "section-".concat(v4()),
      order: 0,
      columns: columns,
      contentWidth: 100,
      width: 1080,
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
  }

  var getNewData = data.filter(function (dt) {
    var isExist = currentLayouts.find(function (section) {
      var sectionExist = section.columns.find(function (col) {
        return col.childIds.includes(dt[stableDataKey]);
      });
      return sectionExist;
    });
    return !isExist;
  });
  var newLayouts = createNewLayout(getNewData, stableDataKey);
  return currentLayouts.concat(newLayouts);
};

export { createLayout };
