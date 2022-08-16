import React, { useRef } from 'react';

var ResizableContainerComponent = function ResizableContainerComponent(_a) {
  var type = _a.type,
      resizable = _a.resizable,
      children = _a.children,
      resizing = _a.resizing,
      width = _a.width,
      isLast = _a.isLast,
      isNextTo = _a.isNextTo,
      colNumber = _a.colNumber,
      _onMouseDown = _a.onMouseDown;
  var columnRef = useRef(null);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "rlb-content-container",
    ref: columnRef,
    style: {
      width: colNumber > 1 ? width : "100%",
      flexGrow: isNextTo ? 1 : undefined
    },
    "data-resizable-type": type
  }, children), !isLast ? /*#__PURE__*/React.createElement("div", {
    className: "rlb-resize-handler",
    style: {
      opacity: resizing ? 1 : undefined
    },
    "data-resizable-type": type,
    onClick: function onClick(e) {
      e.stopPropagation();
      e.preventDefault();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: resizable ? 'resize-hand' : 'rbl-no-action',
    onMouseDown: function onMouseDown(e) {
      var _a;

      e.preventDefault();
      e.stopPropagation();
      _onMouseDown && _onMouseDown(e.clientX, ((_a = columnRef.current) === null || _a === void 0 ? void 0 : _a.clientWidth) || 0);
    }
  })) : null);
};

var ResizableContainer = /*#__PURE__*/React.memo(ResizableContainerComponent);

export { ResizableContainer };
