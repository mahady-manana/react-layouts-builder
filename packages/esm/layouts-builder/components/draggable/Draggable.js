import classnames from '../../../node_modules/classnames/index.js';
import React, { useRef, useState, useEffect, useCallback } from 'react';

var DraggableItem = function DraggableItem(_a) {
  var children = _a.children,
      dndTargetKey = _a.dndTargetKey,
      disableChange = _a.disableChange,
      sizes = _a.sizes,
      isImage = _a.isImage,
      oneCol = _a.oneCol,
      isMobile = _a.isMobile,
      isCenter = _a.isCenter,
      isButton = _a.isButton,
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

  var _g = useState(0),
      height = _g[0],
      setHeight = _g[1];

  var _h = useState(0),
      finalHeight = _h[0],
      setFinalHeight = _h[1];

  var _j = useState(),
      initHeight = _j[0],
      setInitHeight = _j[1];

  var _k = useState(0),
      initClientY = _k[0],
      setInitClientY = _k[1];

  var _l = useState(),
      percentPX = _l[0],
      setPercentPX = _l[1];

  var _m = useState(false),
      startResize = _m[0],
      setStartResize = _m[1];

  var _o = useState(500),
      waitBeforeUpdate = _o[0],
      setWaitBeforeUpdate = _o[1];

  useEffect(function () {
    if (sizes === null || sizes === void 0 ? void 0 : sizes.width) {
      setWidth(sizes.width);
    }
  }, [sizes === null || sizes === void 0 ? void 0 : sizes.width]);
  useEffect(function () {
    if (sizes === null || sizes === void 0 ? void 0 : sizes.height) {
      setHeight(sizes.height);
    }
  }, [sizes === null || sizes === void 0 ? void 0 : sizes.height]);

  var _onMouseDown = function onMouseDown(e, isBottom) {
    var _a, _b;

    if (!((_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.offsetWidth)) return;

    if (isBottom) {
      var h = containerRef.current.offsetHeight;
      setInitHeight((sizes === null || sizes === void 0 ? void 0 : sizes.height) || h);
      setInitClientY(e.clientY);
      return;
    }

    setInitWidth((sizes === null || sizes === void 0 ? void 0 : sizes.width) || 100);
    setStartResize(true);
    setInitClientX(e.clientX);
    var p1px = ((_b = containerRef.current) === null || _b === void 0 ? void 0 : _b.offsetWidth) / 100;
    setPercentPX(p1px);
  };

  var onMouseMouve = function onMouseMouve(e) {
    var newCX = e.clientX;
    var newCY = e.clientY;

    if (direction === 'vertical' && initHeight) {
      var diff = initClientY - newCY;

      var _final = initHeight - diff;

      if (_final < 100) {
        setHeight(100);
        setFinalHeight(100);
      } else {
        setHeight(_final);
        setFinalHeight(_final);
      }

      return;
    }

    if (initClientX && initWidth && startResize && percentPX && direction) {
      var diff = initClientX - newCX;
      var w = diff / percentPX;
      var dir = direction === 'left' ? w : -w;
      var isOneCol = oneCol || isCenter ? dir * 2 : dir;

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
      onImageResizeFinished({
        width: width
      });
      setFinalWidth(0);
    }

    if (onImageResizeFinished && height && finalHeight) {
      onImageResizeFinished({
        height: height
      });
      setFinalHeight(0);
    }

    setInitWidth(0);
    setStartResize(false);
    setInitClientX(0);
    setPercentPX(0);
    setDirection(undefined);
    setInitClientY(0);
    setInitHeight(0);
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
  var imageSize = useCallback(function () {
    var _a, _b, _c, _d;

    var img = document.querySelector("#rbl_image_".concat(dndTargetKey, " img"));

    if (img && height && !isMobile) {
      if (img) {
        (_a = img === null || img === void 0 ? void 0 : img.style) === null || _a === void 0 ? void 0 : _a.setProperty('max-height', "".concat(height, "px"));
        (_b = img === null || img === void 0 ? void 0 : img.style) === null || _b === void 0 ? void 0 : _b.setProperty('object-fit', "cover");
      }
    }

    if (img && isMobile) {
      if (img) {
        (_c = img === null || img === void 0 ? void 0 : img.style) === null || _c === void 0 ? void 0 : _c.setProperty('max-height', null);
        (_d = img === null || img === void 0 ? void 0 : img.style) === null || _d === void 0 ? void 0 : _d.setProperty('object-fit', "cover");
      }
    }
  }, [height, isImage, isMobile]);
  useEffect(function () {
    imageSize();
  }, [imageSize]);
  return /*#__PURE__*/React.createElement("div", {
    className: classnames('rlb-draggable-container flex-grow', !disableChange ? 'draggable' : '', startResize ? 'resize-img' : ''),
    "data-draggable": dndTargetKey,
    "data-draggable-id": dndTargetKey,
    "target-dnd-droppable": "".concat(dndTargetKey),
    ref: containerRef,
    onMouseMove: onMouseMouve,
    onMouseUp: onMouseLeaveOrUp,
    onMouseLeave: onMouseLeaveOrUp,
    id: "rbl_image_".concat(dndTargetKey)
  }, isImage || isButton ? /*#__PURE__*/React.createElement("div", {
    className: "image_rlb",
    style: {
      width: isMobile ? '100%' : "".concat(width || 100, "%"),
      maxHeight: height ? (height || (sizes === null || sizes === void 0 ? void 0 : sizes.height) || 0) + 30 : undefined,
      margin: oneCol || isCenter ? 'auto' : undefined
    }
  }, !disableChange && oneCol && !isMobile ? /*#__PURE__*/React.createElement("div", {
    className: "image-resize imr-left",
    onClick: function onClick(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    style: {
      zIndex: startResize ? 999 : undefined
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hand-image",
    onMouseDown: function onMouseDown(e) {
      e.preventDefault();
      setDirection('left');

      _onMouseDown(e);
    }
  })) : null, !disableChange && !isButton && !isMobile ? /*#__PURE__*/React.createElement("div", {
    className: "image-resize-bottom",
    onClick: function onClick(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    style: {
      zIndex: startResize ? 999 : undefined
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hand-image",
    onMouseDown: function onMouseDown(e) {
      e.preventDefault();
      setDirection('vertical');

      _onMouseDown(e, true);
    }
  })) : null, children, !disableChange && !isMobile ? /*#__PURE__*/React.createElement("div", {
    className: "image-resize imr-right",
    onClick: function onClick(e) {
      e.preventDefault();
      e.stopPropagation();
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
