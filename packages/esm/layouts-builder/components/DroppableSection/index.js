import React from 'react';
import classnames from '../../../node_modules/classnames/index.js';
import { ResizableContainer } from '../ResizableContainer/ResizableContainer.js';

var DroppableSection = function DroppableSection(_a) {
  var children = _a.children,
      section = _a.section,
      resizable = _a.resizable,
      onDragStart = _a.onDragStart,
      onClickSection = _a.onClickSection,
      onResize = _a.onResize;
  console.log(section.backgroundImage);
  return /*#__PURE__*/React.createElement(ResizableContainer, {
    resizable: resizable,
    noPadding: true,
    onClick: onClickSection,
    type: "container",
    onResize: onResize
  }, /*#__PURE__*/React.createElement("div", {
    className: classnames('rlb-section rlb-section-container '),
    draggable: false,
    onDragStart: onDragStart,
    style: {
      background: section.backgroundImage ? "url(".concat(section.backgroundImage, ") no-repeat center") : section.backgroundColor,
      backgroundSize: 'cover',
      paddingBlock: (section.spacing || 0) * 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "rlb-section-content",
    style: {
      width: section.width,
      margin: 'auto'
    }
  }, children)));
};

export { DroppableSection };
