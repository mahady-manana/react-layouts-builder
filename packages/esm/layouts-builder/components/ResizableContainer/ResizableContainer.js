import classnames from '../../../node_modules/classnames/index.js';
import { findWidthPercentByPx } from '../../helpers/findWidth.js';
import { gridValue } from '../../helpers/gridValue.js';
import React, { useState, useRef } from 'react';

var ResizableContainer = function ResizableContainer(_a) {
  var isRow = _a.isRow,
      type = _a.type;
      _a.isCol;
      var colIndex = _a.colIndex,
      isSection = _a.isSection,
      resizable = _a.resizable,
      styles = _a.styles,
      children = _a.children,
      currentWidth = _a.currentWidth,
      noPadding = _a.noPadding,
      maxWidth = _a.maxWidth,
      colNumber = _a.colNumber,
      onResize = _a.onResize,
      onResizeColEnd = _a.onResizeColEnd,
      onResizeEnd = _a.onResizeEnd,
      onClick = _a.onClick;

  var _b = useState(0),
      width = _b[0],
      setWidth = _b[1];

  var _c = useState({
    width: 0,
    clientX: 0
  }),
      init = _c[0],
      setInit = _c[1];

  var columnRef = useRef(null);

  var onResizeStart = function onResizeStart(e) {
    var _a;

    e.preventDefault();
    e.stopPropagation();
    if (init.clientX && init.width) return;
    var columnWidth = (_a = columnRef.current) === null || _a === void 0 ? void 0 : _a.offsetWidth;
    if (!columnWidth) return;
    setWidth(columnWidth);
    setInit({
      width: width || columnWidth || 0,
      clientX: e.clientX
    });
  };

  var handleResize = function handleResize(e, left) {
    var _a, _b;

    e.preventDefault();
    e.stopPropagation();
    onResizeStart(e);

    if (init.clientX && init.width) {
      if (e.clientX === 0) return;
      var diff = init.clientX - e.clientX;
      var needX2 = colNumber === 1 || colNumber && colNumber > 2 && colIndex !== 0 && colIndex !== colNumber - 1;
      console.log('needX2', needX2);
      var add = needX2 ? diff * 2 : diff * 1;
      var addition = left ? add : -add;
      var cWidth = init.width + addition;
      var widthNow = ((_a = styles === null || styles === void 0 ? void 0 : styles.width) === null || _a === void 0 ? void 0 : _a.includes('%')) ? parseFloat((_b = styles === null || styles === void 0 ? void 0 : styles.width) === null || _b === void 0 ? void 0 : _b.replace('%', '')) : styles === null || styles === void 0 ? void 0 : styles.width;
      var w = findWidthPercentByPx(init.width, widthNow, cWidth, (colNumber || 0) > 1);
      setWidth(w);
      onResize && onResize(w, init.width);
    }
  };

  var handleResizeEnd = function handleResizeEnd(e, left) {
    if (init.clientX && init.width) {
      var grid = colNumber && colNumber % 2 !== 0 ? 3 : 10;
      onResizeColEnd && onResizeColEnd(init.width, gridValue(grid, width));
      onResize && onResize(width, init.width, true);
      onResizeEnd && onResizeEnd(width);
      setInit(function (prev) {
        return {
          width: prev.width,
          clientX: 0
        };
      });
      setWidth(0);
    }
  };

  var handleClick = function handleClick(e) {
    e.preventDefault();

    if (onClick) {
      onClick();
    }
  };

  return /*#__PURE__*/React.createElement("div", {
    className: classnames('rlb-resizable-container', resizable ? 'resizable' : '', noPadding ? 'no-padding' : '', isRow ? 'flex' : ''),
    ref: columnRef,
    style: {
      width: width ? "".concat(Math.round(width), "%") : styles === null || styles === void 0 ? void 0 : styles.width,
      maxWidth: maxWidth
    },
    "data-width": currentWidth,
    onClick: handleClick
  }, /*#__PURE__*/React.createElement("div", {
    className: "rlb-resizable-inner",
    style: {
      maxWidth: isSection ? styles === null || styles === void 0 ? void 0 : styles.width : '100%'
    }
  }, resizable ? /*#__PURE__*/React.createElement("div", {
    className: "rlb-resize-handler left",
    draggable: true,
    onDrag: function onDrag(e) {
      return handleResize(e, true);
    },
    onDragEnd: function onDragEnd(e) {
      handleResizeEnd();
    },
    "data-resizable-type": type
  }) : null, children, resizable ? /*#__PURE__*/React.createElement("div", {
    className: "rlb-resize-handler right",
    draggable: true,
    onDrag: function onDrag(e) {
      return handleResize(e, false);
    },
    onDragEnd: function onDragEnd(e) {
      handleResizeEnd();
    },
    "data-resizable-type": type
  }) : null));
};

export { ResizableContainer };
