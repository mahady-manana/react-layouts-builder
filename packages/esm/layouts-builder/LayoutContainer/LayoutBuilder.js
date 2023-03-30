import { HTML5Backend } from '../../node_modules/react-dnd-html5-backend/dist/index.js';
import React, { useState, useEffect } from 'react';
import { handleDropItem } from '../helpers/handleDraAndDrop.js';
import { LayoutRecursive } from './LayoutRecursive.js';
import { DndProvider } from '../../node_modules/react-dnd/dist/core/DndProvider.js';

var LayoutBuilder = function LayoutBuilder(_a) {
  var layouts = _a.layouts,
      renderComponent = _a.renderComponent,
      onLayoutChange = _a.onLayoutChange;

  var _b = useState([]),
      internalLayouts = _b[0],
      setInternalLayouts = _b[1];

  var handleDrop = function handleDrop(options) {
    if (options.item.id === options.targetItemId) return;
    setInternalLayouts(function (prev) {
      var newLayouts = handleDropItem(prev, options);

      if (newLayouts) {
        onLayoutChange(newLayouts);
        return newLayouts;
      }

      return prev;
    });
  };

  useEffect(function () {
    setInternalLayouts(layouts);
  }, [layouts]);
  return /*#__PURE__*/React.createElement(DndProvider, {
    backend: HTML5Backend
  }, internalLayouts.length ? /*#__PURE__*/React.createElement(LayoutRecursive, {
    data: internalLayouts,
    onDrop: handleDrop,
    renderBlock: renderComponent
  }) : /*#__PURE__*/React.createElement("p", null, "Loading..."));
};

export { LayoutBuilder };
