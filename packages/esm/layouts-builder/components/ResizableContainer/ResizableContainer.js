import classnames from '../../../node_modules/classnames/index.js';
import { gridValue } from '../../helpers/gridValue.js';
import React, { useState, useRef } from 'react';

var ResizableContainer = function ResizableContainer(_a) {
  var isRow = _a.isRow,
      resizable = _a.resizable,
      styles = _a.styles,
      children = _a.children;

  var _b = useState(),
      width = _b[0],
      setWidth = _b[1];

  var _c = useState({
    width: 0,
    clientX: 0
  }),
      init = _c[0],
      setInit = _c[1];

  var _d = useState();
      _d[0];
      _d[1];

  var columnRef = useRef(null); //   const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
  //     e.stopPropagation();
  //     e.preventDefault();
  //     const targetEl = e.currentTarget;
  //     const targetDom = targetEl.getAttribute('target-droppable-item');
  //     if (targetDom && !isSection) {
  //       setDroppableTarget(targetDom);
  //     }
  //   };
  //   const isHoveredTargetClassNameSide = (conditions: boolean) => {
  //     return conditions
  //       ? 'rlb-droppable-side-hover'
  //       : 'rlb-droppable-side';
  //   };
  //   const handleDragOverLeave = (e: DragEvent<HTMLDivElement>) => {
  //     e.preventDefault();
  //     setDroppableTarget('');
  //   };
  //   const handleDropToLeft = (e: DragEvent<HTMLDivElement>) => {
  //     e.preventDefault();
  //     onDropItem(e, DropTargetPlaceEnum.LEFT);
  //     setDroppableTarget('');
  //   };
  //   const handleDropToRigth = (e: DragEvent<HTMLDivElement>) => {
  //     e.preventDefault();
  //     onDropItem(e, DropTargetPlaceEnum.RIGHT);
  //     setDroppableTarget('');
  //   };

  var onDragStart = function onDragStart(e) {
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
    onDragStart(e);

    if (init.clientX && init.width) {
      var diff = init.clientX - e.clientX;
      var add = diff * 2;
      var addition = left ? add : -add;
      setWidth(init.width + addition);
    }
  };

  var handleDragEnd = function handleDragEnd(e, left) {
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
    }
  };

  return /*#__PURE__*/React.createElement("div", {
    className: classnames('rlb-resizable-container', resizable ? 'resizable' : '', isRow ? 'flex' : ''),
    ref: columnRef,
    style: {
      width: gridValue(50, width) || (styles === null || styles === void 0 ? void 0 : styles.width)
    }
  }, resizable ? /*#__PURE__*/React.createElement("div", {
    className: "rlb-resize-handler left",
    draggable: true,
    onDrag: function onDrag(e) {
      return handleResize(e, true);
    },
    onDragEnd: function onDragEnd(e) {
      handleDragEnd(e, true);
    }
  }) : null, children, resizable ? /*#__PURE__*/React.createElement("div", {
    className: "rlb-resize-handler right",
    draggable: true,
    onDrag: function onDrag(e) {
      return handleResize(e, false);
    },
    onDragEnd: function onDragEnd(e) {
      handleDragEnd(e, false);
    }
  }) : null);
};

export { ResizableContainer };
