import React, { createContext, useState, useMemo } from 'react';

var AppContext = /*#__PURE__*/createContext({});
var LayoutProvider = function LayoutProvider(_a) {
  var children = _a.children;

  var _b = useState(),
      source = _b[0],
      setSource = _b[1];

  var _c = useState([]),
      currentLayouts = _c[0],
      setCurrentLayouts = _c[1];

  var _d = useState(),
      destination = _d[0],
      setDestination = _d[1];

  var _e = useState(false),
      isDragStart = _e[0],
      setIsDragStart = _e[1];

  var _f = useState({
    init: [],
    current: []
  }),
      point = _f[0],
      setPoint = _f[1];

  var onDragStart = function onDragStart(id) {// setSourceId(id);
  };

  var onDragEnd = function onDragEnd() {// setSourceId(undefined);
  };

  var context = useMemo(function () {
    return {
      source: source,
      destination: destination,
      point: point,
      isDragStart: isDragStart,
      currentLayouts: currentLayouts,
      setCurrentLayouts: setCurrentLayouts,
      setIsDragStart: setIsDragStart,
      setPoint: setPoint,
      setSource: setSource,
      setDestination: setDestination,
      onDragStart: onDragStart,
      onDragEnd: onDragEnd
    };
  }, [source, destination, point, isDragStart, currentLayouts]);
  return /*#__PURE__*/React.createElement(AppContext.Provider, {
    value: context
  }, children);
};

export { AppContext, LayoutProvider };
