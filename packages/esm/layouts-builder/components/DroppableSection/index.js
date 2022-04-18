import React, { useState } from 'react';
import { DropTargetPlaceEnum } from '../../interface/internalType.js';

var DroppableSection = function DroppableSection(_a) {
  var children = _a.children,
      index = _a.index,
      dndTargetKey = _a.dndTargetKey,
      disableDrag = _a.disableDrag,
      onDropItem = _a.onDropItem,
      onDragStart = _a.onDragStart;

  var _b = useState(),
      droppableTarget = _b[0],
      setDroppableTarget = _b[1];

  var handleDragOver = function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    var targetEl = e.currentTarget;
    var targetDom = targetEl.getAttribute('target-droppable-section');

    if (targetDom && !disableDrag) {
      setDroppableTarget(targetDom);
    }
  };

  var isHoveredTargetClassName = function isHoveredTargetClassName(conditions) {
    return conditions ? 'rlb-droppable-setion-hover' : 'rlb-droppable-setion';
  };

  var handleDragOverLeave = function handleDragOverLeave(e) {
    setDroppableTarget('');
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "rlb-section",
    draggable: true,
    onDragStart: onDragStart
  }, /*#__PURE__*/React.createElement("div", {
    className: "rlb-setion-settings"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rlb-section-setting-title"
  }, "Section Settings")), index === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "".concat(isHoveredTargetClassName(droppableTarget === "".concat(dndTargetKey, "-top"))),
    "target-droppable-section": "".concat(dndTargetKey, "-top"),
    onDragOver: handleDragOver,
    onDrop: function onDrop(e) {
      onDropItem(e, DropTargetPlaceEnum.SECTION_TOP);
      setDroppableTarget('');
    },
    onDragLeave: handleDragOverLeave
  }, droppableTarget === "".concat(dndTargetKey, "-top") ? "Drop here as a section..." : null) : null, /*#__PURE__*/React.createElement("div", {
    className: "section-content"
  }, children), /*#__PURE__*/React.createElement("div", {
    className: "".concat(isHoveredTargetClassName(droppableTarget === "".concat(dndTargetKey, "-bottom"))),
    "target-droppable-section": "".concat(dndTargetKey, "-bottom"),
    onDragOver: handleDragOver,
    onDragLeave: handleDragOverLeave,
    onDrop: function onDrop(e) {
      onDropItem(e, DropTargetPlaceEnum.SECTION_BOTTOM);
      setDroppableTarget('');
    }
  }, droppableTarget === "".concat(dndTargetKey, "-bottom") ? 'Drop here as a section...' : null));
};

export { DroppableSection };
