var needRowTarget = function needRowTarget(layouts, currentRow, _a) {
  // check row length
  var _b, _c;

  var rows = _a.rows,
      rowIndex = _a.rowIndex,
      sectionIndex = _a.sectionIndex;
  var needIT = currentRow.columns.length > 1;
  var topSiblingRow = rows[rowIndex - 1];
  var bottomSiblingRow = rows[rowIndex + 1];
  var topSectionRows = ((_b = layouts[sectionIndex - 1]) === null || _b === void 0 ? void 0 : _b.rows) || [];
  var bottomSectionRows = ((_c = layouts[sectionIndex + 1]) === null || _c === void 0 ? void 0 : _c.rows) || [];
  var topRow = topSiblingRow || topSectionRows[topSectionRows.length - 1];
  var bottomRow = bottomSiblingRow || bottomSectionRows[0];
  var topOk = topRow ? topRow.columns.length > 1 : needIT;
  var bottomOk = bottomRow ? bottomRow.columns.length > 1 : needIT;
  return {
    top: topOk,
    bottom: bottomOk
  };
};

export { needRowTarget };
