import { __assign } from '../../node_modules/tslib/tslib.es6.js';
import React from 'react';
import { useDrag } from '../../node_modules/react-dnd/dist/hooks/useDrag/useDrag.js';

function ContainerDragElement(props) {
  var _a = useDrag(function () {
    return {
      type: props.type,
      item: {
        data: props.data
      }
    };
  }),
      collected = _a[0],
      drag = _a[1],
      dragPreview = _a[2];

  return collected.isDragging ? /*#__PURE__*/React.createElement("div", {
    ref: dragPreview
  }) : /*#__PURE__*/React.createElement("div", __assign({
    ref: drag
  }, collected, {
    className: "draggable-container lb-dg-".concat(props.type)
  }), props.children);
}

export { ContainerDragElement };
