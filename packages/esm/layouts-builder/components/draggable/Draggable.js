import classnames from '../../../node_modules/classnames/index.js';
import React from 'react';

var DraggableItem = function DraggableItem(_a) {
  var children = _a.children,
      dndTargetKey = _a.dndTargetKey,
      disableChange = _a.disableChange,
      _onClick = _a.onClick,
      onDragStart = _a.onDragStart;
  return /*#__PURE__*/React.createElement("div", {
    draggable: !disableChange,
    onDragStart: onDragStart,
    className: classnames('rlb-draggable-container flex-grow', !disableChange ? 'draggable' : ''),
    "data-draggable": dndTargetKey,
    "target-dnd-droppable": "".concat(dndTargetKey),
    onClick: function onClick() {
      return _onClick && _onClick();
    }
  }, children);
};

export { DraggableItem };
