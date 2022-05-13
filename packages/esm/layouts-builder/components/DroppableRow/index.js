import React, { useState } from 'react';
import { TargetPlaceEnum } from '../../interface/internalType.js';
import classnames from '../../../node_modules/classnames/index.js';

var DroppableRow = function DroppableRow(_a) {
  var children = _a.children,
      index = _a.index,
      dndTargetKey = _a.dndTargetKey,
      disableChange = _a.disableChange,
      onDropItem = _a.onDropItem;

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
    className: "".concat(isHoveredTargetClassName(droppableTarget === "".concat(dndTargetKey, "-top")), " top"),
    "target-droppable-row": "".concat(dndTargetKey, "-top"),
    onDragOver: handleDragOver,
    onDrop: function onDrop(e) {
      onDropItem(e, TargetPlaceEnum.ROW_TOP);
      setDroppableTarget('');
    },
    onDragLeave: handleDragOverLeave
  }) : null, /*#__PURE__*/React.createElement("div", {
    className: classnames('rlb-section')
  }, children), !disableChange ? /*#__PURE__*/React.createElement("div", {
    className: "".concat(isHoveredTargetClassName(droppableTarget === "".concat(dndTargetKey, "-bottom")), " bottom"),
    "target-droppable-row": "".concat(dndTargetKey, "-bottom"),
    onDragOver: handleDragOver,
    onDragLeave: handleDragOverLeave,
    onDrop: function onDrop(e) {
      onDropItem(e, TargetPlaceEnum.ROW_BOTTOM);
      setDroppableTarget('');
    }
  }) : null);
};

export { DroppableRow };
