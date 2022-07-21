var useContainerIdentifier = function useContainerIdentifier() {
  var isSectionContainer = function isSectionContainer(section) {
    if (section.container) {
      return true;
    }

    return section.rows.every(function (row) {
      return row.columns.length > 1;
    });
  };

  var isColumnContainer = function isColumnContainer(cols) {
    return cols.items.length > 1;
  };

  return {
    isSectionContainer: isSectionContainer,
    isColumnContainer: isColumnContainer
  };
};

export { useContainerIdentifier };
