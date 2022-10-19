import { __assign } from '../../node_modules/tslib/tslib.es6.js';
import React, { useRef, useState, useContext, useEffect } from 'react';
import { DraggableItem } from '../components/draggable/Draggable.js';
import { TargetPlaceEnum, ILayoutTargetEnum } from '../interface/internalType.js';
import { ResizableContainer } from '../components/ResizableContainer/ResizableContainer.js';
import { reorderLayout } from '../helpers/reorderLayout.js';
import { changeColumnWidth } from '../helpers/changeColumnWidth.js';
import { findWidthPercentByPx } from '../helpers/findWidth.js';
import classnames from '../../node_modules/classnames/index.js';
import { LayoutDropContainer } from './LayoutDropContainer.js';
import { AppContext } from '../Context/AppContext.js';

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
      isMobile = _a.isMobile,
      setDragActive = _a.setDragActive,
      imageSizeFnLoader = _a.imageSizeFnLoader,
      setActualLayout = _a.setActualLayout,
      renderComponent = _a.renderComponent,
      imageCheckerFn = _a.imageCheckerFn,
      onLayoutChange = _a.onLayoutChange,
      _onImageResizeFinished = _a.onImageResizeFinished,
      onClickCol = _a.onClickCol;
  var containerRef = useRef(null);

  var _b = useState(),
      currentColumn = _b[0],
      setCurrentColumn = _b[1];

  var _c = useState(false),
      resizeBegin = _c[0],
      setResizeBegin = _c[1];

  var _d = useState([]),
      widths = _d[0],
      setWidths = _d[1];

  var _e = useState(0),
      indexCol = _e[0],
      setIndexCol = _e[1];

  var _f = useState(),
      initClientX = _f[0],
      setInitClientX = _f[1];

  var _g = useState(),
      initWidth = _g[0],
      setInitWidth = _g[1];

  var _h = useState(),
      newWidth = _h[0],
      setNewWidth = _h[1];

  var _j = useState(),
      nextWidth = _j[0],
      setNextWidth = _j[1];

  var _k = useState(500),
      waitBeforeUpdate = _k[0],
      setWaitBeforeUpdate = _k[1];

  var _l = useContext(AppContext),
      source = _l.source,
      setSource = _l.setSource,
      setIsDragStart = _l.setIsDragStart; // TARGET DROP STATE


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
  }; //   // Drop item to create new column or setion or add item to column


  var handleDropItem = function handleDropItem(e, layoutTarget, colNb) {
    setIsDragStart(false);
    if (!source) return;

    if (layoutTarget !== ILayoutTargetEnum.ROW && !destination.itemKey) {
      // this is used to prevent drag resize to create new item
      return;
    }

    setDragActive(false);

    var destinationPlace = function destinationPlace() {
      if (colNb === 'SINGLE' && destination.targetPlace !== TargetPlaceEnum.LEFT && destination.targetPlace !== TargetPlaceEnum.RIGHT) {
        if (destination.targetPlace === TargetPlaceEnum.BOTTOM) {
          return TargetPlaceEnum.ROW_BOTTOM;
        }

        return TargetPlaceEnum.ROW_TOP;
      }

      return destination.targetPlace;
    };

    var targetedLayout = colNb === 'SINGLE' && destination.targetPlace !== TargetPlaceEnum.LEFT && destination.targetPlace !== TargetPlaceEnum.RIGHT ? ILayoutTargetEnum.ROW : layoutTarget;
    var newLayout = reorderLayout(layouts, source, destination, destinationPlace(), targetedLayout);

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
    setSource(undefined);
  };

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

  var handleclickCol = function handleclickCol(e, colId) {
    e.preventDefault();
    e.stopPropagation();
    onClickCol({
      sectionId: '',
      colId: colId
    });
  };

  var isButton = function isButton(items) {
    if (!items) {
      return false;
    }

    var buttonType = ['LINK', 'MAIL_BUTTON', 'TEL_BUTTON'];
    return buttonType.indexOf(items.linkType || '') !== -1;
  };

  var columnsComonent = React.useMemo(function () {
    return columns.map(function (column, index) {
      return /*#__PURE__*/React.createElement(ResizableContainer, {
        width: isMobile ? '100%' : "calc(".concat(widths[index], "% - ").concat(columns.length > 1 ? 20 / columns.length : 0, "px)"),
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
        className: "rlb-flex rbl-relative rbl-col-container",
        style: column.styles,
        onClick: function onClick(e) {
          return handleclickCol(e, column.id);
        }
      }, !disabled && !isMobile ? /*#__PURE__*/React.createElement("div", {
        className: "rbl-side-drop-indicator left",
        style: styleSide(column.id, TargetPlaceEnum.LEFT)
      }) : null, /*#__PURE__*/React.createElement("div", {
        key: column.id,
        className: "rlb-col-inner"
      }, column.items.map(function (items, index) {
        var _a;

        if (!items) return null;
        var isImage = imageCheckerFn ? imageCheckerFn(items) : false;
        return /*#__PURE__*/React.createElement(LayoutDropContainer, {
          isLast: index + 1 === column.items.length && columns.length > 1,
          targetDROP: destination.itemKey === items[stableKey] ? targetDROP : undefined,
          disableSide: isMobile,
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

            handleDropItem(e, ILayoutTargetEnum.ITEM, columns.length === 1 && column.items.length === 1 ? 'SINGLE' : 'MULTI');
            (_a = document.getElementById('clonedGhost')) === null || _a === void 0 ? void 0 : _a.remove();
          },
          onDragLeave: resetDrag,
          disableChange: disabled,
          key: index
        }, /*#__PURE__*/React.createElement(DraggableItem, {
          isMobile: isMobile,
          isImage: isImage,
          isButton: isButton(items),
          disableChange: disabled,
          sizes: imageSizeFnLoader ? imageSizeFnLoader(items) : undefined,
          oneCol: columns.length === 1,
          dndTargetKey: items[stableKey],
          isCenter: isImage && ((_a = items === null || items === void 0 ? void 0 : items.options) === null || _a === void 0 ? void 0 : _a.center),
          onImageResizeFinished: function onImageResizeFinished(w) {
            return _onImageResizeFinished ? _onImageResizeFinished(items, w) : undefined;
          }
        }, items['id'] !== 'EMPTY_SECTION' ? renderComponent(items, {
          columnId: column.id,
          itemKey: items[stableKey],
          rowId: rowId,
          sectionId: sectionId
        }) : null));
      })), !disabled && !isMobile ? /*#__PURE__*/React.createElement("div", {
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
    className: classnames('section-content', resizeBegin ? 'rbl-resizing' : '', isMobile ? 'column-container-mobile' : 'column-container'),
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
