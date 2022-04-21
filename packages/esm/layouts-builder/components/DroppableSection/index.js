import React, { useState, useRef } from 'react';
import classnames from '../../../node_modules/classnames/index.js';
import { ResizableContainer } from '../ResizableContainer/ResizableContainer.js';
import useClickAway from '../../../node_modules/react-use/esm/useClickAway.js';

var DroppableSection = function DroppableSection(_a) {
  var children = _a.children;
      _a.index;
      _a.dndTargetKey;
      _a.disableDrag;
      var section = _a.section;
      _a.disableChange;
      var // onDropItem,
  onDragStart = _a.onDragStart;

  var _b = useState(false);
      _b[0];
      var setOpenSetting = _b[1];

  var _c = useState();
      _c[0];
      _c[1];

  var popoverRef = useRef(null);
  useClickAway(popoverRef, function () {
    setOpenSetting(false);
  });

  return /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement(ResizableContainer, {
    resizable: true
  }, /*#__PURE__*/React.createElement("div", {
    className: classnames('rlb-section'),
    draggable: false,
    onDragStart: onDragStart,
    style: {
      background: section.backgroundColor,
      paddingBlock: (section.spacing || 0) * 8
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
