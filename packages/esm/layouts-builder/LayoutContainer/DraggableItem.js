import { AppContext } from '../Context/AppContext.js';
import { findSourceLayout } from '../helpers/findSource.js';
import React, { useContext } from 'react';

var DraggableItem = function DraggableItem(_a) {
  var draggableId = _a.draggableId,
      children = _a.children;

  var _b = useContext(AppContext),
      currentLayouts = _b.currentLayouts,
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

      var div = document.querySelector("div[data-draggable-id=\"".concat(draggableId, "\"]"));
      var cloned = div === null || div === void 0 ? void 0 : div.cloneNode(true);
      cloned === null || cloned === void 0 ? void 0 : cloned.setAttribute("id", "clonedElement");
      document.body.appendChild(cloned);
      e.dataTransfer.setDragImage(cloned, 0, 0); // const el = document.querySelector(
      //   `div[data-draggable-id='${draggableId}']`,
      // );
      // if (el) {
      //   el.setAttribute('id', 'draggedDiv');
      // }
    },
    onDragEnd: function onDragEnd(e) {
      e.preventDefault();
      e.stopPropagation();
      var el = document.getElementById('clonedElement');
      el === null || el === void 0 ? void 0 : el.remove(); // if (el) {
      //   el.style.position = '';
      //   el.style.pointerEvents = '';
      //   el.style.position = '';
      //   el.style.top = ``;
      //   el.style.left = ``;
      //   el.style.width = ``;
      //   el.style.height = ``;
      //   el.style.maxWidth = ``;
      //   el.style.maxHeight = ``;
      //   el.style.overflow = ``;
      //   el.removeAttribute('id');
      // }
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    draggableProps: draggableAttributes,
    handleProps: {}
  }));
};

export { DraggableItem };
