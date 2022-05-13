import React, { useState } from 'react';
import { DropTargetPlaceEnum } from '../../interface/internalType.js';

var DroppableColumnItem = function DroppableColumnItem(_a) {
  var children = _a.children,
      dndTargetKey = _a.dndTargetKey,
      isSection = _a.isSection,
      disableChange = _a.disableChange,
      onDropItem = _a.onDropItem;

  var _b = useState(),
      droppableTarget = _b[0],
      setDroppableTarget = _b[1];

  var handleDragOver = function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    var targetEl = e.currentTarget;
    var targetDom = targetEl.getAttribute('target-droppable-item');

    if (targetDom && !isSection) {
      setDroppableTarget(targetDom);
    }
  };

  var isHoveredTargetClassName = function isHoveredTargetClassName(conditions) {
    return conditions ? 'rlb-droppable-item rlb-droppable-item-hover' : 'rlb-droppable-item';
  };

  var handleDragOverLeave = function handleDragOverLeave(e) {
    setDroppableTarget('');
  };

  var handleDropToTop = function handleDropToTop(e) {
    e.preventDefault();
    onDropItem(e, DropTargetPlaceEnum.TOP);
    setDroppableTarget('');
  };

  var handleDropToBottom = function handleDropToBottom(e) {
    e.preventDefault();
    onDropItem(e, DropTargetPlaceEnum.BOTTOM);
    setDroppableTarget('');
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, !disableChange ? /*#__PURE__*/React.createElement("div", {
    className: "".concat(isHoveredTargetClassName(droppableTarget === "".concat(dndTargetKey, "-top")), " top"),
    "target-droppable-item": "".concat(dndTargetKey, "-top"),
    onDragOver: handleDragOver,
    onDragLeave: handleDragOverLeave,
    onDrop: handleDropToTop
  }, droppableTarget === "".concat(dndTargetKey, "-top") ? '.' : null) : null, children, !disableChange ? /*#__PURE__*/React.createElement("div", {
    className: "".concat(isHoveredTargetClassName(droppableTarget === "".concat(dndTargetKey, "-bottom")), " bottom"),
    "target-droppable-item": "".concat(dndTargetKey, "-bottom"),
    onDragOver: handleDragOver,
    onDragLeave: handleDragOverLeave,
    onDrop: handleDropToBottom
  }, droppableTarget === "".concat(dndTargetKey, "-bottom") ? '.' : null) : null);
};

export { DroppableColumnItem };
