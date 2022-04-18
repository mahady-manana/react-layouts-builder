import React from 'react';

var DraggableItem = function DraggableItem(_a) {
  var children = _a.children,
      dndTargetKey = _a.dndTargetKey,
      onDragStart = _a.onDragStart;
  return /*#__PURE__*/React.createElement("div", {
    draggable: true,
    onDragStart: onDragStart,
    className: "flex-grow",
    "target-dnd-droppable": "".concat(dndTargetKey)
  }, children);
};

export { DraggableItem };
