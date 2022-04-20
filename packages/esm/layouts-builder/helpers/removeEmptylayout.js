var removeEmptyColumn = function removeEmptyColumn(layouts) {
  // return layouts.map((section) => {
  //   const newColumns = section.columns.filter(
  //     (col) => (col.childIds.length || 0) > 0,
  //   );
  //   return {
  //     ...section,
  //     columns: newColumns,
  //   };
  // });
  return layouts;
};

var removeEmptyLayout = function removeEmptyLayout(layouts) {
  var notEmptyCol = removeEmptyColumn(layouts);
  return notEmptyCol.filter(function (section) {
    return section.columns.length > 0;
  });
};

export { removeEmptyLayout };
