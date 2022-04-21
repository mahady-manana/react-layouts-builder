import classnames from '../../../node_modules/classnames/index.js';
import { gridValue } from '../../helpers/gridValue.js';
import React, { useState, useRef } from 'react';

var ResizableContainer = function ResizableContainer(_a) {
  var isRow = _a.isRow,
      type = _a.type,
      resizable = _a.resizable,
      styles = _a.styles,
      children = _a.children,
      currentWidth = _a.currentWidth,
      noPadding = _a.noPadding,
      maxWidth = _a.maxWidth,
      onResize = _a.onResize,
      onClick = _a.onClick;

  var _b = useState(),
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
    var columnWidth = (_a = columnRef.current) === null || _a === void 0 ? void 0 : _a.clientWidth;
    setWidth(columnWidth);
    setInit({
      width: width || columnWidth || 0,
      clientX: e.clientX
    });
  };

  var handleResize = function handleResize(e, left) {
    e.preventDefault();
    e.stopPropagation();
    onResizeStart(e);

    if (init.clientX && init.width) {
      var diff = init.clientX - e.clientX;
      var add = diff * 2;
      var addition = left ? add : -add;
      var currentWidth_1 = init.width + addition;
      setWidth(currentWidth_1);
      onResize && onResize(currentWidth_1);
    }
  };

  var handleResizeEnd = function handleResizeEnd(e, left) {
    if (init.clientX && init.width) {
      var diff = init.clientX - e.clientX;
      var add = diff * 2;
      var addition = left ? add : -add;
      var finalWidth = init.width + addition;
      setWidth(finalWidth);
      setInit(function (prev) {
        return {
          width: prev.width,
          clientX: 0
        };
      });
      onResize && onResize(finalWidth);
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
      width: gridValue(50, width) || (styles === null || styles === void 0 ? void 0 : styles.width),
      maxWidth: maxWidth
    },
    "data-width": currentWidth,
    onClick: handleClick
  }, resizable ? /*#__PURE__*/React.createElement("div", {
    className: "rlb-resize-handler left",
    draggable: true,
    onDrag: function onDrag(e) {
      return handleResize(e, true);
    },
    onDragEnd: function onDragEnd(e) {
      handleResizeEnd(e, true);
    },
    "data-resizable-type": type
  }) : null, children, resizable ? /*#__PURE__*/React.createElement("div", {
    className: "rlb-resize-handler right",
    draggable: true,
    onDrag: function onDrag(e) {
      return handleResize(e, false);
    },
    onDragEnd: function onDragEnd(e) {
      handleResizeEnd(e, false);
    },
    "data-resizable-type": type
  }) : null);
};

export { ResizableContainer };
