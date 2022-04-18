import { __assign } from '../../../node_modules/tslib/tslib.es6.js';
import classnames from '../../../node_modules/classnames/index.js';
import React, { useState, useRef } from 'react';
import { DropTargetPlaceEnum } from '../../interface/internalType.js';

var DroppableColumnContainer = function DroppableColumnContainer(_a) {
  var children = _a.children,
      dndTargetKey = _a.dndTargetKey,
      width = _a.width,
      isSection = _a.isSection,
      currentColumLength = _a.currentColumLength,
      initialSize = _a.initialSize,
      resizingWidth = _a.resizingWidth,
      disableDrag = _a.disableDrag,
      className = _a.className,
      styles = _a.styles,
      onDropItem = _a.onDropItem,
      onResize = _a.onResize,
      onResizeStart = _a.onResizeStart,
      onResizeEnd = _a.onResizeEnd;

  var _b = useState(),
      droppableTarget = _b[0],
      setDroppableTarget = _b[1];

  var columnRef = useRef(null);

  var handleDragOver = function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    var targetEl = e.currentTarget;
    var targetDom = targetEl.getAttribute('target-droppable-item');

    if (targetDom && !isSection) {
      setDroppableTarget(targetDom);
    }
  };

  var isHoveredTargetClassNameSide = function isHoveredTargetClassNameSide(conditions) {
    return conditions ? 'rlb-droppable-side-hover' : 'rlb-droppable-side';
  };

  var handleDragOverLeave = function handleDragOverLeave(e) {
    e.preventDefault();
    setDroppableTarget('');
  };

  var handleDropToLeft = function handleDropToLeft(e) {
    e.preventDefault();
    onDropItem(e, DropTargetPlaceEnum.LEFT);
    setDroppableTarget('');
  };

  var handleDropToRigth = function handleDropToRigth(e) {
    e.preventDefault();
    onDropItem(e, DropTargetPlaceEnum.RIGHT);
    setDroppableTarget('');
  };

  var onDragStart = function onDragStart(e) {
    var _a;

    e.preventDefault();
    e.stopPropagation();
    if (initialSize) return;
    var columnWidth = ((_a = columnRef.current) === null || _a === void 0 ? void 0 : _a.clientWidth) || 1;
    var containerWidth = columnWidth * currentColumLength;
    var onePercentInPx = containerWidth / 100;
    var onePixelInPercent = 1 / onePercentInPx;
    onResizeStart(dndTargetKey, columnWidth, width, Math.round(onePixelInPercent * 100) / 100, e.clientX);
  };

  var handleResize = function handleResize(e) {
    e.preventDefault();
    e.stopPropagation();
    onDragStart(e);
    onResize(e);
  };

  var handleResizeLeft = function handleResizeLeft(e) {
    e.preventDefault();
    e.stopPropagation();
    onDragStart(e);
    onResize(e, true);
  };

  var handleDragEnd = function handleDragEnd() {
    onResizeEnd();
  };

  return /*#__PURE__*/React.createElement("div", {
    className: classnames('rlb-col', // `w-[${widthNumber}%]`,
    className),
    ref: columnRef,
    style: __assign(__assign({}, styles), {
      width: resizingWidth ? "".concat(resizingWidth, "%") : "".concat(width, "%")
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(isHoveredTargetClassNameSide(droppableTarget === "item-".concat(dndTargetKey, "-left"))),
    "target-droppable-item": "item-".concat(dndTargetKey, "-left"),
    onDragOver: disableDrag ? undefined : handleDragOver,
    onDragLeave: handleDragOverLeave,
    onDrop: handleDropToLeft
  }, droppableTarget === "item-".concat(dndTargetKey, "-left") ? 'Drop new column...' : null), !droppableTarget ? /*#__PURE__*/React.createElement("div", {
    className: "rlb-resize-handler",
    draggable: true,
    onDrag: handleResizeLeft,
    onDragEnd: function onDragEnd() {
      handleDragEnd();
    }
  }) : null, children, !droppableTarget ? /*#__PURE__*/React.createElement("div", {
    className: "rlb-resize-handler",
    draggable: true,
    onDrag: handleResize,
    onDragEnd: function onDragEnd() {
      handleDragEnd();
    }
  }) : null, /*#__PURE__*/React.createElement("div", {
    className: "".concat(isHoveredTargetClassNameSide(droppableTarget === "item-".concat(dndTargetKey, "-right"))),
    "target-droppable-item": "item-".concat(dndTargetKey, "-right"),
    onDragOver: handleDragOver,
    onDragLeave: handleDragOverLeave,
    onDrop: handleDropToRigth
  }, droppableTarget === "item-".concat(dndTargetKey, "-right") ? 'Drop new column...' : null));
};

export { DroppableColumnContainer };
