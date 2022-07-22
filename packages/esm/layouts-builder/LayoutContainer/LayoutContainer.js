import { __assign } from '../../node_modules/tslib/tslib.es6.js';
import React, { useRef, useState, useContext, useEffect } from 'react';
import { createRenderableLayout } from '../helpers/createRendrableLayout.js';
import { LayoutRowContainer } from './LayoutRowContainer.js';
import { needRowTarget } from '../helpers/shouldShowRowTarget.js';
import { AppContext } from '../Context/AppContext.js';
import useSimpleDebounce from '../hooks/useDebounce.js';
import classnames from '../../node_modules/classnames/index.js';
import { useContainerIdentifier } from '../hooks/useContainerIdentifier.js';

var LayoutContainer = function LayoutContainer(_a) {
  var data = _a.data,
      stableKey = _a.stableDataKey,
      layouts = _a.layouts,
      disableChange = _a.disableChange,
      staticComponent = _a.staticComponent,
      _b = _a.colResize,
      colResize = _b === void 0 ? true : _b,
      maxColumns = _a.maxColumns,
      maxWidth = _a.maxWidth,
      renderComponent = _a.renderComponent,
      onLayoutChange = _a.onLayoutChange,
      imageSizeFnLoader = _a.imageSizeFnLoader,
      imageCheckerFn = _a.imageCheckerFn,
      onImageResizeFinished = _a.onImageResizeFinished,
      onClickColumn = _a.onClickColumn,
      onClickSection = _a.onClickSection;
  var containeRef = useRef(null);

  var _c = useState(false),
      runChange = _c[0],
      setRunChange = _c[1];

  var _d = useState([]),
      actualLayout = _d[0],
      setActualLayout = _d[1];

  var isSectionContainer = useContainerIdentifier().isSectionContainer;

  var _e = useState(false),
      dragActive = _e[0],
      setDragActive = _e[1];

  var setCurrentLayouts = useContext(AppContext).setCurrentLayouts;

  var _f = useState([]),
      renderableLayout = _f[0],
      setRenderableLayout = _f[1];

  var _g = useState(),
      position = _g[0],
      setPosition = _g[1];

  var debounced = useSimpleDebounce(position, 200);
  useEffect(function () {
    if (debounced) {
      var winH = window.innerHeight;
      var container = document.getElementById('container_layout_scroll');

      if (debounced.y < 150 && container) {
        container.scroll({
          behavior: 'smooth',
          top: debounced.y - 500,
          left: debounced.x
        });
      }

      if (debounced.y > winH - 150 && container) {
        container.scroll({
          behavior: 'smooth',
          top: debounced.y + 500,
          left: debounced.x
        });
      }
    }
  }, [debounced]);
  useEffect(function () {
    if (layouts && layouts.length > 0) {
      setActualLayout(layouts);
    }
  }, [layouts]);
  useEffect(function () {
    if (actualLayout.length > 0) {
      var renderable = createRenderableLayout(data, actualLayout, stableKey);
      setCurrentLayouts(actualLayout);
      setRenderableLayout(renderable);
    }
  }, [actualLayout, data]); // run layout update

  useEffect(function () {
    if (runChange) {
      onLayoutChange(actualLayout);
      setRunChange(false);
    }
  }, [runChange]);

  if (staticComponent) {
    return /*#__PURE__*/React.createElement("div", {
      className: "rlb-static-container",
      style: {
        maxWidth: maxWidth
      }
    }, data.map(function (item, index) {
      return renderComponent(item, {}, index);
    }));
  }

  var handleDragOverContainer = function handleDragOverContainer(e) {
    setPosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  var handleClickSection = function handleClickSection(section) {
    if (onClickSection) {
      onClickSection({
        sectionId: section.id
      });
    }
  };

  var handleClickColumn = function handleClickColumn(source) {
    if (onClickColumn) {
      onClickColumn(source);
    }
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "rlb-main-container m-auto",
    style: {
      maxWidth: maxWidth
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "min-h-[100px]",
    ref: containeRef,
    onDragOver: handleDragOverContainer,
    id: "layout_container"
  }, renderableLayout.map(function (section, sectionIndex) {
    return /*#__PURE__*/React.createElement("div", {
      key: section.id,
      className: "rlb-section rlb-section-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rlb-section-content",
      style: __assign({
        width: section.width,
        margin: 'auto'
      }, section.styles || {})
    }, /*#__PURE__*/React.createElement("div", {
      className: classnames(isSectionContainer(section) ? 'p-2' : '', section.className),
      onClick: function onClick(e) {
        return handleClickSection(section);
      }
    }, section.rows.map(function (row, rowIndex) {
      return /*#__PURE__*/React.createElement(LayoutRowContainer, {
        key: row.id,
        stableKey: stableKey,
        dragActive: dragActive,
        layouts: actualLayout,
        columns: row.columns,
        sectionId: section.id,
        rowId: row.id,
        disabled: disableChange,
        maxColumns: maxColumns,
        isLastSection: renderableLayout.length === sectionIndex + 1,
        isFirstSection: sectionIndex === 0,
        needRowTarget: needRowTarget(renderableLayout, row, {
          rows: section.rows,
          sectionIndex: sectionIndex,
          rowIndex: rowIndex
        }),
        colResize: colResize,
        renderComponent: renderComponent,
        setActualLayout: setActualLayout,
        onLayoutChange: onLayoutChange,
        imageCheckerFn: imageCheckerFn,
        imageSizeFnLoader: imageSizeFnLoader,
        onImageResizeFinished: onImageResizeFinished,
        setDragActive: setDragActive,
        onClickCol: function onClickCol(src) {
          return handleClickColumn(__assign(__assign({}, src), {
            rowId: row.id,
            sectionId: section.id
          }));
        }
      });
    }))));
  })));
};

export { LayoutContainer };
