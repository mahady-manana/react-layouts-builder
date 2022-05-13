import React, { useRef, useState, useEffect } from 'react';
import '../../node_modules/classnames/index.js';
import { ILayoutTargetEnum } from '../interface/internalType.js';
import { DroppableSection } from '../components/DroppableSection/index.js';
import { createRenderableLayout } from '../helpers/createRendrableLayout.js';
import { DroppableRow } from '../components/DroppableRow/index.js';
import { reorderLayout } from '../helpers/reorderLayout.js';
import { changeSectionStyles } from '../helpers/changeSectionStyles.js';
import { LayoutRowContainer } from './LayoutRowContainer.js';

var LayoutContainer = function LayoutContainer(_a) {
  var data = _a.data,
      renderComponent = _a.renderComponent,
      onLayoutChange = _a.onLayoutChange,
      stableKey = _a.stableDataKey,
      layouts = _a.layouts,
      disableChange = _a.disableChange,
      _onClickSection = _a.onClickSection,
      staticComponent = _a.staticComponent;
  var containeRef = useRef(null);

  var _b = useState(false),
      runChange = _b[0],
      setRunChange = _b[1];

  var _c = useState([]),
      actualLayout = _c[0],
      setActualLayout = _c[1];

  var _d = useState([]),
      renderableLayout = _d[0],
      setRenderableLayout = _d[1];

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
    if (runChange) {
      onLayoutChange(actualLayout);
      setRunChange(false);
    }
  }, [runChange]); // Drop item to create new column or setion or add item to column

  var handleDropItem = function handleDropItem(e, target, sectionId, columnId, rowId, itemKey, layoutTarget) {
    var sourceItemKey = e.dataTransfer.getData('itemKey');
    var isSection = e.dataTransfer.getData('isSection');
    var sourceSectionId = e.dataTransfer.getData('sectionId');
    var sourceColumnKey = e.dataTransfer.getData('colmunId');
    var sourceRowId = e.dataTransfer.getData('rowId');
    var itemKeyType = e.dataTransfer.getData('itemKeyType');
    var source = {
      columnId: sourceColumnKey,
      itemKey: itemKeyType === 'number' ? parseFloat(sourceItemKey) : sourceItemKey,
      sectionId: sourceSectionId,
      isSection: !!isSection,
      rowId: sourceRowId
    };
    var destination = {
      columnId: columnId,
      itemKey: itemKey,
      sectionId: sectionId,
      targetPlace: target,
      rowId: rowId
    };

    if (!itemKey && !sourceItemKey) {
      // this is used to prevent drag resize to create new item
      return;
    }

    var newLayout = reorderLayout(actualLayout, source, destination, target, layoutTarget);

    if (newLayout) {
      setActualLayout(newLayout);
      onLayoutChange(newLayout);
    }
  };

  var handleDragSectionStart = function handleDragSectionStart(e, sectionId) {
    e.stopPropagation();
    e.dataTransfer.setData('sectionId', sectionId);
    e.dataTransfer.setData('isSection', 'section');
  };

  var handleResizeSection = function handleResizeSection(currentWidth, sectionId) {
    var newLayouts = changeSectionStyles(actualLayout, sectionId, {
      width: currentWidth
    });
    setActualLayout(newLayouts);
    onLayoutChange(newLayouts);
  };

  if (staticComponent) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, data.map(function (item, index) {
      return renderComponent(item, {}, index);
    }));
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "m-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "min-h-[100px] ",
    ref: containeRef
  }, renderableLayout.map(function (section, index) {
    var isPublic = disableChange ? false : section.container;
    return /*#__PURE__*/React.createElement(DroppableSection, {
      key: section.id,
      section: section,
      width: section.width,
      resizable: isPublic,
      onDragStart: function onDragStart(e) {
        handleDragSectionStart(e, section.id);
      },
      onClickSection: function onClickSection() {
        var layout = actualLayout.find(function (layout) {
          return layout.id === section.id;
        });

        if (layout && _onClickSection && !disableChange) {
          _onClickSection(layout);
        }
      },
      onResize: function onResize(width) {
        return handleResizeSection(width, section.id);
      }
    }, section.rows.map(function (row, rowIndex) {
      return /*#__PURE__*/React.createElement(DroppableRow, {
        disableChange: row.isContainer || disableChange,
        index: rowIndex,
        key: row.id,
        dndTargetKey: row.id,
        onDropItem: function onDropItem(e, target) {
          return handleDropItem(e, target, section.id, '', row.id, undefined, ILayoutTargetEnum.ROW);
        }
      }, /*#__PURE__*/React.createElement(LayoutRowContainer, {
        stableKey: stableKey,
        layouts: actualLayout,
        columns: row.columns,
        sectionId: section.id,
        rowId: row.id,
        disabled: disableChange,
        renderComponent: renderComponent,
        setActualLayout: setActualLayout,
        onLayoutChange: onLayoutChange
      }));
    }));
  })));
};

export { LayoutContainer };
