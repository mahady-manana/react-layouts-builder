import React, { useState } from 'react';
import { DropTargetPlaceEnum } from '../../interface/internalType.js';
import classnames from '../../../node_modules/classnames/index.js';
import { ResizableContainer } from '../ResizableContainer/ResizableContainer.js';

var DroppableRow = function DroppableRow(_a) {
  var children = _a.children,
      index = _a.index,
      dndTargetKey = _a.dndTargetKey,
      disableDrag = _a.disableDrag,
      section = _a.section,
      disableChange = _a.disableChange,
      width = _a.width,
      onResize = _a.onResize,
      onDropItem = _a.onDropItem,
      onDragStart = _a.onDragStart;

  var _b = useState(),
      droppableTarget = _b[0],
      setDroppableTarget = _b[1];

  var handleDragOver = function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    var targetEl = e.currentTarget;
    var targetDom = targetEl.getAttribute('target-droppable-row');

    if (targetDom && !disableDrag) {
      setDroppableTarget(targetDom);
    }
  };

  var isHoveredTargetClassName = function isHoveredTargetClassName(conditions) {
    return conditions ? 'rlb-droppable-section hover' : 'rlb-droppable-section';
  };

  var handleDragOverLeave = function handleDragOverLeave(e) {
    setDroppableTarget('');
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, index === 0 && !disableChange ? /*#__PURE__*/React.createElement("div", {
    className: "".concat(isHoveredTargetClassName(droppableTarget === "".concat(dndTargetKey, "-top"))),
    "target-droppable-row": "".concat(dndTargetKey, "-top"),
    onDragOver: handleDragOver,
    onDrop: function onDrop(e) {
      onDropItem(e, DropTargetPlaceEnum.ROW_TOP);
      setDroppableTarget('');
    },
    onDragLeave: handleDragOverLeave
  }) : null, /*#__PURE__*/React.createElement(ResizableContainer, {
    isRow: true,
    resizable: true,
    styles: {
      width: width
    },
    onResize: onResize,
    currentWidth: width
  }, /*#__PURE__*/React.createElement("div", {
    className: classnames('rlb-section'),
    draggable: !disableChange,
    onDragStart: onDragStart,
    style: {
      background: section.backgroundColor,
      paddingBlock: (section.spacing || 0) * 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-content flex",
    style: {
      width: section.width,
      margin: 'auto'
    }
  }, children))), !disableChange ? /*#__PURE__*/React.createElement("div", {
    className: "".concat(isHoveredTargetClassName(droppableTarget === "".concat(dndTargetKey, "-bottom"))),
    "target-droppable-row": "".concat(dndTargetKey, "-bottom"),
    onDragOver: handleDragOver,
    onDragLeave: handleDragOverLeave,
    onDrop: function onDrop(e) {
      onDropItem(e, DropTargetPlaceEnum.ROW_BOTTOM);
      setDroppableTarget('');
    }
  }) : null);
};

export { DroppableRow };
