import React, { useState } from 'react';
import { DropTargetPlaceEnum } from '../../interface/internalType.js';
import classnames from '../../../node_modules/classnames/index.js';
import { ResizableContainer } from '../ResizableContainer/ResizableContainer.js';

var DroppableRow = function DroppableRow(_a) {
  var children = _a.children,
      index = _a.index,
      dndTargetKey = _a.dndTargetKey,
      section = _a.section,
      disableChange = _a.disableChange,
      width = _a.width,
      maxWidth = _a.maxWidth,
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

    if (targetDom && !disableChange) {
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
    resizable: !disableChange,
    styles: {
      width: width
    },
    onResize: onResize,
    currentWidth: width,
    maxWidth: maxWidth
  }, /*#__PURE__*/React.createElement("div", {
    className: classnames('rlb-section'),
    draggable: !disableChange,
    onDragStart: onDragStart,
    style: {
      paddingBlock: (section.spacing || 0) * 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-content flex",
    style: {
      width: '100%',
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
