import React from 'react';
import classnames from '../../../node_modules/classnames/index.js';

var DroppableSection = function DroppableSection(_a) {
  var children = _a.children,
      section = _a.section;
      _a.width;
      _a.resizable;
      _a.onDragStart;
      _a.onClickSection;
      _a.onResize;
  return /*#__PURE__*/React.createElement("div", {
    className: classnames('rlb-section rlb-section-container '),
    // draggable={false}
    // onDragStart={onDragStart}
    style: {
      background: section.backgroundImage ? "url(".concat(section.backgroundImage, ")") : section.backgroundColor,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "rlb-section-content",
    style: {
      width: section.width,
      margin: 'auto'
    }
  }, children));
};

export { DroppableSection };
