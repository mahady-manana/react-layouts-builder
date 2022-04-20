import { SettingIcon } from '../../icons/index.js';
import React, { useState, useRef } from 'react';
import { DropTargetPlaceEnum } from '../../interface/internalType.js';
import classnames from '../../../node_modules/classnames/index.js';
import useClickAway from '../../../node_modules/react-use/esm/useClickAway.js';

var DroppableSection = function DroppableSection(_a) {
  var children = _a.children,
      index = _a.index,
      dndTargetKey = _a.dndTargetKey,
      disableDrag = _a.disableDrag,
      sections = _a.sections,
      disableChange = _a.disableChange,
      onDropItem = _a.onDropItem,
      onDragStart = _a.onDragStart,
      onChangeSectionStyles = _a.onChangeSectionStyles;

  var _b = useState(false),
      openSetting = _b[0],
      setOpenSetting = _b[1];

  var _c = useState(),
      droppableTarget = _c[0],
      setDroppableTarget = _c[1];

  var popoverRef = useRef(null);
  useClickAway(popoverRef, function () {
    setOpenSetting(false);
  });

  var handleDragOver = function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    var targetEl = e.currentTarget;
    var targetDom = targetEl.getAttribute('target-droppable-section');

    if (targetDom && !disableDrag) {
      setDroppableTarget(targetDom);
    }
  };

  var isHoveredTargetClassName = function isHoveredTargetClassName(conditions) {
    return conditions ? 'rlb-droppable-section-hover' : 'rlb-droppable-section';
  };

  var handleDragOverLeave = function handleDragOverLeave(e) {
    setDroppableTarget('');
  };

  var handleClickSetting = function handleClickSetting(e) {
    e.preventDefault();
    setOpenSetting(!openSetting);
  };

  var handleSectionStyles = function handleSectionStyles(key, value) {
    onChangeSectionStyles && onChangeSectionStyles(key, value);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, index === 0 && !disableChange ? /*#__PURE__*/React.createElement("div", {
    className: "".concat(isHoveredTargetClassName(droppableTarget === "".concat(dndTargetKey, "-top"))),
    "target-droppable-section": "".concat(dndTargetKey, "-top"),
    onDragOver: handleDragOver,
    onDrop: function onDrop(e) {
      onDropItem(e, DropTargetPlaceEnum.SECTION_TOP);
      setDroppableTarget('');
    },
    onDragLeave: handleDragOverLeave
  }, droppableTarget === "".concat(dndTargetKey, "-top") ? "Drop here as a section..." : null) : null, /*#__PURE__*/React.createElement("div", {
    className: classnames('rlb-section', !disableChange ? 'rlb-section-hover' : ''),
    draggable: !disableChange,
    onDragStart: onDragStart,
    style: {
      background: sections.backgroundColor,
      paddingBlock: (sections.spacing || 0) * 8
    }
  }, !disableChange ? /*#__PURE__*/React.createElement("div", {
    className: "rlb-section-settings",
    onClick: handleClickSetting
  }, /*#__PURE__*/React.createElement("span", null, "Settings"), /*#__PURE__*/React.createElement(SettingIcon, null)) : null, /*#__PURE__*/React.createElement("div", {
    className: "section-content",
    style: {
      maxWidth: sections.width,
      margin: 'auto'
    }
  }, children)), !disableChange ? /*#__PURE__*/React.createElement("div", {
    className: "".concat(isHoveredTargetClassName(droppableTarget === "".concat(dndTargetKey, "-bottom"))),
    "target-droppable-section": "".concat(dndTargetKey, "-bottom"),
    onDragOver: handleDragOver,
    onDragLeave: handleDragOverLeave,
    onDrop: function onDrop(e) {
      onDropItem(e, DropTargetPlaceEnum.SECTION_BOTTOM);
      setDroppableTarget('');
    }
  }, droppableTarget === "".concat(dndTargetKey, "-bottom") ? 'Drop here as a section...' : null) : null, openSetting && !disableChange ? /*#__PURE__*/React.createElement("div", {
    className: "rlb-section-setting-modal",
    ref: popoverRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-2 bg-gray-200"
  }, /*#__PURE__*/React.createElement("h5", null, "Section settings")), /*#__PURE__*/React.createElement("div", {
    className: "p-4",
    style: {
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", null, "Content width :"), /*#__PURE__*/React.createElement("div", {
    className: "p-2 rlb-range-input"
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: 0,
    max: 100,
    value: sections.contentWidth || 100,
    onChange: function onChange(e) {
      handleSectionStyles('contentWidth', parseFloat(e.target.value));
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "range-value"
  }, /*#__PURE__*/React.createElement("input", {
    min: 0,
    max: 100,
    className: "rlb-range-input-nb",
    type: "number",
    value: sections.contentWidth || 100,
    onChange: function onChange(e) {
      handleSectionStyles('contentWidth', parseFloat(e.target.value));
    }
  }), "(%)"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", null, "Max. Content width : "), /*#__PURE__*/React.createElement("div", {
    className: "p-2 rlb-range-input"
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: 320,
    max: 1920,
    value: sections.width || 1080,
    onChange: function onChange(e) {
      handleSectionStyles('width', parseFloat(e.target.value));
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "range-value"
  }, /*#__PURE__*/React.createElement("input", {
    min: 320,
    max: 1920,
    className: "rlb-range-input-nb",
    type: "number",
    value: sections.width || 1080,
    onChange: function onChange(e) {
      handleSectionStyles('width', parseFloat(e.target.value));
    }
  }), "(px)"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", null, "Section spacing : "), /*#__PURE__*/React.createElement("div", {
    className: "p-2 rlb-range-input"
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: 0,
    max: 10,
    value: sections.spacing,
    onChange: function onChange(e) {
      handleSectionStyles('spacing', parseFloat(e.target.value));
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "range-value"
  }, /*#__PURE__*/React.createElement("input", {
    className: "rlb-range-input-nb",
    type: "number",
    min: 0,
    max: 10,
    value: sections.spacing,
    onChange: function onChange(e) {
      handleSectionStyles('spacing', parseFloat(e.target.value));
    }
  }))))))) : null);
};

export { DroppableSection };
