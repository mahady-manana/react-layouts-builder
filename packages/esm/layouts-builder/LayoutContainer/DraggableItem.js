import { AppContext } from '../Context/AppContext.js';
import { findSourceLayout } from '../helpers/findSource.js';
import React, { useContext } from 'react';

var DraggableItem = function DraggableItem(_a) {
  var draggableId = _a.draggableId,
      children = _a.children;

  var _b = useContext(AppContext),
      currentLayouts = _b.currentLayouts,
      _onDragStart = _b.onDragStart,
      setSource = _b.setSource,
      setIsDragStart = _b.setIsDragStart;

  var draggableAttributes = {
    draggable: true,
    draggableid: draggableId,
    onDragStart: function onDragStart(e) {
      e.stopPropagation();

      _onDragStart(draggableId);

      setIsDragStart(true);
      var source = findSourceLayout(currentLayouts, draggableId);

      if (source) {
        setSource(source);
      }

      var div = document.querySelector("div[data-draggable-id=\"".concat(draggableId, "\"]"));
      var cloned = div === null || div === void 0 ? void 0 : div.cloneNode(true);
      cloned === null || cloned === void 0 ? void 0 : cloned.setAttribute('id', 'clonedElement');
      document.body.appendChild(cloned);
      e.dataTransfer.setDragImage(cloned, 0, 0);
    },
    onDragEnd: function onDragEnd(e) {
      e.preventDefault();
      e.stopPropagation();
      setIsDragStart(false);
      var el = document.getElementById('clonedElement');
      el === null || el === void 0 ? void 0 : el.remove();
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    draggableProps: draggableAttributes,
    handleProps: {}
  }));
};

export { DraggableItem };
