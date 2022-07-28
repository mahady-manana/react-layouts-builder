var createRenderableLayout = function createRenderableLayout(data, layouts, key) {
  var dataLayout = layouts.map(function (layout) {
    var renderedLayout = {
      id: layout.id,
      order: layout.order,
      className: layout.className,
      backgroundColor: layout.backgroundColor,
      backgroundImage: layout.backgroundImage,
      contentWidth: layout.contentWidth,
      width: layout.width,
      container: layout.container,
      styles: layout.styles,
      rows: layout.rows.map(function (_a) {
        var columns = _a.columns,
            id = _a.id,
            order = _a.order,
            width = _a.width,
            className = _a.className,
            isContainer = _a.isContainer,
            styles = _a.styles;
        return {
          id: id,
          order: order,
          width: width,
          styles: styles,
          className: className,
          isContainer: !!isContainer,
          columns: columns.map(function (_a) {
            var childIds = _a.childIds,
                id = _a.id,
                order = _a.order,
                width = _a.width,
                className = _a.className,
                styles = _a.styles;
            return {
              id: id,
              className: className,
              width: width,
              styles: styles,
              order: order,
              items: childIds.map(function (itemKey) {
                if (itemKey === 'EMPTY_SECTION' && childIds.length <= 1) return {
                  id: 'EMPTY_SECTION'
                };
                return data.find(function (dt) {
                  var _a;

                  return itemKey !== null && dt[key] === itemKey || ((_a = dt[key]) === null || _a === void 0 ? void 0 : _a.toString()) === itemKey.toString();
                });
              })
            };
          })
        };
      })
    };
    return renderedLayout;
  });
  return dataLayout;
};

export { createRenderableLayout };
