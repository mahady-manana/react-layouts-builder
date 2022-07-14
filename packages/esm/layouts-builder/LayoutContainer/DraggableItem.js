import { AppContext } from '../Context/AppContext.js';
import { findSourceLayout } from '../helpers/findSource.js';
import React, { useContext } from 'react';

var DraggableItem = function DraggableItem(_a) {
  var draggableId = _a.draggableId,
      children = _a.children;

  var _b = useContext(AppContext);
      _b.sourceId;
      _b.point;
      var currentLayouts = _b.currentLayouts,
      _onDragStart = _b.onDragStart,
      setSource = _b.setSource;

  var draggableAttributes = {
    draggable: true,
    draggableid: draggableId,
    onDragStart: function onDragStart(e) {
      e.stopPropagation();

      _onDragStart(draggableId);

      var source = findSourceLayout(currentLayouts, draggableId);

      if (source) {
        setSource(source);
      }

      var div = e.target;
      e.dataTransfer.setDragImage(div, 5000, 5000);
      var el = document.querySelector("div[data-draggable-id='".concat(draggableId, "']"));

      if (el) {
        el.setAttribute('id', 'draggedDiv');
      }
    },
    onDragEnd: function onDragEnd(e) {
      e.preventDefault();
      e.stopPropagation();
      var el = document.getElementById('draggedDiv');

      if (el) {
        el.style.position = '';
        el.style.pointerEvents = '';
        el.style.position = '';
        el.style.top = "";
        el.style.left = "";
        el.style.width = "";
        el.style.height = "";
        el.style.maxWidth = "";
        el.style.maxHeight = "";
        el.style.overflow = "";
        el.removeAttribute('id');
      }
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    draggableProps: draggableAttributes,
    handleProps: {}
  }));
};

export { DraggableItem };
