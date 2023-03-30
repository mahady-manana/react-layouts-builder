import classnames from '../../node_modules/classnames/index.js';
import React from 'react';
import { ContaierDropElement } from './ContaierDropElement.js';
import { ContainerDragElement } from './ContainerDragElement.js';

var LayoutRecursive = function LayoutRecursive(_a) {
  var data = _a.data,
      onDrop = _a.onDrop,
      isRow = _a.isRow,
      type = _a.type,
      renderBlock = _a.renderBlock;
  return /*#__PURE__*/React.createElement("div", {
    className: classnames(isRow ? 'lb-row' : '', "lb-".concat(type || 'wrapper'))
  }, data.map(function (container) {
    var _a;

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
      type: container.type,
      renderBlock: renderBlock
    }) : /*#__PURE__*/React.createElement("div", {
      className: "lb-block"
    }, container.block ? renderBlock(container.block) : null)));
  }));
};

export { LayoutRecursive };
