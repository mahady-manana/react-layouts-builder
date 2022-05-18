import React, { useRef, useState, useEffect } from 'react';
import { createRenderableLayout } from '../helpers/createRendrableLayout.js';
import { LayoutRowContainer } from './LayoutRowContainer.js';
import { needRowTarget } from '../helpers/shouldShowRowTarget.js';

var LayoutContainerComponent = function LayoutContainerComponent(_a) {
  var data = _a.data,
      renderComponent = _a.renderComponent,
      onLayoutChange = _a.onLayoutChange,
      stableKey = _a.stableDataKey,
      layouts = _a.layouts,
      imageSizeFnLoader = _a.imageSizeFnLoader,
      disableChange = _a.disableChange,
      staticComponent = _a.staticComponent,
      imageCheckerFn = _a.imageCheckerFn,
      onImageResizeFinished = _a.onImageResizeFinished;
  var containeRef = useRef(null);

  var _b = useState(false),
      runChange = _b[0],
      setRunChange = _b[1];

  var _c = useState([]),
      actualLayout = _c[0],
      setActualLayout = _c[1];

  var _d = useState(false),
      dragActive = _d[0],
      setDragActive = _d[1];

  var _e = useState([]),
      renderableLayout = _e[0],
      setRenderableLayout = _e[1];

  useEffect(function () {
    if (layouts && layouts.length > 0) {
      setActualLayout(layouts);
    }
  }, [layouts]);
  useEffect(function () {
    if (actualLayout.length > 0) {
      var renderable = createRenderableLayout(data, actualLayout, stableKey);
      setRenderableLayout(renderable);
    }
  }, [actualLayout, data]); // run layout update

  useEffect(function () {
    console.log("Test layout change and data change");

    if (runChange) {
      onLayoutChange(actualLayout);
      setRunChange(false);
    }
  }, [runChange]);

  if (staticComponent) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, data.map(function (item, index) {
      return renderComponent(item, {}, index);
    }));
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "m-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "min-h-[100px]",
    ref: containeRef
  }, renderableLayout.map(function (section, sectionIndex) {
    return /*#__PURE__*/React.createElement("div", {
      key: section.id,
      className: "rlb-section rlb-section-container",
      style: {
        background: section.backgroundImage ? "url(".concat(section.backgroundImage, ")") : section.backgroundColor,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "rlb-section-content",
      style: {
        width: section.width,
        margin: 'auto'
      }
    }, section.rows.map(function (row, rowIndex) {
      console.log("this run section section");
      return /*#__PURE__*/React.createElement(LayoutRowContainer, {
        key: row.id,
        stableKey: stableKey,
        dragActive: dragActive,
        layouts: actualLayout,
        columns: row.columns,
        sectionId: section.id,
        rowId: row.id,
        disabled: disableChange,
        isLastSection: renderableLayout.length === sectionIndex + 1,
        isFirstSection: sectionIndex === 0,
        needRowTarget: needRowTarget(renderableLayout, row, {
          rows: section.rows,
          sectionIndex: sectionIndex,
          rowIndex: rowIndex
        }),
        renderComponent: renderComponent,
        setActualLayout: setActualLayout,
        onLayoutChange: onLayoutChange,
        imageCheckerFn: imageCheckerFn,
        imageSizeFnLoader: imageSizeFnLoader,
        onImageResizeFinished: onImageResizeFinished,
        setDragActive: setDragActive
      });
    })));
  })));
};

var LayoutContainer = /*#__PURE__*/React.memo(LayoutContainerComponent);

export { LayoutContainer };
