import classnames from '../../../node_modules/classnames/index.js';
import React, { useRef, useState, useEffect } from 'react';

var DraggableItem = function DraggableItem(_a) {
  var children = _a.children,
      dndTargetKey = _a.dndTargetKey,
      disableChange = _a.disableChange,
      sizes = _a.sizes,
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
    var _a, _b, _c;

    (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.removeAttribute('draggable');
    if (!((_b = containerRef.current) === null || _b === void 0 ? void 0 : _b.offsetWidth)) return;

    if (isBottom) {
      var h = containerRef.current.offsetHeight;
      setInitHeight((sizes === null || sizes === void 0 ? void 0 : sizes.height) || h);
      setInitClientY(e.clientY);
      return;
    }

    setInitWidth((sizes === null || sizes === void 0 ? void 0 : sizes.width) || 100);
    setStartResize(true);
    setInitClientX(e.clientX);
    var p1px = ((_c = containerRef.current) === null || _c === void 0 ? void 0 : _c.offsetWidth) / 100;
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
    var _a;

    if (disableChange) {
      return;
    }

    (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.setAttribute('draggable', "".concat(!disableChange));
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
  useEffect(function () {
    var _a, _b;

    if (height) {
      var img = document.querySelector("#rbl_image_".concat(dndTargetKey, " img"));

      if (img) {
        (_a = img === null || img === void 0 ? void 0 : img.style) === null || _a === void 0 ? void 0 : _a.setProperty('max-height', "".concat(height, "px"));
        (_b = img === null || img === void 0 ? void 0 : img.style) === null || _b === void 0 ? void 0 : _b.setProperty('object-fit', "cover");
      }
    }
  }, [height]);
  useEffect(function () {
    var _a;

    if (disableChange) {
      (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.removeAttribute('draggable');
    }
  }, [disableChange]);
  return /*#__PURE__*/React.createElement("div", {
    draggable: !disableChange,
    onDragStart: function onDragStart(e) {
      if (!disableChange) {
        _onDragStart(e, containerRef.current);

        e.currentTarget.setAttribute('id', 'draggedDiv');
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
        el.style.overflow = "";
        el.removeAttribute('id');
      }
    },
    //   // const cloned = e.currentTarget as HTMLDivElement;
    // onDrag={e => {
    //   // cloned.style.position = "fixed"
    //   // cloned.style.top = `${e.clientY}px`
    //   // cloned.style.left = `${e.clientX}px`
    // }}
    className: classnames('rlb-draggable-container flex-grow', !disableChange ? 'draggable' : '', startResize ? 'resize-img' : ''),
    "data-draggable": dndTargetKey,
    "target-dnd-droppable": "".concat(dndTargetKey),
    ref: containerRef,
    onMouseMove: onMouseMouve,
    onMouseUp: onMouseLeaveOrUp,
    onMouseLeave: onMouseLeaveOrUp
  }, isImage ? /*#__PURE__*/React.createElement("div", {
    className: "image_rlb",
    id: "rbl_image_".concat(dndTargetKey),
    style: {
      width: "".concat(width || 100, "%"),
      maxHeight: height ? height : (sizes === null || sizes === void 0 ? void 0 : sizes.height),
      margin: oneCol ? 'auto' : undefined
    }
  }, !disableChange && oneCol ? /*#__PURE__*/React.createElement("div", {
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
  })) : null, !disableChange ? /*#__PURE__*/React.createElement("div", {
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
  })) : null, children, !disableChange ? /*#__PURE__*/React.createElement("div", {
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
