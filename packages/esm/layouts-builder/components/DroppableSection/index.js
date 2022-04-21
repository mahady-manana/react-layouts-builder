import React, { useRef } from 'react';
import classnames from '../../../node_modules/classnames/index.js';
import { ResizableContainer } from '../ResizableContainer/ResizableContainer.js';

var DroppableSection = function DroppableSection(_a) {
  var children = _a.children,
      section = _a.section,
      onDragStart = _a.onDragStart,
      onClickSection = _a.onClickSection,
      onResize = _a.onResize;
  useRef(null);
  return /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement(ResizableContainer, {
    resizable: true,
    noPadding: true,
    onClick: onClickSection,
    type: "container",
    onResize: onResize
  }, /*#__PURE__*/React.createElement("div", {
    className: classnames('rlb-section'),
    draggable: false,
    onDragStart: onDragStart,
    style: {
      background: section.backgroundImage ? "url(".concat(section.backgroundImage, ") no-repeat center") : section.backgroundColor,
      paddingBlock: (section.spacing || 0) * 8,
      backgroundSize: 'cover'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-content",
    style: {
      width: section.width,
      margin: 'auto'
    }
  }, children))));
};

export { DroppableSection };
