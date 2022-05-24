import { TargetPlaceEnum } from '../interface/internalType.js';
import React, { useRef, useState, useEffect } from 'react';

var LayoutDropContainer = function LayoutDropContainer(_a) {
  var children = _a.children,
      disableChange = _a.disableChange,
      targetDROP = _a.targetDROP,
      setTargetDROP = _a.setTargetDROP,
      onDragOver = _a.onDragOver,
      onDragLeave = _a.onDragLeave,
      onDrop = _a.onDrop;
  var containerRef = useRef(null);
  var activeDropRef = useRef(null);

  var _b = useState(0),
      initY = _b[0],
      setInitY = _b[1];

  var _c = useState(0);
      _c[0];
      _c[1];

  var _d = useState(500),
      checkAnomalie = _d[0],
      setCheckAnomalie = _d[1];

  useEffect(function () {
    if (checkAnomalie > 10) {
      var timer = setTimeout(function () {
        setCheckAnomalie(function (prev) {
          return prev - 10;
        });
      }, 250);
      clearTimeout(timer);
    }

    if (checkAnomalie < 10) {
      setTargetDROP(undefined);
    }
  }, [checkAnomalie]);

  var handleDragOver = function handleDragOver(e) {
    var _a;

    e.preventDefault();

    if (disableChange) {
      return;
    }

    var winH = window.innerHeight;
    if (e.clientY < 200 || e.clientY > winH - 200) (_a = activeDropRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
      behavior: 'smooth'
    });

    if (!initY) {
      setInitY(e.clientY);
    }

    setCheckAnomalie(500);
    var nearest = findNearestTarget(e.clientX, e.clientY);

    if (nearest) {
      setTargetDROP(nearest);
      onDragOver(nearest);
    } else {
      onDragOver(nearest);
      setTargetDROP(undefined);
    }
  };

  var findNearestTarget = function findNearestTarget(clientX, clientY) {
    var _a, _b, _c;

    var height = (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.offsetHeight;
    var width = (_b = containerRef.current) === null || _b === void 0 ? void 0 : _b.offsetWidth;
    var boundingClient = (_c = containerRef.current) === null || _c === void 0 ? void 0 : _c.getBoundingClientRect();

    if (!height || !width || !(boundingClient === null || boundingClient === void 0 ? void 0 : boundingClient.left)) {
      return;
    }

    var demi = height / 2;
    var reference = clientY - boundingClient.top;
    var left = clientX - boundingClient.left;
    var shouldRight = width - left < 50 && width - left > 0;

    if (shouldRight) {
      return TargetPlaceEnum.RIGHT;
    }

    if (left < 50 && left > 0) {
      return TargetPlaceEnum.LEFT;
    }

    if (reference > demi) return TargetPlaceEnum.BOTTOM;
    if (reference < demi) return TargetPlaceEnum.TOP;
  };

  var onExit = function onExit(e) {
    if (disableChange) {
      return;
    }

    onDragLeave();
    setTargetDROP(undefined);
  };

  var handleDrop = function handleDrop(e) {
    e.preventDefault();

    if (disableChange) {
      return;
    }

    onDrop(e);
    setTargetDROP(undefined);
  };

  return /*#__PURE__*/React.createElement("div", {
    ref: containerRef,
    onDragOver: handleDragOver,
    onDragLeave: onExit,
    onDrop: handleDrop,
    className: disableChange ? 'rbl-vert-spacing' : ''
  }, !disableChange ? /*#__PURE__*/React.createElement("div", {
    className: "rbl-drop-item-indicator",
    style: {
      visibility: 'visible',
      display: targetDROP === TargetPlaceEnum.TOP ? 'block' : 'none'
    },
    ref: targetDROP === TargetPlaceEnum.TOP ? activeDropRef : null
  }) : null, children, !disableChange ? /*#__PURE__*/React.createElement("div", {
    className: "rbl-drop-item-indicator",
    style: {
      visibility: 'visible',
      display: targetDROP === TargetPlaceEnum.BOTTOM ? 'block' : 'none'
    },
    ref: targetDROP === TargetPlaceEnum.BOTTOM ? activeDropRef : null
  }) : null);
};

export { LayoutDropContainer };
