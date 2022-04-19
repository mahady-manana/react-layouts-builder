import { RgbaToHex, RgbaToString, hexToRGBA } from '../../helpers/colorHelper.js';
import React, { useState, useRef, useEffect } from 'react';
import { RgbaColorPicker, HexColorInput } from 'react-colorful';
import useClickAway from '../../../node_modules/react-use/esm/useClickAway.js';

function ColorPicker(_a) {
  var defaultColor = _a.defaultColor,
      label = _a.label,
      onChange = _a.onChange,
      onClose = _a.onClose;

  var _b = useState(defaultColor),
      color = _b[0],
      setColor = _b[1];

  var _c = useState(''),
      hexColor = _c[0],
      setHexColor = _c[1];

  var _d = useState(false),
      show = _d[0],
      setShow = _d[1];

  var popoverRef = useRef(null);
  useClickAway(popoverRef, function () {
    setShow(false);

    if (onClose) {
      onClose(color);
    }
  });
  var blackColor = {
    r: 68,
    g: 68,
    b: 68,
    a: 1
  };
  useEffect(function () {
    if (!defaultColor) {
      setColor(blackColor);
      return;
    }

    if (!show) setColor(defaultColor);
  }, [defaultColor, show === true]);
  useEffect(function () {
    if (color) {
      var hexCol = RgbaToHex(color);

      if (hexCol !== null) {
        setHexColor(hexCol);
      }
    }
  }, [color]);

  function updateColor(color) {
    setColor(color);
    if (onChange !== undefined) onChange(RgbaToString(color));
  }

  function updateColorViaHex(color) {
    setColor(hexToRGBA(color));
    if (onChange !== undefined) onChange(RgbaToString(hexToRGBA(color)));
  }

  function showHideColorPicker() {
    setShow(!show);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "mb-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "py-2 flex relative"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-medium"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "cursor-pointer rounded-full w-6 h-6  right-1 border-black ",
    style: {
      backgroundColor: RgbaToString(color),
      borderWidth: '0.86px',
      width: 30,
      height: 30,
      borderRadius: 30,
      marginLeft: 15
    },
    onClick: function onClick() {
      return showHideColorPicker();
    }
  })), show && /*#__PURE__*/React.createElement("div", {
    className: "py-3 flex flex-col gap-y-2 justify-center items-center popover",
    ref: popoverRef
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '95%'
    },
    className: "flex justify-center items-center"
  }, /*#__PURE__*/React.createElement(RgbaColorPicker, {
    color: color,
    onChange: updateColor
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(HexColorInput, {
    color: hexColor,
    onChange: updateColorViaHex
  }))));
}

export { ColorPicker as default };
