import classnames from '../../../node_modules/classnames/index.js';
import React, { useState, useRef } from 'react';
import { DropTargetPlaceEnum } from '../../interface/internalType.js';

var DroppableColumnContainer = function DroppableColumnContainer(_a) {
  var children = _a.children,
      dndTargetKey = _a.dndTargetKey,
      isSection = _a.isSection,
      className = _a.className,
      disableChange = _a.disableChange;
      _a.isDragging;
      var onDropItem = _a.onDropItem;

  var _b = useState(),
      droppableTarget = _b[0],
      setDroppableTarget = _b[1];

  var _c = useState(false),
      hasDragOVer = _c[0],
      setHasDragOVer = _c[1];

  var columnRef = useRef(null);

  var handleDragOver = function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    setHasDragOVer(true);
    var targetEl = e.currentTarget;
    var targetDom = targetEl.getAttribute('target-droppable-item');

    if (targetDom && !isSection) {
      setDroppableTarget(targetDom);
    }
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

  return /*#__PURE__*/React.createElement("div", {
    className: classnames('rlb-col', // `w-[${widthNumber}%]`,
    className),
    ref: columnRef,
    onDragOver: function onDragOver() {
      return setHasDragOVer(true);
    },
    onMouseOver: function onMouseOver() {
      return setHasDragOVer(false);
    }
  }, !disableChange ? /*#__PURE__*/React.createElement("div", {
    className: classnames(droppableTarget === "".concat(dndTargetKey, "-left") ? 'rlb-droppable-side-hover' : '', 'ds-left rlb-droppable-side'),
    "target-droppable-item": "".concat(dndTargetKey, "-left"),
    onDragOver: handleDragOver,
    onDragLeave: handleDragOverLeave,
    onDrop: handleDropToLeft,
    style: hasDragOVer ? {
      display: "block",
      zIndex: 1999
    } : {}
  }) : null, children, !disableChange ? /*#__PURE__*/React.createElement("div", {
    className: classnames(droppableTarget === "".concat(dndTargetKey, "-right") ? 'rlb-droppable-side-hover' : '', 'ds-right rlb-droppable-side'),
    "target-droppable-item": "".concat(dndTargetKey, "-right"),
    onDragOver: handleDragOver,
    onDragLeave: handleDragOverLeave,
    onDrop: handleDropToRigth,
    style: hasDragOVer ? {
      display: "block",
      zIndex: 1999
    } : {}
  }) : null);
};

export { DroppableColumnContainer };
