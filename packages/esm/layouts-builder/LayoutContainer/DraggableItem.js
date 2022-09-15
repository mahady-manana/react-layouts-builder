import { AppContext } from '../Context/AppContext.js';
import { findSourceLayout } from '../helpers/findSource.js';
import React, { useContext, useState } from 'react';

var DraggableItem = function DraggableItem(_a) {
  var draggableId = _a.draggableId,
      children = _a.children;

  var _b = useContext(AppContext),
      currentLayouts = _b.currentLayouts,
      _onDragStart = _b.onDragStart,
      setSource = _b.setSource,
      setIsDragStart = _b.setIsDragStart;

  var _c = useState(false),
      touchStart = _c[0];
      _c[1];

  var _d = useState({
    x: 0,
    y: 0
  }),
      postion = _d[0];
      _d[1];

  var draggableAttributes = {
    draggable: true,
    draggableid: draggableId,
    onDragStart: function onDragStart(e) {
      // if (e.cancelable) {
      //   e.preventDefault();
      // }
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
    } // onTouchStart: (e: TouchEvent<HTMLDivElement>) => {
    //   const pos = e.changedTouches[0];
    //   setPostion({
    //     x: pos.clientX,
    //     y: pos.clientY,
    //   });
    //   setTouchStart(true);
    //   const el = document.getElementById('clonedElement');
    //   el?.remove();
    // },
    // onTouchMove: (e) => {
    //   const pos = e.changedTouches[0];
    //   setPostion({
    //     x: pos.clientX,
    //     y: pos.clientY,
    //   });
    //   // const el = document.getElementById('clonedElement');
    //   // el?.remove();
    // },
    // onTouchEnd: (e) => {
    //   setTouchStart(false);
    //   console.log(e);
    //   const el = document.getElementById('clonedElement');
    //   el?.remove();
    // },
    // onTouchCancel: (e) => {
    //   setTouchStart(false);
    //   console.log(e);
    // },

  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    draggableProps: draggableAttributes,
    handleProps: {},
    styles: touchStart ? {
      position: 'fixed',
      top: postion.y,
      left: postion.x,
      zIndex: 9999
    } : {}
  }), touchStart ? /*#__PURE__*/React.createElement("div", {
    className: "target-it",
    style: {
      padding: 25
    }
  }, /*#__PURE__*/React.createElement("p", null, "Place here")) : null);
};

export { DraggableItem };
