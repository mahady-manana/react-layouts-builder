import { typeof as _typeof } from '../../_virtual/_rollupPluginBabelHelpers.js';
import { __assign } from '../../node_modules/tslib/tslib.es6.js';
import React, { useRef, useState, useEffect } from 'react';
import { DraggableItem } from '../components/draggable/Draggable.js';
import { TargetPlaceEnum, ILayoutTargetEnum } from '../interface/internalType.js';
import { ResizableContainer } from '../components/ResizableContainer/ResizableContainer.js';
import { reorderLayout } from '../helpers/reorderLayout.js';
import { changeColumnWidth } from '../helpers/changeColumnWidth.js';
import { findWidthPercentByPx } from '../helpers/findWidth.js';
import classnames from '../../node_modules/classnames/index.js';
import { LayoutDropContainer } from './LayoutDropContainer.js';

var LayoutRowContainer = function LayoutRowContainer(_a) {
  var disabled = _a.disabled,
      isFirstSection = _a.isFirstSection,
      stableKey = _a.stableKey,
      columns = _a.columns,
      layouts = _a.layouts,
      sectionId = _a.sectionId,
      rowId = _a.rowId,
      isLastSection = _a.isLastSection,
      needRowTarget = _a.needRowTarget,
      dragActive = _a.dragActive,
      maxColumns = _a.maxColumns,
      setDragActive = _a.setDragActive,
      imageSizeFnLoader = _a.imageSizeFnLoader,
      setActualLayout = _a.setActualLayout,
      renderComponent = _a.renderComponent,
      imageCheckerFn = _a.imageCheckerFn,
      onLayoutChange = _a.onLayoutChange,
      _onImageResizeFinished = _a.onImageResizeFinished;
  var containerRef = useRef(null);

  var _b = useState(false),
      columnCountReach = _b[0],
      setColumnCountReach = _b[1];

  var _c = useState(),
      currentColumn = _c[0],
      setCurrentColumn = _c[1];

  var _d = useState(false),
      resizeBegin = _d[0],
      setResizeBegin = _d[1];

  var _e = useState([]),
      widths = _e[0],
      setWidths = _e[1];

  var _f = useState(0),
      indexCol = _f[0],
      setIndexCol = _f[1];

  var _g = useState(),
      initClientX = _g[0],
      setInitClientX = _g[1];

  var _h = useState(),
      initWidth = _h[0],
      setInitWidth = _h[1];

  var _j = useState(),
      newWidth = _j[0],
      setNewWidth = _j[1];

  var _k = useState(),
      nextWidth = _k[0],
      setNextWidth = _k[1];

  var _l = useState(500),
      waitBeforeUpdate = _l[0],
      setWaitBeforeUpdate = _l[1]; // TARGET DROP STATE


  var _m = useState(),
      targetDROP = _m[0],
      setTargetDROP = _m[1]; // TARGET DESTINATION STATE


  var _o = useState({
    columnId: '',
    itemKey: '',
    sectionId: '',
    targetPlace: '',
    rowId: ''
  }),
      destination = _o[0],
      setDestination = _o[1];

  var resetDrag = function resetDrag() {
    setDestination({
      columnId: '',
      itemKey: '',
      sectionId: '',
      targetPlace: '',
      rowId: ''
    });
    setTargetDROP(undefined);
  };

  var handleDragStart = function handleDragStart(e, sectionId, columnId, rowId, itemkey, el) {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    var itemKeyType = _typeof(itemkey);

    e.dataTransfer.setData('itemKey', itemkey);
    e.dataTransfer.setData('itemKeyType', itemKeyType);
    e.dataTransfer.setData('sectionId', sectionId);
    e.dataTransfer.setData('colmunId', columnId);
    e.dataTransfer.setData('rowId', rowId);
    var div = e.target;
    e.dataTransfer.setDragImage(div, 5000, 5000);
    var timer = setTimeout(function () {
      setDragActive(true);
    }, 500);
    clearTimeout(timer);
  }; //   // Drop item to create new column or setion or add item to column


  var handleDropItem = function handleDropItem(e, layoutTarget) {
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

    if (!destination.itemKey && !sourceItemKey) {
      // this is used to prevent drag resize to create new item
      return;
    }

    setDragActive(false);
    var newLayout = reorderLayout(layouts, source, destination, destination.targetPlace, layoutTarget);

    if (newLayout) {
      setActualLayout(newLayout);
      onLayoutChange(newLayout);
    }

    setTargetDROP(undefined);
    setDestination({
      columnId: '',
      itemKey: '',
      sectionId: '',
      targetPlace: '',
      rowId: ''
    });
  };

  useEffect(function () {
    var isReach = columns.length >= (maxColumns || 15);

    if (isReach) {
      setColumnCountReach(true);
    } else {
      setColumnCountReach(false);
    }
  }, [columns.length, maxColumns]);

  var onMouseMove = function onMouseMove(e) {
    if (resizeBegin) {
      if (e.clientX === 0 || !initClientX || !initWidth) return;
      var diff = initClientX - e.clientX;
      var needX2 = columns.length === 1;
      var add = needX2 ? diff * 2 : diff * 1; // const addition = left ? add : -add;

      var cWidth = initWidth - add;
      var w_1 = findWidthPercentByPx(initWidth, columns[indexCol].width, cWidth, true);
      var old = columns[indexCol].width;
      var oldNext = columns[indexCol + 1].width;
      var rest_1 = oldNext + (old - w_1);
      var newWidths_1 = widths.map(function (wd, index) {
        if (index === indexCol) return w_1;

        if (index === indexCol + 1) {
          setNextWidth(rest_1);
          return rest_1;
        }

        return wd;
      });
      setWaitBeforeUpdate(500);
      setNewWidth(w_1);
      setTimeout(function () {
        setWidths(newWidths_1);
      }, 250);
    }
  };

  var _onMouseDown = function onMouseDown(clientX, width) {
    setInitClientX(clientX);
    setInitWidth(width);
    setResizeBegin(true);
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

  var runIt = function runIt() {
    if (nextWidth && newWidth) {
      var newLayouts = changeColumnWidth(layouts, {
        rowId: rowId,
        sectionId: sectionId
      }, {
        colId: currentColumn,
        next: nextWidth,
        width: newWidth
      });
      setActualLayout(newLayouts);
      onLayoutChange(newLayouts);
      setNextWidth(0);
      setNewWidth(0);
    }
  };

  var onMouseUp = function onMouseUp(e) {
    runIt();
    setResizeBegin(false);
    setInitClientX(0);
    setInitWidth(0);
  };

  var onMousLeave = function onMousLeave(e) {
    runIt();
    setResizeBegin(false);
    setInitClientX(0);
    setInitWidth(0);
  };

  useEffect(function () {
    if (columns.length) {
      setWidths(columns.map(function (col) {
        return col.width;
      }));
    }
  }, [columns]); // DRAG EVENT

  var handleDragOverItem = function handleDragOverItem(destination) {
    setDragActive(true);
    setDestination(function (prev) {
      return __assign(__assign({}, prev), destination);
    });
  };

  var styleSide = function styleSide(colId, place) {
    var conditions = destination.columnId === colId && destination.targetPlace === place;
    return {
      visibility: conditions ? 'visible' : 'hidden'
    };
  };

  var needTop = isFirstSection ? needRowTarget === null || needRowTarget === void 0 ? void 0 : needRowTarget.top : (needRowTarget === null || needRowTarget === void 0 ? void 0 : needRowTarget.top) && columns.length > 1;
  var columnsComonent = React.useMemo(function () {
    return columns.map(function (column, index) {
      return /*#__PURE__*/React.createElement(ResizableContainer, {
        width: "calc(".concat(widths[index], "% - ").concat(columns.length > 1 ? 20 / columns.length : 0, "px)"),
        key: column.id,
        isLast: columns.length === index + 1,
        isNextTo: index === indexCol + 1,
        resizable: !disabled,
        colNumber: columns.length,
        onMouseDown: function onMouseDown(clientX, width) {
          setIndexCol(index);
          setCurrentColumn(column.id);

          _onMouseDown(clientX, width);
        },
        type: "column"
      }, /*#__PURE__*/React.createElement("div", {
        className: "rlb-flex rbl-relative"
      }, !disabled && !columnCountReach ? /*#__PURE__*/React.createElement("div", {
        className: "rbl-side-drop-indicator left",
        style: styleSide(column.id, TargetPlaceEnum.LEFT)
      }) : null, /*#__PURE__*/React.createElement("div", {
        key: column.id,
        className: "rlb-col-inner"
      }, column.items.map(function (items, index) {
        if (!items) return null;
        var isImage = imageCheckerFn ? imageCheckerFn(items) : false;
        return /*#__PURE__*/React.createElement(LayoutDropContainer, {
          isLast: index + 1 === column.items.length && columns.length > 1,
          targetDROP: destination.itemKey === items[stableKey] ? targetDROP : undefined,
          disableSide: columnCountReach,
          setTargetDROP: setTargetDROP,
          onDragOver: function onDragOver(target) {
            return handleDragOverItem({
              columnId: column.id,
              itemKey: items[stableKey],
              sectionId: sectionId,
              targetPlace: target,
              rowId: rowId
            });
          },
          onDrop: function onDrop(e) {
            var _a;

            handleDropItem(e, ILayoutTargetEnum.ITEM);
            (_a = document.getElementById('clonedGhost')) === null || _a === void 0 ? void 0 : _a.remove();
          },
          onDragLeave: resetDrag,
          disableChange: disabled,
          key: index
        }, /*#__PURE__*/React.createElement(DraggableItem, {
          isImage: isImage,
          disableChange: disabled,
          sizes: imageSizeFnLoader ? imageSizeFnLoader(items) : undefined,
          oneCol: columns.length === 1,
          dndTargetKey: items[stableKey],
          onImageResizeFinished: function onImageResizeFinished(w) {
            return _onImageResizeFinished ? _onImageResizeFinished(items, w) : undefined;
          },
          onDragStart: function onDragStart(e, el) {
            if (disabled) {
              return;
            }

            handleDragStart(e, sectionId, column.id, rowId, items[stableKey]);
          }
        }, items['id'] !== 'EMPTY_SECTION' ? renderComponent(items, {
          columnId: column.id,
          itemKey: items[stableKey],
          rowId: rowId,
          sectionId: sectionId
        }) : null));
      })), !disabled && !columnCountReach ? /*#__PURE__*/React.createElement("div", {
        className: "rbl-side-drop-indicator right",
        style: styleSide(column.id, TargetPlaceEnum.RIGHT)
      }) : null));
    });
  }, [columns, targetDROP, widths, renderComponent]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, needTop && dragActive ? /*#__PURE__*/React.createElement("div", {
    className: "rbl-drop-row-container",
    onDragOver: function onDragOver(e) {
      e.preventDefault();
      setTargetDROP(TargetPlaceEnum.ROW_TOP);
      handleDragOverItem({
        columnId: '',
        itemKey: undefined,
        sectionId: sectionId,
        targetPlace: TargetPlaceEnum.ROW_TOP,
        rowId: rowId
      });
    },
    onDragLeave: function onDragLeave(e) {
      e.preventDefault();
      setTargetDROP(undefined);
    },
    onDrop: function onDrop(e) {
      handleDropItem(e, ILayoutTargetEnum.ROW);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "rbl-drop-row-indicator",
    style: {
      visibility: targetDROP === TargetPlaceEnum.ROW_TOP ? 'visible' : 'hidden'
    }
  })) : null, /*#__PURE__*/React.createElement("div", {
    className: classnames('section-content flex', resizeBegin ? 'rbl-resizing' : ''),
    style: {
      width: '100%',
      margin: 'auto'
    },
    ref: containerRef,
    onMouseMove: onMouseMove,
    onMouseUp: onMouseUp,
    onMouseLeave: onMousLeave
  }, columnsComonent), isLastSection && (needRowTarget === null || needRowTarget === void 0 ? void 0 : needRowTarget.bottom) && dragActive ? /*#__PURE__*/React.createElement("div", {
    className: "rbl-drop-row-container",
    onDragOver: function onDragOver(e) {
      e.preventDefault();
      setTargetDROP(TargetPlaceEnum.ROW_BOTTOM);
      handleDragOverItem({
        columnId: '',
        itemKey: undefined,
        sectionId: sectionId,
        targetPlace: TargetPlaceEnum.ROW_BOTTOM,
        rowId: rowId
      });
    },
    onDragLeave: function onDragLeave(e) {
      e.preventDefault();
      setTargetDROP(undefined);
    },
    onDrop: function onDrop(e) {
      handleDropItem(e, ILayoutTargetEnum.ROW);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "rbl-drop-row-indicator",
    style: {
      visibility: targetDROP === TargetPlaceEnum.ROW_BOTTOM ? 'visible' : 'hidden'
    }
  })) : null));
}; // export const LayoutRowContainer = React.memo(
//   LayoutRowContainerComponent,
// );

export { LayoutRowContainer };
