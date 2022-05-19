import classnames from '../../../node_modules/classnames/index.js';
import React, { useRef, useState, useEffect } from 'react';

var DraggableItem = function DraggableItem(_a) {
  var children = _a.children,
      dndTargetKey = _a.dndTargetKey,
      disableChange = _a.disableChange,
      imageWidth = _a.imageWidth,
      isImage = _a.isImage,
      oneCol = _a.oneCol,
      _onDragStart = _a.onDragStart,
      onImageResizeFinished = _a.onImageResizeFinished;
  var containerRef = useRef(null);

  var _b = useState(0),
      width = _b[0],
      setWidth = _b[1];

  var _c = useState(0),
      finalWidth = _c[0],
      setFinalWidth = _c[1];

  var _d = useState(),
      initWidth = _d[0],
      setInitWidth = _d[1];

  var _e = useState(),
      initClientX = _e[0],
      setInitClientX = _e[1];

  var _f = useState(),
      direction = _f[0],
      setDirection = _f[1];

  var _g = useState(),
      percentPX = _g[0],
      setPercentPX = _g[1];

  var _h = useState(false),
      startResize = _h[0],
      setStartResize = _h[1];

  var _j = useState(500),
      waitBeforeUpdate = _j[0],
      setWaitBeforeUpdate = _j[1];

  useEffect(function () {
    if (imageWidth) {
      setWidth(imageWidth);
    }
  }, [imageWidth]);

  var _onMouseDown = function onMouseDown(e) {
    var _a, _b;

    if (!((_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.offsetWidth)) return;
    setInitWidth(imageWidth || 100);
    setStartResize(true);
    setInitClientX(e.clientX);
    var p1px = ((_b = containerRef.current) === null || _b === void 0 ? void 0 : _b.offsetWidth) / 100;
    setPercentPX(p1px);
  };

  var onMouseMouve = function onMouseMouve(e) {
    var newCX = e.clientX;

    if (initClientX && initWidth && startResize && percentPX && direction) {
      var diff = initClientX - newCX;
      var w = diff / percentPX;
      var dir = direction === 'left' ? w : -w;
      var isOneCol = oneCol ? dir * 2 : dir;

      var _final = initWidth + isOneCol;

      if (_final > 100) {
        setWidth(100);
        setFinalWidth(100);
      } else if (_final < 15) {
        setWidth(15);
        setFinalWidth(15);
      } else {
        setWidth(_final);
        setFinalWidth(_final);
      }
    }
  };

  var onMouseLeaveOrUp = function onMouseLeaveOrUp(e) {
    runIt();
  };

  var runIt = function runIt() {
    if (onImageResizeFinished && width && finalWidth) {
      onImageResizeFinished(width);
      setFinalWidth(0);
    }

    setInitWidth(0);
    setStartResize(false);
    setInitClientX(0);
    setPercentPX(0);
    setDirection(undefined);
  };

  useEffect(function () {
    if (waitBeforeUpdate > 10) {
      var timer = setTimeout(function () {
        setWaitBeforeUpdate(function (prev) {
          return prev - 10;
        });
      }, 250);
      clearTimeout(timer);
    }

    if (waitBeforeUpdate < 10) {
      runIt();
    }
  }, [waitBeforeUpdate]);
  return /*#__PURE__*/React.createElement("div", {
    draggable: startResize ? false : !disableChange,
    onDragStart: function onDragStart(e) {
      return _onDragStart(e, containerRef.current);
    },
    onDragEnd: function onDragEnd(e) {
      var _a;

      e.preventDefault();
      e.stopPropagation();
      (_a = document.getElementById('ghostElement')) === null || _a === void 0 ? void 0 : _a.remove();
    },
    className: classnames('rlb-draggable-container flex-grow', !disableChange ? 'draggable' : '', startResize ? 'resize-img' : ''),
    "data-draggable": dndTargetKey,
    "target-dnd-droppable": "".concat(dndTargetKey),
    ref: containerRef,
    onMouseMove: onMouseMouve,
    onMouseUp: onMouseLeaveOrUp,
    onMouseLeave: onMouseLeaveOrUp
  }, isImage ? /*#__PURE__*/React.createElement("div", {
    className: "image_rlb",
    style: {
      width: "".concat(width || 100, "%"),
      margin: oneCol ? 'auto' : undefined
    }
  }, !disableChange && oneCol ? /*#__PURE__*/React.createElement("div", {
    className: "image-resize imr-left",
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    style: {
      zIndex: startResize ? 999 : undefined
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hand-image",
    onMouseDown: function onMouseDown(e) {
      setDirection('left');

      _onMouseDown(e);
    }
  })) : null, children, !disableChange ? /*#__PURE__*/React.createElement("div", {
    className: "image-resize imr-right",
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    style: {
      zIndex: startResize ? 999 : undefined
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hand-image",
    onMouseDown: function onMouseDown(e) {
      setDirection('right');

      _onMouseDown(e);
    }
  })) : null) : children);
};

export { DraggableItem };
