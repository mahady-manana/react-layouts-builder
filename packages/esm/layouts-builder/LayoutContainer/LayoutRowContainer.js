import { typeof as _typeof } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React, { useRef, useState, useEffect } from 'react';
import { DraggableItem } from '../components/draggable/Draggable.js';
import { DroppableColumnItem } from '../components/DroppableColumnItem/index.js';
import classnames from '../../node_modules/classnames/index.js';
import { DroppableColumnContainer } from '../components/DroppableColumnContainer/index.js';
import { ILayoutTargetEnum } from '../interface/internalType.js';
import { ResizableContainer } from '../components/ResizableContainer/ResizableContainer.js';
import { reorderLayout } from '../helpers/reorderLayout.js';
import { changeColumnWidth } from '../helpers/changeColumnWidth.js';
import { findWidthPercentByPx } from '../helpers/findWidth.js';

var LayoutRowContainer = function LayoutRowContainer(_a) {
  var disabled = _a.disabled,
      stableKey = _a.stableKey,
      columns = _a.columns,
      layouts = _a.layouts,
      sectionId = _a.sectionId,
      rowId = _a.rowId,
      imageSizeFnLoader = _a.imageSizeFnLoader,
      setActualLayout = _a.setActualLayout,
      renderComponent = _a.renderComponent,
      imageCheckerFn = _a.imageCheckerFn,
      onLayoutChange = _a.onLayoutChange,
      _onImageResizeFinished = _a.onImageResizeFinished;
  var containerRef = useRef(null);

  var _b = useState(false);
      _b[0];
      var setDragStart = _b[1];

  var _c = useState(),
      currentColumn = _c[0],
      setCurrentColumn = _c[1];

  var _d = useState(0);
      _d[0];
      _d[1];

  var _e = useState(false),
      resizeBegin = _e[0],
      setResizeBegin = _e[1];

  var _f = useState([]),
      widths = _f[0],
      setWidths = _f[1];

  var _g = useState(0),
      indexCol = _g[0],
      setIndexCol = _g[1];

  var _h = useState(),
      initClientX = _h[0],
      setInitClientX = _h[1];

  var _j = useState(),
      initWidth = _j[0],
      setInitWidth = _j[1];

  var _k = useState(),
      newWidth = _k[0],
      setNewWidth = _k[1];

  var _l = useState(),
      nextWidth = _l[0],
      setNextWidth = _l[1];

  var _m = useState(500),
      waitBeforeUpdate = _m[0],
      setWaitBeforeUpdate = _m[1];

  var _o = useState(false),
      isSectionDragged = _o[0],
      setIsSectionDragged = _o[1];

  var handleDragStart = function handleDragStart(e, sectionId, columnId, rowId, itemkey) {
    e.stopPropagation();

    var itemKeyType = _typeof(itemkey);

    e.dataTransfer.setData('itemKey', itemkey);
    e.dataTransfer.setData('itemKeyType', itemKeyType);
    e.dataTransfer.setData('sectionId', sectionId);
    e.dataTransfer.setData('colmunId', columnId);
    e.dataTransfer.setData('rowId', rowId);
    setIsSectionDragged(false);
    setDragStart(true);
  }; //   // Drop item to create new column or setion or add item to column


  var handleDropItem = function handleDropItem(e, target, sectionId, columnId, rowId, itemKey, layoutTarget) {
    var sourceItemKey = e.dataTransfer.getData('itemKey');
    var isSection = e.dataTransfer.getData('isSection');
    var sourceSectionId = e.dataTransfer.getData('sectionId');
    var sourceColumnKey = e.dataTransfer.getData('colmunId');
    var sourceRowId = e.dataTransfer.getData('rowId');
    var itemKeyType = e.dataTransfer.getData('itemKeyType');
    var source = {
      columnId: sourceColumnKey,
      itemKey: itemKeyType === 'number' ? parseFloat(sourceItemKey) : sourceItemKey,
      sectionId: sourceSectionId,
      isSection: !!isSection,
      rowId: sourceRowId
    };
    var destination = {
      columnId: columnId,
      itemKey: itemKey,
      sectionId: sectionId,
      targetPlace: target,
      rowId: rowId
    };

    if (!itemKey && !sourceItemKey) {
      // this is used to prevent drag resize to create new item
      return;
    }

    setDragStart(false);
    var newLayout = reorderLayout(layouts, source, destination, target, layoutTarget);
    setIsSectionDragged(false);

    if (newLayout) {
      setActualLayout(newLayout);
      onLayoutChange(newLayout);
    }
  };

  var onMouseMove = function onMouseMove(e) {
    if (resizeBegin) {
      if (e.clientX === 0 || !initClientX || !initWidth) return;
      var diff = initClientX - e.clientX;
      var needX2 = columns.length === 1;
      var add = needX2 ? diff * 2 : diff * 1; // const addition = left ? add : -add;

      var cWidth = initWidth - add;
      var w_1 = findWidthPercentByPx(initWidth, columns[indexCol].width, cWidth, true);
      var old = columns[indexCol].width;
      var oldNext = columns[indexCol + 1].width;
      var rest_1 = oldNext + (old - w_1);
      var newWidths_1 = widths.map(function (wd, index) {
        if (index === indexCol) return w_1;

        if (index === indexCol + 1) {
          setNextWidth(rest_1);
          return rest_1;
        }

        return wd;
      });
      setWaitBeforeUpdate(500);
      setNewWidth(w_1);
      setTimeout(function () {
        setWidths(newWidths_1);
      }, 250);
    }
  };

  var _onMouseDown = function onMouseDown(clientX, width) {
    // console.log("DOWN", clientX, width);
    setInitClientX(clientX);
    setInitWidth(width);
    setResizeBegin(true);
  };

  useEffect(function () {
    if (waitBeforeUpdate > 10) {
      var timer = setTimeout(function () {
        setWaitBeforeUpdate(function (prev) {
          return prev - 10;
        });
      }, 250);
      clearTimeout(timer);
    }

    if (waitBeforeUpdate < 10) {
      runIt();
    }
  }, [waitBeforeUpdate]);

  var runIt = function runIt() {
    if (nextWidth && newWidth) {
      var newLayouts = changeColumnWidth(layouts, {
        rowId: rowId,
        sectionId: sectionId
      }, {
        colId: currentColumn,
        next: nextWidth,
        width: newWidth
      });
      setActualLayout(newLayouts);
      onLayoutChange(newLayouts);
      setNextWidth(0);
      setNewWidth(0);
    }
  };

  var onMouseUp = function onMouseUp(e) {
    runIt();
    setResizeBegin(false);
    setInitClientX(0);
    setInitWidth(0);
  };

  var onMousLeave = function onMousLeave(e) {
    runIt();
    setResizeBegin(false);
    setInitClientX(0);
    setInitWidth(0);
  };

  useEffect(function () {
    if (columns.length) {
      setWidths(columns.map(function (col) {
        return col.width;
      }));
    }
  }, [columns]);
  return /*#__PURE__*/React.createElement("div", {
    className: classnames('section-content flex', resizeBegin ? 'rbl-resizing' : ''),
    style: {
      width: '100%',
      margin: 'auto'
    },
    ref: containerRef,
    onMouseMove: onMouseMove,
    onMouseUp: onMouseUp,
    onMouseLeave: onMousLeave
  }, columns.map(function (column, index) {
    return /*#__PURE__*/React.createElement(ResizableContainer, {
      width: "calc(".concat(widths[index], "% - ").concat(40 / columns.length, "px)"),
      key: column.id,
      isLast: columns.length === index + 1,
      isNextTo: index === indexCol + 1,
      resizable: true,
      colNumber: columns.length,
      onMouseDown: function onMouseDown(clientX, width) {
        setIndexCol(index);
        setCurrentColumn(column.id);

        _onMouseDown(clientX, width);
      },
      type: "column"
    }, /*#__PURE__*/React.createElement(DroppableColumnContainer, {
      key: column.id,
      disableChange: resizeBegin ? true : disabled,
      //   isSection={isSectionDragged} TO DO
      styles: column.styles,
      className: column.className,
      dndTargetKey: column.id,
      width: column.width,
      currentColumLength: 1,
      onDropItem: function onDropItem(e, target) {
        return handleDropItem(e, target, sectionId, column.id, rowId, undefined, ILayoutTargetEnum.COL);
      }
    }, /*#__PURE__*/React.createElement("div", {
      key: column.id,
      className: "rlb-col-inner"
    }, column.items.map(function (items, index) {
      if (!items) return null;
      var isImage = imageCheckerFn ? imageCheckerFn(items) : false;
      return /*#__PURE__*/React.createElement(DroppableColumnItem, {
        disableChange: disabled,
        isSection: isSectionDragged,
        key: index,
        dndTargetKey: items[stableKey],
        onDropItem: function onDropItem(e, target) {
          return handleDropItem(e, target, sectionId, column.id, rowId, items[stableKey], ILayoutTargetEnum.ITEM);
        }
      }, /*#__PURE__*/React.createElement(DraggableItem, {
        isImage: isImage,
        disableChange: disabled || items['id'] === 'EMPTY_SECTION',
        imageWidth: imageSizeFnLoader ? imageSizeFnLoader(items) : undefined,
        oneCol: columns.length === 1,
        dndTargetKey: items[stableKey],
        onImageResizeFinished: function onImageResizeFinished(w) {
          return _onImageResizeFinished ? _onImageResizeFinished(items, w) : undefined;
        },
        onDragStart: function onDragStart(e) {
          handleDragStart(e, sectionId, column.id, rowId, items[stableKey]);
        }
      }, items['id'] === 'EMPTY_SECTION' && !disabled ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, "Drop or add block here...")) : null, items['id'] !== 'EMPTY_SECTION' ? renderComponent(items, {
        columnId: column.id,
        itemKey: items[stableKey],
        rowId: rowId,
        sectionId: sectionId
      }) : null));
    }))));
  }));
};

export { LayoutRowContainer };
