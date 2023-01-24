import { AppContext } from '../Context/AppContext.js';
import { findSourceLayout } from '../helpers/findSource.js';
import React, { useContext, useRef, useEffect } from 'react';

var DraggableItem = function DraggableItem(_a) {
  var draggableId = _a.draggableId,
      children = _a.children;

  var _b = useContext(AppContext),
      currentLayouts = _b.currentLayouts,
      onDragStart = _b.onDragStart,
      setSource = _b.setSource,
      setIsDragStart = _b.setIsDragStart;

  var ref = useRef(null);

  var handleDragStart = function handleDragStart(event) {
    event.stopPropagation();
    onDragStart(draggableId);
    setIsDragStart(true);
    var source = findSourceLayout(currentLayouts, draggableId);

    if (source) {
      setSource(source);
    }

    var div = document.querySelector("div[data-draggable-id=\"".concat(draggableId, "\"]"));
    var cloned = div === null || div === void 0 ? void 0 : div.cloneNode(true);
    cloned === null || cloned === void 0 ? void 0 : cloned.setAttribute('id', 'clonedElement');
    document.body.appendChild(cloned);
    event.dataTransfer.setDragImage(cloned, 0, 0);
  };

  useEffect(function () {
    var node = ref.current;

    if (node) {
      node.addEventListener('dragstart', handleDragStart);
    }

    return function () {
      if (node) {
        node.removeEventListener('dragstart', handleDragStart);
      }
    };
  }, [ref]);

  var handleEnd = function handleEnd(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragStart(false);
    var el = document.getElementById('clonedElement');
    el === null || el === void 0 ? void 0 : el.remove();
  };

  useEffect(function () {
    var node = ref.current;

    if (node) {
      node.addEventListener('dragend', handleEnd);
    }

    return function () {
      if (node) {
        node.removeEventListener('dragend', handleEnd);
      }
    };
  }, [ref]);
  var draggableAttributes = {
    draggable: true,
    draggableid: draggableId,
    ref: ref
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    draggableProps: draggableAttributes,
    handleProps: {}
  }));
};

export { DraggableItem };
