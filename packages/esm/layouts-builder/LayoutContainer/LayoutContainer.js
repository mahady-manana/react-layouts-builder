import { typeof as _typeof } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React, { useRef, useState, useEffect } from 'react';
import { DraggableItem } from '../components/draggable/Draggable.js';
import { DroppableColumnItem } from '../components/DroppableColumnItem/index.js';
import { DroppableSection } from '../components/DroppableSection/index.js';
import { DroppableColumnContainer } from '../components/DroppableColumnContainer/index.js';
import { changeColumnWidth } from '../helpers/changeColumnWidth.js';
import { createLayout } from '../helpers/createLayout.js';
import { createRenderableLayout } from '../helpers/createRendrableLayout.js';
import { reorderLayoutItem } from '../helpers/reorderLayout.js';
import { changeSectionStyles } from '../helpers/changeSectionStyles.js';

var LayoutContainer = function LayoutContainer(_a) {
  var data = _a.data,
      renderComponent = _a.renderComponent,
      onLayoutChange = _a.onLayoutChange,
      stableKey = _a.stableDataKey,
      layouts = _a.layouts,
      loading = _a.loading;
  var containeRef = useRef(null);

  var _b = useState(false),
      isDragging = _b[0],
      setIsDragging = _b[1];

  var _c = useState(false),
      disableDrag = _c[0],
      setDisableDrag = _c[1];

  var _d = useState([]),
      actualLayout = _d[0],
      setActualLayout = _d[1];

  var _e = useState(false),
      isSectionDragged = _e[0],
      setIsSectionDragged = _e[1];

  var _f = useState([]),
      renderableLayout = _f[0],
      setRenderableLayout = _f[1];

  var _g = useState(),
      initialSize = _g[0],
      setInitialSize = _g[1];

  var _h = useState(),
      currentColWidth = _h[0],
      setCurentColWidth = _h[1];

  var _j = useState(),
      resizedSectionId = _j[0],
      setResizedSectionId = _j[1];

  useEffect(function () {
    if (layouts) {
      setActualLayout(layouts);
    }
  }, [layouts]);
  useEffect(function () {
    if (layouts) {
      setActualLayout(layouts);
    }
  }, [layouts, loading]);
  useEffect(function () {
    var renderable = createRenderableLayout(data, actualLayout, stableKey);
    setRenderableLayout(renderable);
  }, [actualLayout, data, stableKey]); // create new layout if new data is added
  // Do not incldes 'stableKey and layouts and hooks-deps'

  useEffect(function () {
    var newLayouts = createLayout(data, stableKey, layouts);
    setActualLayout(newLayouts); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  useEffect(function () {
    if (actualLayout.length > 0) {
      onLayoutChange(actualLayout);
    }
  }, [actualLayout, onLayoutChange]);

  var handleDragStart = function handleDragStart(e, sectionId, columnId, itemkey) {
    e.stopPropagation();

    var itemKeyType = _typeof(itemkey);

    e.dataTransfer.setData('itemKey', itemkey);
    e.dataTransfer.setData('itemKeyType', itemKeyType);
    e.dataTransfer.setData('sectionId', sectionId);
    e.dataTransfer.setData('colmunId', columnId);
    setIsSectionDragged(false);
  }; // Drop item to create new column or setion or add item to column


  var handleDropItem = function handleDropItem(e, target, sectionId, columnId, itemKey) {
    var sourceItemKey = e.dataTransfer.getData('itemKey');
    var isSection = e.dataTransfer.getData('isSection');
    var sourceSectionId = e.dataTransfer.getData('sectionId');
    var sourceColumnKey = e.dataTransfer.getData('colmunId');
    var itemKeyType = e.dataTransfer.getData('itemKeyType');
    var source = {
      columnId: sourceColumnKey,
      itemKey: itemKeyType === 'number' ? parseFloat(sourceItemKey) : sourceItemKey,
      sectionId: sourceSectionId,
      isSection: !!isSection
    };
    var destination = {
      columnId: columnId,
      itemKey: itemKey,
      sectionId: sectionId,
      targetPlace: target
    };
    var newLayout = reorderLayoutItem(actualLayout, source, destination, target);
    setIsSectionDragged(false);
    setActualLayout(newLayout);
  };

  var handleResize = function handleResize(e, colmunId, sectionId, isInvert) {
    var _a;

    if (!initialSize) return;
    setResizedSectionId(sectionId);
    var containerWidth = ((_a = containeRef.current) === null || _a === void 0 ? void 0 : _a.offsetWidth) || 0;
    var onPercentInPixel = containerWidth / 100;
    var offset2 = e.clientX - initialSize.initialPosPx;
    var offsetPercent = offset2 / onPercentInPixel;
    var initialWidth = initialSize.currentPercentWidth;
    var newWidth = isInvert ? initialWidth - offsetPercent : initialWidth + offsetPercent;
    setIsDragging(true);

    if (e.clientX === 0) {
      setDisableDrag(false);
      return;
    }

    setDisableDrag(true);
    setCurentColWidth(Math.round(newWidth));
  };

  var handleResizeStart = function handleResizeStart(colId, widthPx, currentPercentWidth, onePixel, initialPosPx) {
    setIsDragging(true);
    setInitialSize({
      widthPx: widthPx,
      currentPercentWidth: currentPercentWidth,
      onePixel: onePixel,
      initialPosPx: initialPosPx,
      colId: colId
    });
  };

  var handleResizeEnd = function handleResizeEnd(cols, colId, initialWidth, colCount) {
    setIsDragging(false);
    var restWidth = cols.reduce(function (acc, next) {
      if (next.id === colId) return acc;
      return acc + next.width;
    }, 0);
    var diff = 100 - ((currentColWidth || 0) + restWidth);
    var shouldAdd = diff / (colCount - 1);
    var siblingsCols = cols.map(function (colm) {
      return {
        colId: colm.id,
        width: colm.width + shouldAdd
      };
    }).filter(function (col) {
      return col.colId !== colId;
    });
    var newsLayoutModified = changeColumnWidth(actualLayout, colId, currentColWidth || initialWidth, siblingsCols);
    setActualLayout(newsLayoutModified); // const layouts = addClassnameToColumn(
    //   actualLayout,
    //   colId,
    //   {
    //     className: `w-[${currentColWidth}%]`,
    //     styles: { width: `${currentColWidth}%` }
    //   },
    //   {
    //     className: `w-[${Math.round(restCol)}%]`,
    //     styles: { width: `${Math.round(restCol)}%` }
    //   }
    // )

    setInitialSize(undefined); // setActualLayout(layouts)

    setCurentColWidth(undefined);
    setResizedSectionId('');
  };

  var generateNewColumnWidth = function generateNewColumnWidth(cols, colId, currentWidth, colCount) {
    var restWidth = cols.reduce(function (acc, next) {
      if (next.id === colId) return acc;
      return acc + next.width;
    }, 0);
    var diff = 100 - (currentWidth + restWidth);
    var shouldAdd = diff / (colCount - 1);
    var colsWidth = cols.map(function (colm) {
      return {
        colId: colm.id,
        width: colm.id === colId ? currentWidth : colm.width + shouldAdd
      };
    });
    return colsWidth;
  };

  var handleDragSectionStart = function handleDragSectionStart(e, sectionId) {
    e.stopPropagation();
    e.dataTransfer.setData('sectionId', sectionId);
    e.dataTransfer.setData('isSection', 'section');
    setIsSectionDragged(true);
  };

  var handleSectionStyles = function handleSectionStyles(id, key, value) {
    var newLayouts = changeSectionStyles(actualLayout, id, key, value);
    setActualLayout(newLayouts);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-[1080px] m-auto py-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "min-h-[100px] ",
    ref: containeRef
  }, renderableLayout.map(function (sectionData, index) {
    return /*#__PURE__*/React.createElement(DroppableSection, {
      index: index,
      key: sectionData.id,
      sections: sectionData,
      dndTargetKey: sectionData.id,
      disableDrag: isDragging,
      onDropItem: function onDropItem(e, target) {
        return handleDropItem(e, target, sectionData.id, '', undefined);
      },
      onDragStart: function onDragStart(e) {
        handleDragSectionStart(e, sectionData.id);
      },
      onChangeSectionStyles: function onChangeSectionStyles(key, value) {
        return handleSectionStyles(sectionData.id, key, value);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "rlb-row",
      style: {
        width: "".concat(sectionData.contentWidth, "%"),
        margin: 'auto'
      }
    }, sectionData.columns.map(function (columnData) {
      var _a;

      return /*#__PURE__*/React.createElement(DroppableColumnContainer, {
        initialSize: initialSize,
        disableDrag: isDragging,
        key: columnData.id,
        isSection: isSectionDragged,
        styles: columnData.styles,
        className: columnData.className,
        dndTargetKey: columnData.id,
        resizingWidth: resizedSectionId === sectionData.id ? (_a = generateNewColumnWidth(sectionData.columns, initialSize === null || initialSize === void 0 ? void 0 : initialSize.colId, currentColWidth || columnData.width, sectionData.columns.length).find(function (co) {
          return co.colId === columnData.id;
        })) === null || _a === void 0 ? void 0 : _a.width : undefined,
        width: columnData.width,
        currentColumLength: sectionData.columns.length || 1,
        onDropItem: function onDropItem(e, target) {
          return handleDropItem(e, target, sectionData.id, columnData.id, undefined);
        },
        onResizeStart: handleResizeStart,
        onResize: function onResize(e, isInvert) {
          setResizedSectionId(sectionData.id);
          handleResize(e, columnData.id, sectionData.id, isInvert);
        },
        onResizeEnd: function onResizeEnd() {
          return handleResizeEnd(sectionData.columns, columnData.id, columnData.width, sectionData.columns.length || 1);
        }
      }, /*#__PURE__*/React.createElement("div", {
        key: columnData.id,
        className: "rlb-col-inner  ".concat('')
      }, columnData.items.map(function (items) {
        return /*#__PURE__*/React.createElement(DroppableColumnItem, {
          disableDrag: disableDrag,
          isSection: isSectionDragged,
          key: items[stableKey],
          dndTargetKey: items[stableKey],
          currentColumLength: columnData.items.length || 1,
          onDropItem: function onDropItem(e, target) {
            return handleDropItem(e, target, sectionData.id, columnData.id, items[stableKey]);
          }
        }, /*#__PURE__*/React.createElement(DraggableItem, {
          disableDrag: disableDrag,
          dndTargetKey: items[stableKey],
          onDragStart: function onDragStart(e) {
            handleDragStart(e, sectionData.id, columnData.id, items[stableKey]);
          }
        }, renderComponent(items)));
      })));
    })));
  })));
};

export { LayoutContainer };
