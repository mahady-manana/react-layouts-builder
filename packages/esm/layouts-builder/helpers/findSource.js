var findSourceLayout = function findSourceLayout(layouts, itemId) {
  var source = {};
  var find = layouts.find(function (section) {
    var row = section.rows.find(function (row) {
      var cols = row.columns.find(function (col) {
        var isit = col.childIds.find(function (id) {
          return id.toString() === (itemId === null || itemId === void 0 ? void 0 : itemId.toString());
        });
        return isit;
      });
      source.columnId = cols === null || cols === void 0 ? void 0 : cols.id;
      return cols;
    });
    source.rowId = row === null || row === void 0 ? void 0 : row.id;
    return row;
  });
  source.sectionId = find === null || find === void 0 ? void 0 : find.id;
  if (!find) return;
  source.itemKey = itemId;
  if (!source.columnId || !source.sectionId || !source.rowId) return;
  return source;
};

export { findSourceLayout };
