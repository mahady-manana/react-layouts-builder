import { typeof as _typeof } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React, { useRef, useState, useEffect } from 'react';
import { DraggableItem } from '../components/draggable/Draggable.js';
import { DroppableColumnItem } from '../components/DroppableColumnItem/index.js';
import { DroppableSection } from '../components/DroppableSection/index.js';
import { DroppableColumnContainer } from '../components/DroppableColumnContainer/index.js';
import { createLayout } from '../helpers/createLayout.js';
import { createRenderableLayout } from '../helpers/createRendrableLayout.js';
import { reorderLayoutItem } from '../helpers/reorderLayout.js';
import { changeSectionStyles } from '../helpers/changeSectionStyles.js';
import { ResizableContainer } from '../components/ResizableContainer/ResizableContainer.js';

var LayoutContainer = function LayoutContainer(_a) {
  var data = _a.data,
      renderComponent = _a.renderComponent,
      onLayoutChange = _a.onLayoutChange,
      stableKey = _a.stableDataKey,
      layouts = _a.layouts,
      loading = _a.loading,
      disableChange = _a.disableChange;
  var containeRef = useRef(null);

  var _b = useState(false),
      isDragging = _b[0],
      setIsDragging = _b[1];

  var _c = useState(false);
      _c[0];
      var setDisableDrag = _c[1];

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

  var _h = useState();
      _h[0];
      var setCurentColWidth = _h[1];

  var _j = useState();
      _j[0];
      var setResizedSectionId = _j[1];

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

  var handleDragStart = function handleDragStart(e, sectionId, columnId, columnIndex, itemkey) {
    e.stopPropagation();

    var itemKeyType = _typeof(itemkey);

    e.dataTransfer.setData('itemKey', itemkey);
    e.dataTransfer.setData('itemKeyType', itemKeyType);
    e.dataTransfer.setData('sectionId', sectionId);
    e.dataTransfer.setData('colmunId', columnId);
    e.dataTransfer.setData('colmunIndex', columnIndex.toString());
    setIsSectionDragged(false);
  }; // Drop item to create new column or setion or add item to column


  var handleDropItem = function handleDropItem(e, target, sectionId, columnId, columnIndex, itemKey) {
    var sourceItemKey = e.dataTransfer.getData('itemKey');
    var isSection = e.dataTransfer.getData('isSection');
    var sourceSectionId = e.dataTransfer.getData('sectionId');
    var sourceColumnKey = e.dataTransfer.getData('colmunId');
    var sourceColmunIndex = e.dataTransfer.getData('colmunIndex');
    var itemKeyType = e.dataTransfer.getData('itemKeyType');
    console.log('sourceColmunIndex', sourceColmunIndex);
    var source = {
      columnId: sourceColumnKey,
      itemKey: itemKeyType === 'number' ? parseFloat(sourceItemKey) : sourceItemKey,
      sectionId: sourceSectionId,
      isSection: !!isSection,
      columnIndex: parseFloat(sourceColmunIndex)
    };
    var destination = {
      columnId: columnId,
      itemKey: itemKey,
      sectionId: sectionId,
      targetPlace: target,
      columnIndex: columnIndex
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
    className: "m-auto py-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "min-h-[100px] ",
    ref: containeRef
  }, renderableLayout.map(function (sectionData, index) {
    return /*#__PURE__*/React.createElement(DroppableSection, {
      disableChange: disableChange,
      index: index,
      key: sectionData.id,
      sections: sectionData,
      dndTargetKey: sectionData.id,
      disableDrag: isDragging,
      onDropItem: function onDropItem(e, target) {
        return handleDropItem(e, target, sectionData.id, '', 99999999, undefined);
      },
      onDragStart: function onDragStart(e) {
        handleDragSectionStart(e, sectionData.id);
      },
      onChangeSectionStyles: function onChangeSectionStyles(key, value) {
        return handleSectionStyles(sectionData.id, key, value);
      }
    }, sectionData.columns.map(function (cols, colIndex) {
      return /*#__PURE__*/React.createElement(ResizableContainer, {
        isRow: true,
        resizable: true,
        key: colIndex,
        styles: {
          width: 1080
        }
      }, cols.map(function (columnData) {
        return /*#__PURE__*/React.createElement(DroppableColumnContainer, {
          key: columnData.id,
          disableChange: disableChange,
          initialSize: initialSize,
          disableDrag: isDragging,
          isSection: isSectionDragged,
          styles: columnData.styles,
          className: columnData.className,
          dndTargetKey: columnData.id,
          width: columnData.width,
          currentColumLength: sectionData.columns.length || 1,
          onDropItem: function onDropItem(e, target) {
            return handleDropItem(e, target, sectionData.id, columnData.id, colIndex, undefined);
          },
          onResizeStart: handleResizeStart,
          onResize: function onResize(e, isInvert) {
            setResizedSectionId(sectionData.id);
            handleResize(e, columnData.id, sectionData.id, isInvert);
          }
        }, /*#__PURE__*/React.createElement("div", {
          key: columnData.id,
          className: "rlb-col-inner  ".concat('')
        }, columnData.items.map(function (items) {
          return /*#__PURE__*/React.createElement(DroppableColumnItem, {
            disableChange: disableChange,
            isSection: isSectionDragged,
            key: items[stableKey],
            dndTargetKey: items[stableKey],
            onDropItem: function onDropItem(e, target) {
              return handleDropItem(e, target, sectionData.id, columnData.id, colIndex, items[stableKey]);
            }
          }, /*#__PURE__*/React.createElement(DraggableItem, {
            disableChange: disableChange,
            dndTargetKey: items[stableKey],
            onDragStart: function onDragStart(e) {
              handleDragStart(e, sectionData.id, columnData.id, colIndex, items[stableKey]);
            }
          }, renderComponent(items)));
        })));
      }));
    }));
  })));
};

export { LayoutContainer };
