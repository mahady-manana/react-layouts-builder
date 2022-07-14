import React, { createContext, useState, useMemo } from 'react';

var AppContext = /*#__PURE__*/createContext({});
var LayoutProvider = function LayoutProvider(_a) {
  var children = _a.children;

  var _b = useState(),
      sourceId = _b[0],
      setSourceId = _b[1];

  var _c = useState(),
      source = _c[0],
      setSource = _c[1];

  var _d = useState([]),
      currentLayouts = _d[0],
      setCurrentLayouts = _d[1];

  var _e = useState(),
      destination = _e[0],
      setDestination = _e[1];

  var _f = useState(false),
      isDragStart = _f[0],
      setIsDragStart = _f[1];

  var _g = useState({
    init: [],
    current: []
  }),
      point = _g[0],
      setPoint = _g[1];

  var onDragStart = function onDragStart(id) {
    setSourceId(id);
  };

  var onDragEnd = function onDragEnd() {
    setSourceId(undefined);
  };

  var context = useMemo(function () {
    return {
      source: source,
      destination: destination,
      point: point,
      isDragStart: isDragStart,
      sourceId: sourceId,
      currentLayouts: currentLayouts,
      setCurrentLayouts: setCurrentLayouts,
      setSourceId: setSourceId,
      setIsDragStart: setIsDragStart,
      setPoint: setPoint,
      setSource: setSource,
      setDestination: setDestination,
      onDragStart: onDragStart,
      onDragEnd: onDragEnd
    };
  }, [source, destination, point, isDragStart, sourceId, currentLayouts]);
  return /*#__PURE__*/React.createElement(AppContext.Provider, {
    value: context
  }, children);
};

export { AppContext, LayoutProvider };
