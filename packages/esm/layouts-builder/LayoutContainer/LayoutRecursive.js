import classnames from '../../node_modules/classnames/index.js';
import React from 'react';
import { ContaierDropElement } from './ContaierDropElement.js';
import { ContainerDragElement } from './ContainerDragElement.js';

var LayoutRecursive = function LayoutRecursive(_a) {
  var data = _a.data,
      onDrop = _a.onDrop,
      isRow = _a.isRow,
      type = _a.type;
  return /*#__PURE__*/React.createElement("div", {
    className: classnames(isRow ? 'lb-row' : '', "lb-".concat(type || 'wrapper'))
  }, data.map(function (container) {
    var _a, _b, _c, _d;

    return /*#__PURE__*/React.createElement(ContaierDropElement, {
      key: container.id,
      type: container.type,
      data: container,
      onDrop: onDrop
    }, /*#__PURE__*/React.createElement(ContainerDragElement, {
      data: container,
      type: container.type
    }, container.children ? /*#__PURE__*/React.createElement(LayoutRecursive, {
      isRow: ((_a = container.properties) === null || _a === void 0 ? void 0 : _a.orientation) === 'row',
      data: container.children,
      onDrop: onDrop,
      type: container.type
    }) : /*#__PURE__*/React.createElement("div", {
      className: "lb-block"
    }, ((_b = container.block) === null || _b === void 0 ? void 0 : _b.type) === 'text' ? /*#__PURE__*/React.createElement("p", null, (_c = container.block) === null || _c === void 0 ? void 0 : _c.textContent) : null, ((_d = container.block) === null || _d === void 0 ? void 0 : _d.type) === 'LINK' ? /*#__PURE__*/React.createElement("button", {
      className: "btn"
    }, container.block.buttonText) : null)));
  }));
};

export { LayoutRecursive };
