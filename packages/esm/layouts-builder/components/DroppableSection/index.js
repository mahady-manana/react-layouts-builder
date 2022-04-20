import React, { useState, useRef } from 'react';
import { DropTargetPlaceEnum } from '../../interface/internalType.js';
import classnames from '../../../node_modules/classnames/index.js';
import { ResizableContainer } from '../ResizableContainer/ResizableContainer.js';
import useClickAway from '../../../node_modules/react-use/esm/useClickAway.js';

var DroppableSection = function DroppableSection(_a) {
  var children = _a.children,
      index = _a.index,
      dndTargetKey = _a.dndTargetKey,
      disableDrag = _a.disableDrag,
      sections = _a.sections,
      disableChange = _a.disableChange,
      onDropItem = _a.onDropItem,
      onDragStart = _a.onDragStart;
      _a.onChangeSectionStyles;

  var _b = useState(false);
      _b[0];
      var setOpenSetting = _b[1];

  var _c = useState(),
      droppableTarget = _c[0],
      setDroppableTarget = _c[1];

  var popoverRef = useRef(null);
  useClickAway(popoverRef, function () {
    setOpenSetting(false);
  });

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
    return conditions ? 'rlb-droppable-section-hover' : 'rlb-droppable-section';
  };

  var handleDragOverLeave = function handleDragOverLeave(e) {
    setDroppableTarget('');
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement(ResizableContainer, {
    resizable: true
  }, index === 0 && !disableChange ? /*#__PURE__*/React.createElement("div", {
    className: "".concat(isHoveredTargetClassName(droppableTarget === "".concat(dndTargetKey, "-top"))),
    "target-droppable-section": "".concat(dndTargetKey, "-top"),
    onDragOver: handleDragOver,
    onDrop: function onDrop(e) {
      onDropItem(e, DropTargetPlaceEnum.SECTION_TOP);
      setDroppableTarget('');
    },
    onDragLeave: handleDragOverLeave
  }, droppableTarget === "".concat(dndTargetKey, "-top") ? "Drop here as a section..." : null) : null, /*#__PURE__*/React.createElement("div", {
    className: classnames('rlb-section'),
    draggable: !disableChange,
    onDragStart: onDragStart,
    style: {
      background: sections.backgroundColor,
      paddingBlock: (sections.spacing || 0) * 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-content",
    style: {
      width: sections.width,
      margin: 'auto'
    }
  }, children)), !disableChange ? /*#__PURE__*/React.createElement("div", {
    className: "".concat(isHoveredTargetClassName(droppableTarget === "".concat(dndTargetKey, "-bottom"))),
    "target-droppable-section": "".concat(dndTargetKey, "-bottom"),
    onDragOver: handleDragOver,
    onDragLeave: handleDragOverLeave,
    onDrop: function onDrop(e) {
      onDropItem(e, DropTargetPlaceEnum.SECTION_BOTTOM);
      setDroppableTarget('');
    }
  }, droppableTarget === "".concat(dndTargetKey, "-bottom") ? 'Drop here as a section...' : null) : null));
};

export { DroppableSection };
