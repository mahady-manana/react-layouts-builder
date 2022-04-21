import { typeof as _typeof } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React, { useRef, useState, useEffect } from 'react';
import { DraggableItem } from '../components/draggable/Draggable.js';
import { DroppableColumnItem } from '../components/DroppableColumnItem/index.js';
import { DroppableSection } from '../components/DroppableSection/index.js';
import { DroppableColumnContainer } from '../components/DroppableColumnContainer/index.js';
import { createRenderableLayout } from '../helpers/createRendrableLayout.js';
import { ILayoutTargetEnum } from '../interface/internalType.js';
import { ResizableContainer } from '../components/ResizableContainer/ResizableContainer.js';
import { DroppableRow } from '../components/DroppableRow/index.js';
import { reorderLayout } from '../helpers/reorderLayout.js';
import { changeRowWidth } from '../helpers/changeRowWidth.js';
import { changeSectionStyles } from '../helpers/changeSectionStyles.js';

var LayoutContainer = function LayoutContainer(_a) {
  var data = _a.data,
      renderComponent = _a.renderComponent,
      onLayoutChange = _a.onLayoutChange,
      stableKey = _a.stableDataKey,
      layouts = _a.layouts,
      disableChange = _a.disableChange,
      _onClickSection = _a.onClickSection;
  var containeRef = useRef(null);

  var _b = useState([]),
      actualLayout = _b[0],
      setActualLayout = _b[1];

  var _c = useState(false),
      isSectionDragged = _c[0],
      setIsSectionDragged = _c[1];

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
  }, [actualLayout, data, stableKey]);
  useEffect(function () {
    if (actualLayout.length > 0) {
      onLayoutChange(actualLayout);
    }
  }, [actualLayout, onLayoutChange]);

  var handleDragStart = function handleDragStart(e, sectionId, columnId, rowId, itemkey) {
    e.stopPropagation();

    var itemKeyType = _typeof(itemkey);

    e.dataTransfer.setData('itemKey', itemkey);
    e.dataTransfer.setData('itemKeyType', itemKeyType);
    e.dataTransfer.setData('sectionId', sectionId);
    e.dataTransfer.setData('colmunId', columnId);
    e.dataTransfer.setData('rowId', rowId);
    setIsSectionDragged(false);
  }; // Drop item to create new column or setion or add item to column


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
    var newLayout = reorderLayout(actualLayout, source, destination, target, layoutTarget);
    setIsSectionDragged(false);

    if (newLayout) {
      setActualLayout(newLayout);
    }
  };

  var handleDragSectionStart = function handleDragSectionStart(e, sectionId) {
    e.stopPropagation();
    e.dataTransfer.setData('sectionId', sectionId);
    e.dataTransfer.setData('isSection', 'section');
    setIsSectionDragged(true);
  }; // Resize row


  var handleResizeRow = function handleResizeRow(currentWidth, sectionId, rowId) {
    var newLayouts = changeRowWidth(actualLayout, {
      rowId: rowId,
      sectionId: sectionId,
      width: currentWidth
    });
    setActualLayout(newLayouts);
  };

  var handleResizeSection = function handleResizeSection(currentWidth, sectionId) {
    var newLayouts = changeSectionStyles(actualLayout, sectionId, {
      width: currentWidth
    });
    setActualLayout(newLayouts);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "m-auto py-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "min-h-[100px] ",
    ref: containeRef
  }, renderableLayout.map(function (section, index) {
    return /*#__PURE__*/React.createElement(DroppableSection, {
      index: index,
      key: section.id,
      section: section,
      resizable: !disableChange,
      onDragStart: function onDragStart(e) {
        handleDragSectionStart(e, section.id);
      },
      onClickSection: function onClickSection() {
        var layout = actualLayout.find(function (layout) {
          return layout.id === section.id;
        });

        if (layout && _onClickSection) {
          _onClickSection(layout);
        }
      },
      onResize: function onResize(width) {
        return handleResizeSection(width, section.id);
      }
    }, section.rows.map(function (row, rowIndex) {
      return /*#__PURE__*/React.createElement(DroppableRow, {
        disableChange: disableChange,
        index: rowIndex,
        key: row.id,
        section: section,
        maxWidth: section.width,
        width: row.width,
        dndTargetKey: row.id,
        onDropItem: function onDropItem(e, target) {
          return handleDropItem(e, target, section.id, '', row.id, undefined, ILayoutTargetEnum.ROW);
        },
        onDragStart: function onDragStart(e) {
          handleDragSectionStart(e, section.id);
        },
        onResize: function onResize(width) {
          return handleResizeRow(width, section.id, row.id);
        }
      }, row.columns.map(function (column) {
        var width = 100 / row.columns.length;
        return /*#__PURE__*/React.createElement(ResizableContainer, {
          key: column.id,
          // resizable={row.columns.length > 1}
          styles: {
            width: "".concat(Math.round(width), "%")
          },
          type: "column",
          currentWidth: Math.round(width)
        }, /*#__PURE__*/React.createElement(DroppableColumnContainer, {
          key: column.id,
          disableChange: disableChange,
          isSection: isSectionDragged,
          styles: column.styles,
          className: column.className,
          dndTargetKey: column.id,
          width: column.width,
          currentColumLength: 1,
          onDropItem: function onDropItem(e, target) {
            return handleDropItem(e, target, section.id, column.id, row.id, undefined, ILayoutTargetEnum.COL);
          }
        }, /*#__PURE__*/React.createElement("div", {
          key: column.id,
          className: "rlb-col-inner  ".concat('')
        }, column.items.map(function (items, index) {
          if (!items) return null;
          return /*#__PURE__*/React.createElement(DroppableColumnItem, {
            disableChange: disableChange,
            isSection: isSectionDragged,
            key: index,
            dndTargetKey: items[stableKey],
            onDropItem: function onDropItem(e, target) {
              return handleDropItem(e, target, section.id, column.id, row.id, items[stableKey], ILayoutTargetEnum.ITEM);
            }
          }, /*#__PURE__*/React.createElement(DraggableItem, {
            disableChange: disableChange,
            dndTargetKey: items[stableKey],
            onDragStart: function onDragStart(e) {
              handleDragStart(e, section.id, column.id, row.id, items[stableKey]);
            }
          }, renderComponent(items)));
        }))));
      }));
    }));
  })));
};

export { LayoutContainer };
