'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

var DraggableItem = function DraggableItem(_a) {
  var children = _a.children,
      dndTargetKey = _a.dndTargetKey,
      disableChange = _a.disableChange,
      onDragStart = _a.onDragStart;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    draggable: !disableChange,
    onDragStart: onDragStart,
    className: "flex-grow",
    "target-dnd-droppable": "".concat(dndTargetKey)
  }, children);
};

var DropTargetPlaceEnum;

(function (DropTargetPlaceEnum) {
  DropTargetPlaceEnum["LEFT"] = "LEFT";
  DropTargetPlaceEnum["RIGHT"] = "RIGHT";
  DropTargetPlaceEnum["TOP"] = "TOP";
  DropTargetPlaceEnum["BOTTOM"] = "BOTTOM";
  DropTargetPlaceEnum["SECTION_TOP"] = "SECTION_TOP";
  DropTargetPlaceEnum["SECTION_BOTTOM"] = "SECTION_BOTTOM";
})(DropTargetPlaceEnum || (DropTargetPlaceEnum = {}));

var DroppableColumnItem = function DroppableColumnItem(_a) {
  var children = _a.children,
      dndTargetKey = _a.dndTargetKey,
      isSection = _a.isSection,
      disableChange = _a.disableChange,
      onDropItem = _a.onDropItem;

  var _b = React.useState(),
      droppableTarget = _b[0],
      setDroppableTarget = _b[1];

  var handleDragOver = function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    var targetEl = e.currentTarget;
    var targetDom = targetEl.getAttribute('target-droppable-item');

    if (targetDom && !isSection) {
      setDroppableTarget(targetDom);
    }
  };

  var isHoveredTargetClassName = function isHoveredTargetClassName(conditions) {
    return conditions ? 'rlb-droppable-item-hover' : 'rlb-droppable-item';
  };

  var handleDragOverLeave = function handleDragOverLeave(e) {
    setDroppableTarget('');
  };

  var handleDropToTop = function handleDropToTop(e) {
    e.preventDefault();
    onDropItem(e, DropTargetPlaceEnum.TOP);
    setDroppableTarget('');
  };

  var handleDropToBottom = function handleDropToBottom(e) {
    e.preventDefault();
    onDropItem(e, DropTargetPlaceEnum.BOTTOM);
    setDroppableTarget('');
  };

  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, !disableChange ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(isHoveredTargetClassName(droppableTarget === "item-".concat(dndTargetKey, "-top"))),
    "target-droppable-item": "item-".concat(dndTargetKey, "-top"),
    onDragOver: handleDragOver,
    onDragLeave: handleDragOverLeave,
    onDrop: handleDropToTop
  }, droppableTarget === "item-".concat(dndTargetKey, "-top") ? 'Add item to column...' : null) : null, children, !disableChange ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(isHoveredTargetClassName(droppableTarget === "item-".concat(dndTargetKey, "-bottom"))),
    "target-droppable-item": "item-".concat(dndTargetKey, "-bottom"),
    onDragOver: handleDragOver,
    onDragLeave: handleDragOverLeave,
    onDrop: handleDropToBottom
  }, droppableTarget === "item-".concat(dndTargetKey, "-bottom") ? 'Add item to column...' : null) : null);
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function on(obj) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (obj && obj.addEventListener) {
        obj.addEventListener.apply(obj, args);
    }
}
function off(obj) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (obj && obj.removeEventListener) {
        obj.removeEventListener.apply(obj, args);
    }
}

var defaultEvents = ['mousedown', 'touchstart'];
var useClickAway = function (ref, onClickAway, events) {
    if (events === void 0) { events = defaultEvents; }
    var savedCallback = React.useRef(onClickAway);
    React.useEffect(function () {
        savedCallback.current = onClickAway;
    }, [onClickAway]);
    React.useEffect(function () {
        var handler = function (event) {
            var el = ref.current;
            el && !el.contains(event.target) && savedCallback.current(event);
        };
        for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
            var eventName = events_1[_i];
            on(document, eventName, handler);
        }
        return function () {
            for (var _i = 0, events_2 = events; _i < events_2.length; _i++) {
                var eventName = events_2[_i];
                off(document, eventName, handler);
            }
        };
    }, [events, ref]);
};
var useClickAway$1 = useClickAway;

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

var classnames = createCommonjsModule(function (module) {
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}

		return classes.join(' ');
	}

	if (module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
});

var gridValue = function gridValue(m, n) {
  if (n === 0 || !n) {
    return undefined;
  }

  var q = n % m;
  var r = 20 - q;
  var f = r <= m / 2 ? n + r : n - q;
  return f;
};

var ResizableContainer = function ResizableContainer(_a) {
  var isRow = _a.isRow,
      resizable = _a.resizable,
      styles = _a.styles,
      children = _a.children;

  var _b = React.useState(),
      width = _b[0],
      setWidth = _b[1];

  var _c = React.useState({
    width: 0,
    clientX: 0
  }),
      init = _c[0],
      setInit = _c[1];

  var _d = React.useState();
      _d[0];
      _d[1];

  var columnRef = React.useRef(null); //   const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
  //     e.stopPropagation();
  //     e.preventDefault();
  //     const targetEl = e.currentTarget;
  //     const targetDom = targetEl.getAttribute('target-droppable-item');
  //     if (targetDom && !isSection) {
  //       setDroppableTarget(targetDom);
  //     }
  //   };
  //   const isHoveredTargetClassNameSide = (conditions: boolean) => {
  //     return conditions
  //       ? 'rlb-droppable-side-hover'
  //       : 'rlb-droppable-side';
  //   };
  //   const handleDragOverLeave = (e: DragEvent<HTMLDivElement>) => {
  //     e.preventDefault();
  //     setDroppableTarget('');
  //   };
  //   const handleDropToLeft = (e: DragEvent<HTMLDivElement>) => {
  //     e.preventDefault();
  //     onDropItem(e, DropTargetPlaceEnum.LEFT);
  //     setDroppableTarget('');
  //   };
  //   const handleDropToRigth = (e: DragEvent<HTMLDivElement>) => {
  //     e.preventDefault();
  //     onDropItem(e, DropTargetPlaceEnum.RIGHT);
  //     setDroppableTarget('');
  //   };

  var onDragStart = function onDragStart(e) {
    var _a;

    e.preventDefault();
    e.stopPropagation();
    if (init.clientX && init.width) return;
    var columnWidth = (_a = columnRef.current) === null || _a === void 0 ? void 0 : _a.clientWidth;
    setWidth(columnWidth);
    setInit({
      width: width || columnWidth || 0,
      clientX: e.clientX
    });
  };

  var handleResize = function handleResize(e, left) {
    e.preventDefault();
    e.stopPropagation();
    onDragStart(e);

    if (init.clientX && init.width) {
      var diff = init.clientX - e.clientX;
      var add = diff * 2;
      var addition = left ? add : -add;
      setWidth(init.width + addition);
    }
  };

  var handleDragEnd = function handleDragEnd(e, left) {
    if (init.clientX && init.width) {
      var diff = init.clientX - e.clientX;
      var add = diff * 2;
      var addition = left ? add : -add;
      var finalWidth = init.width + addition;
      setWidth(finalWidth);
      setInit(function (prev) {
        return {
          width: prev.width,
          clientX: 0
        };
      });
    }
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: classnames('rlb-resizable-container', resizable ? 'resizable' : '', isRow ? 'flex' : ''),
    ref: columnRef,
    style: {
      width: gridValue(50, width) || (styles === null || styles === void 0 ? void 0 : styles.width)
    }
  }, resizable ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "rlb-resize-handler left",
    draggable: true,
    onDrag: function onDrag(e) {
      return handleResize(e, true);
    },
    onDragEnd: function onDragEnd(e) {
      handleDragEnd(e, true);
    }
  }) : null, children, resizable ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "rlb-resize-handler right",
    draggable: true,
    onDrag: function onDrag(e) {
      return handleResize(e, false);
    },
    onDragEnd: function onDragEnd(e) {
      handleDragEnd(e, false);
    }
  }) : null);
};

var DroppableSection = function DroppableSection(_a) {
  var children = _a.children,
      index = _a.index,
      dndTargetKey = _a.dndTargetKey,
      disableDrag = _a.disableDrag,
      sections = _a.sections,
      disableChange = _a.disableChange,
      onDropItem = _a.onDropItem,
      onDragStart = _a.onDragStart;
      _a.onChangeSectionStyles;

  var _b = React.useState(false);
      _b[0];
      var setOpenSetting = _b[1];

  var _c = React.useState(),
      droppableTarget = _c[0],
      setDroppableTarget = _c[1];

  var popoverRef = React.useRef(null);
  useClickAway$1(popoverRef, function () {
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

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React__default["default"].createElement(ResizableContainer, {
    resizable: true
  }, index === 0 && !disableChange ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(isHoveredTargetClassName(droppableTarget === "".concat(dndTargetKey, "-top"))),
    "target-droppable-section": "".concat(dndTargetKey, "-top"),
    onDragOver: handleDragOver,
    onDrop: function onDrop(e) {
      onDropItem(e, DropTargetPlaceEnum.SECTION_TOP);
      setDroppableTarget('');
    },
    onDragLeave: handleDragOverLeave
  }, droppableTarget === "".concat(dndTargetKey, "-top") ? "Drop here as a section..." : null) : null, /*#__PURE__*/React__default["default"].createElement("div", {
    className: classnames('rlb-section'),
    draggable: !disableChange,
    onDragStart: onDragStart,
    style: {
      background: sections.backgroundColor,
      paddingBlock: (sections.spacing || 0) * 8
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "section-content",
    style: {
      width: sections.width,
      margin: 'auto'
    }
  }, children)), !disableChange ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(isHoveredTargetClassName(droppableTarget === "".concat(dndTargetKey, "-bottom"))),
    "target-droppable-section": "".concat(dndTargetKey, "-bottom"),
    onDragOver: handleDragOver,
    onDragLeave: handleDragOverLeave,
    onDrop: function onDrop(e) {
      onDropItem(e, DropTargetPlaceEnum.SECTION_BOTTOM);
      setDroppableTarget('');
    }
  }, droppableTarget === "".concat(dndTargetKey, "-bottom") ? 'Drop here as a section...' : null) : null));
};

var DroppableColumnContainer = function DroppableColumnContainer(_a) {
  var children = _a.children,
      dndTargetKey = _a.dndTargetKey;
      _a.width;
      var isSection = _a.isSection;
      _a.currentColumLength;
      _a.initialSize;
      _a.resizingWidth;
      var disableDrag = _a.disableDrag,
      className = _a.className;
      _a.styles;
      var disableChange = _a.disableChange,
      onDropItem = _a.onDropItem;
      _a.onResize;
      _a.onResizeStart;

  var _b = React.useState(),
      droppableTarget = _b[0],
      setDroppableTarget = _b[1];

  var columnRef = React.useRef(null);

  var handleDragOver = function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    var targetEl = e.currentTarget;
    var targetDom = targetEl.getAttribute('target-droppable-item');

    if (targetDom && !isSection) {
      setDroppableTarget(targetDom);
    }
  };

  var isHoveredTargetClassNameSide = function isHoveredTargetClassNameSide(conditions) {
    return conditions ? 'rlb-droppable-side-hover' : 'rlb-droppable-side';
  };

  var handleDragOverLeave = function handleDragOverLeave(e) {
    e.preventDefault();
    setDroppableTarget('');
  };

  var handleDropToLeft = function handleDropToLeft(e) {
    e.preventDefault();
    onDropItem(e, DropTargetPlaceEnum.LEFT);
    setDroppableTarget('');
  };

  var handleDropToRigth = function handleDropToRigth(e) {
    e.preventDefault();
    onDropItem(e, DropTargetPlaceEnum.RIGHT);
    setDroppableTarget('');
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: classnames('rlb-col', // `w-[${widthNumber}%]`,
    className),
    ref: columnRef
  }, !disableChange ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(isHoveredTargetClassNameSide(droppableTarget === "item-".concat(dndTargetKey, "-left"))),
    "target-droppable-item": "item-".concat(dndTargetKey, "-left"),
    onDragOver: disableDrag ? undefined : handleDragOver,
    onDragLeave: handleDragOverLeave,
    onDrop: handleDropToLeft
  }, droppableTarget === "item-".concat(dndTargetKey, "-left") ? 'Drop new column...' : null) : null, children, !disableChange ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(isHoveredTargetClassNameSide(droppableTarget === "item-".concat(dndTargetKey, "-right"))),
    "target-droppable-item": "item-".concat(dndTargetKey, "-right"),
    onDragOver: handleDragOver,
    onDragLeave: handleDragOverLeave,
    onDrop: handleDropToRigth
  }, droppableTarget === "item-".concat(dndTargetKey, "-right") ? 'Drop new column...' : null) : null);
};

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validate(uuid) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return stringify(rnds);
}

var createNewLayout = function createNewLayout(data, stableDataKey) {
  return [v4()].map(function (id, index) {
    var columns = [{
      childIds: data.map(function (item) {
        return item[stableDataKey];
      }),
      id: "column-".concat(v4()),
      order: 0,
      className: 'w-full',
      width: 100
    }];
    var section = {
      className: '',
      id: "section-".concat(v4()),
      order: 0,
      columns: [columns],
      contentWidth: 1080,
      width: '100%',
      spacing: 2
    };
    return section;
  });
};
/**
 *
 * @param data   data used in the layer, Type : any[]
 * @param stableDataKey stable key of the data, ex: ```"id", "order"```, etc.
 * @param currentLayouts ``optionnal``, The actual layout if exist
 *
 * @note If 'currentLayouts' is not provided, a completely new layout will be generated,
 * So if there is already a layout in your layer, it will be overdrawn
 * Always provide the current layouts if exist to maintain the current layer
 *
 * @returns
 */


var createLayout = function createLayout(data, stableDataKey, currentLayouts) {
  if (!currentLayouts || (currentLayouts === null || currentLayouts === void 0 ? void 0 : currentLayouts.length) === 0) {
    return createNewLayout(data, stableDataKey);
  } // const getNewData = data.filter((dt) => {
  //   const isExist = currentLayouts.find((section) => {
  //     const sectionExist = section.columns.find((col) =>
  //       col.childIds.includes(dt[stableDataKey]),
  //     );
  //     return sectionExist;
  //   });
  //   return !isExist;
  // });
  // const newLayouts = createNewLayout(getNewData, stableDataKey);
  // return currentLayouts.concat(newLayouts);


  return [];
};

var createRenderableLayout = function createRenderableLayout(data, layouts, key) {
  var dataLayout = layouts.map(function (layout) {
    var renderedLayout = {
      id: layout.id,
      order: layout.order,
      className: layout.className,
      backgroundColor: layout.backgroundColor,
      contentWidth: layout.contentWidth,
      spacing: layout.spacing,
      width: layout.width,
      columns: layout.columns.map(function (colmns) {
        return colmns.map(function (cols) {
          var items = cols.childIds.map(function (item) {
            return data.find(function (dt) {
              return dt[key] === item;
            }) || {};
          });
          var renderedCol = {
            id: cols.id,
            order: cols.order,
            className: cols.className,
            items: items,
            width: cols.width
          };
          return renderedCol;
        }).filter(function (col) {
          return col.items.length > 0;
        });
      })
    };
    return renderedLayout;
  }).filter(function (section) {
    return section.columns.length > 0;
  });
  return dataLayout;
};

var addToNewColumn = function addToNewColumn(targetColumn, targetColumnId, sourceItemKey, place) {
  var newCols = targetColumn.reduce(function (acc, next) {
    var virtualLength = targetColumn.length > 1 ? targetColumn.length : 1;
    var newWidth = Math.round(100 / virtualLength);
    var shouldRemoveFromRestWidth = Math.round(newWidth / (targetColumn.length + 1));

    if (next.id !== targetColumnId) {
      return acc.concat(__assign(__assign({}, next), {
        width: next.width - shouldRemoveFromRestWidth
      }));
    }

    var newCol = {
      childIds: [sourceItemKey],
      id: new Date().getTime().toString(),
      order: 999,
      className: 'w-full',
      width: newWidth - shouldRemoveFromRestWidth
    };

    var current = __assign(__assign({}, next), {
      width: next.width - shouldRemoveFromRestWidth
    });

    var reorder = place === DropTargetPlaceEnum.LEFT ? [newCol, current] : [current, newCol];
    return acc.concat(reorder);
  }, []);
  return newCols;
};

var addToColmunElementToTop = function addToColmunElementToTop(targetColumn, targetColumnId, sourceItemKey, targetItemKey) {
  var newColumns = targetColumn.map(function (col) {
    if (col.id !== targetColumnId) {
      return col;
    }

    var newColItems = col.childIds.reduce(function (acc, next) {
      if (next !== targetItemKey) {
        return acc.concat(next);
      }

      return acc.concat([sourceItemKey, next]);
    }, []);

    var newCol = __assign(__assign({}, col), {
      childIds: newColItems
    });

    return newCol;
  }, []);
  return newColumns;
};

var addToColmunElementToBottom = function addToColmunElementToBottom(targetColumn, targetColumnId, sourceItemKey, targetItemKey) {
  var newColumns = targetColumn.map(function (col) {
    if (col.id !== targetColumnId) {
      return col;
    }

    var newColItems = col.childIds.reduce(function (acc, next) {
      if (next !== targetItemKey) {
        return acc.concat(next);
      }

      return acc.concat([next, sourceItemKey]);
    }, []);

    var newCol = __assign(__assign({}, col), {
      childIds: newColItems
    });

    return newCol;
  }, []);
  return newColumns;
};

var addItemToColumn = function addItemToColumn(column, source, dest, place) {
  if (place === DropTargetPlaceEnum.LEFT) {
    return addToNewColumn(column, dest.columnId, source.itemKey, DropTargetPlaceEnum.LEFT);
  }

  if (place === DropTargetPlaceEnum.RIGHT) {
    return addToNewColumn(column, dest.columnId, source.itemKey, DropTargetPlaceEnum.RIGHT);
  }

  if (place === DropTargetPlaceEnum.TOP) {
    return addToColmunElementToTop(column, dest.columnId, source.itemKey, dest.itemKey);
  }

  if (place === DropTargetPlaceEnum.BOTTOM) {
    return addToColmunElementToBottom(column, dest.columnId, source.itemKey, dest.itemKey);
  }

  return column;
};

var addToNewRow = function addToNewRow(layouts, source, dest, place) {
  var finalLayouts = layouts.map(function (section) {
    if (section.id !== dest.sectionId) {
      return section;
    }

    var id = new Date().getTime();
    var newCol = [{
      childIds: [source.itemKey],
      id: id.toString(),
      order: 0,
      width: 100,
      className: ''
    }];
    var cols = place === DropTargetPlaceEnum.SECTION_TOP ? __spreadArray([newCol], section.columns || [], true) : __spreadArray(__spreadArray([], section.columns || [], true), [newCol], false);
    var newSection = {
      className: '',
      id: id.toString(),
      order: 0,
      columns: cols
    };
    return newSection;
  }, []);
  return finalLayouts;
};

var removeEmptyColumn = function removeEmptyColumn(layouts) {
  // return layouts.map((section) => {
  //   const newColumns = section.columns.filter(
  //     (col) => (col.childIds.length || 0) > 0,
  //   );
  //   return {
  //     ...section,
  //     columns: newColumns,
  //   };
  // });
  return layouts;
};

var removeEmptyLayout = function removeEmptyLayout(layouts) {
  var notEmptyCol = removeEmptyColumn(layouts);
  return notEmptyCol.filter(function (section) {
    return section.columns.length > 0;
  });
};

var removeItemFromSource = function removeItemFromSource(columns, columnId, itemKey) {
  return columns.map(function (col) {
    console.log('WILL FOUND', col, columnId, itemKey);
    if (col.id !== columnId) return col;
    console.log('Found');
    var items = col.childIds.filter(function (key) {
      return key !== itemKey;
    });
    return __assign(__assign({}, col), {
      childIds: items
    });
  });
};

var reorderRow = function reorderRow(layouts, source, dest, place) {
  if (!source.isSection) return layouts;
  var findSection = layouts.find(function (section) {
    return section.id === source.sectionId;
  });
  if (!findSection) return layouts;
  var finalLayouts = layouts.filter(function (sect) {
    return sect.id !== source.sectionId;
  }).reduce(function (acc, section) {
    if (section.id !== dest.sectionId) {
      return acc.concat(section);
    }

    return acc.concat(place === DropTargetPlaceEnum.SECTION_TOP ? [findSection, section] : [section, findSection]);
  }, []);
  return removeEmptyLayout(finalLayouts);
};

var reorderLayoutItem = function reorderLayoutItem(layouts, source, dest, place) {
  if (source.isSection && (place === DropTargetPlaceEnum.SECTION_BOTTOM || place === DropTargetPlaceEnum.SECTION_TOP)) {
    var finalLayouts_1 = reorderRow(layouts, source, dest, place);
    var removeOldItem_1 = finalLayouts_1.map(function (layout) {
      return __assign(__assign({}, layout), {
        columns: layout.columns.map(function (cols, index) {
          if (index === source.columnIndex) {
            return removeItemFromSource(cols, source.columnId, source.itemKey);
          }

          return cols;
        })
      });
    });
    return removeEmptyLayout(removeOldItem_1);
  }

  if (place === DropTargetPlaceEnum.SECTION_BOTTOM || place === DropTargetPlaceEnum.SECTION_TOP) {
    var removeOldItem_2 = layouts.map(function (layout) {
      if (layout.id === source.sectionId) {
        return __assign(__assign({}, layout), {
          columns: layout.columns.map(function (cols, index) {
            if (index === source.columnIndex) {
              return removeItemFromSource(cols, source.columnId, source.itemKey);
            }

            return cols;
          })
        });
      }

      return layout;
    });
    var finalLayouts_2 = addToNewRow(removeOldItem_2, source, dest, place);
    return removeEmptyLayout(finalLayouts_2);
  }

  if (source.isSection) {
    return layouts;
  }

  var finalLayouts = layouts.map(function (section) {
    if (section.id !== dest.sectionId) return section;
    var newCols = section.columns[dest.columnIndex];
    if (!newCols) return section;

    var sectionModified = __assign(__assign({}, section), {
      columns: section.columns.map(function (cols, index) {
        if (index === dest.columnIndex) {
          var add = addItemToColumn(cols, source, dest, place);
          return removeItemFromSource(add, source.columnId, source.itemKey);
        }

        return cols;
      })
    });

    return sectionModified;
  });
  var removeOldItem = finalLayouts.map(function (layout) {
    if (layout.id === source.sectionId) {
      return __assign(__assign({}, layout), {
        columns: layout.columns.map(function (cols, index) {
          console.log(source);

          if (index === source.columnIndex) {
            return removeItemFromSource(cols, source.columnId, source.itemKey);
          }

          return cols;
        })
      });
    }

    return layout;
  });
  return removeEmptyLayout(removeOldItem);
};

var changeSectionStyles = function changeSectionStyles(section, sectionId, key, value) {
  var newSection = section.map(function (sect) {
    var _a;

    if (sect.id === sectionId) {
      return __assign(__assign({}, sect), (_a = {}, _a[key] = value, _a));
    }

    return sect;
  });
  return newSection;
};

var LayoutContainer = function LayoutContainer(_a) {
  var data = _a.data,
      renderComponent = _a.renderComponent,
      onLayoutChange = _a.onLayoutChange,
      stableKey = _a.stableDataKey,
      layouts = _a.layouts,
      loading = _a.loading,
      disableChange = _a.disableChange;
  var containeRef = React.useRef(null);

  var _b = React.useState(false),
      isDragging = _b[0],
      setIsDragging = _b[1];

  var _c = React.useState(false);
      _c[0];
      var setDisableDrag = _c[1];

  var _d = React.useState([]),
      actualLayout = _d[0],
      setActualLayout = _d[1];

  var _e = React.useState(false),
      isSectionDragged = _e[0],
      setIsSectionDragged = _e[1];

  var _f = React.useState([]),
      renderableLayout = _f[0],
      setRenderableLayout = _f[1];

  var _g = React.useState(),
      initialSize = _g[0],
      setInitialSize = _g[1];

  var _h = React.useState();
      _h[0];
      var setCurentColWidth = _h[1];

  var _j = React.useState();
      _j[0];
      var setResizedSectionId = _j[1];

  React.useEffect(function () {
    if (layouts) {
      setActualLayout(layouts);
    }
  }, [layouts]);
  React.useEffect(function () {
    if (layouts) {
      setActualLayout(layouts);
    }
  }, [layouts, loading]);
  React.useEffect(function () {
    var renderable = createRenderableLayout(data, actualLayout, stableKey);
    setRenderableLayout(renderable);
  }, [actualLayout, data, stableKey]); // create new layout if new data is added
  // Do not incldes 'stableKey and layouts and hooks-deps'

  React.useEffect(function () {
    var newLayouts = createLayout(data, stableKey, layouts);
    setActualLayout(newLayouts); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  React.useEffect(function () {
    if (actualLayout.length > 0) {
      onLayoutChange(actualLayout);
    }
  }, [actualLayout, onLayoutChange]);

  var handleDragStart = function handleDragStart(e, sectionId, columnId, columnIndex, itemkey) {
    e.stopPropagation();

    var itemKeyType = _typeof(itemkey);

    e.dataTransfer.setData('itemKey', itemkey);
    e.dataTransfer.setData('itemKeyType', itemKeyType);
    e.dataTransfer.setData('sectionId', sectionId);
    e.dataTransfer.setData('colmunId', columnId);
    e.dataTransfer.setData('colmunIndex', columnIndex.toString());
    setIsSectionDragged(false);
  }; // Drop item to create new column or setion or add item to column


  var handleDropItem = function handleDropItem(e, target, sectionId, columnId, columnIndex, itemKey) {
    var sourceItemKey = e.dataTransfer.getData('itemKey');
    var isSection = e.dataTransfer.getData('isSection');
    var sourceSectionId = e.dataTransfer.getData('sectionId');
    var sourceColumnKey = e.dataTransfer.getData('colmunId');
    var sourceColmunIndex = e.dataTransfer.getData('colmunIndex');
    var itemKeyType = e.dataTransfer.getData('itemKeyType');
    console.log('sourceColmunIndex', sourceColmunIndex);
    var source = {
      columnId: sourceColumnKey,
      itemKey: itemKeyType === 'number' ? parseFloat(sourceItemKey) : sourceItemKey,
      sectionId: sourceSectionId,
      isSection: !!isSection,
      columnIndex: parseFloat(sourceColmunIndex)
    };
    var destination = {
      columnId: columnId,
      itemKey: itemKey,
      sectionId: sectionId,
      targetPlace: target,
      columnIndex: columnIndex
    };
    var newLayout = reorderLayoutItem(actualLayout, source, destination, target);
    setIsSectionDragged(false);
    setActualLayout(newLayout);
  };

  var handleResize = function handleResize(e, colmunId, sectionId, isInvert) {
    var _a;

    if (!initialSize) return;
    setResizedSectionId(sectionId);
    var containerWidth = ((_a = containeRef.current) === null || _a === void 0 ? void 0 : _a.offsetWidth) || 0;
    var onPercentInPixel = containerWidth / 100;
    var offset2 = e.clientX - initialSize.initialPosPx;
    var offsetPercent = offset2 / onPercentInPixel;
    var initialWidth = initialSize.currentPercentWidth;
    var newWidth = isInvert ? initialWidth - offsetPercent : initialWidth + offsetPercent;
    setIsDragging(true);

    if (e.clientX === 0) {
      setDisableDrag(false);
      return;
    }

    setDisableDrag(true);
    setCurentColWidth(Math.round(newWidth));
  };

  var handleResizeStart = function handleResizeStart(colId, widthPx, currentPercentWidth, onePixel, initialPosPx) {
    setIsDragging(true);
    setInitialSize({
      widthPx: widthPx,
      currentPercentWidth: currentPercentWidth,
      onePixel: onePixel,
      initialPosPx: initialPosPx,
      colId: colId
    });
  };

  var handleDragSectionStart = function handleDragSectionStart(e, sectionId) {
    e.stopPropagation();
    e.dataTransfer.setData('sectionId', sectionId);
    e.dataTransfer.setData('isSection', 'section');
    setIsSectionDragged(true);
  };

  var handleSectionStyles = function handleSectionStyles(id, key, value) {
    var newLayouts = changeSectionStyles(actualLayout, id, key, value);
    setActualLayout(newLayouts);
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "m-auto py-4"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "min-h-[100px] ",
    ref: containeRef
  }, renderableLayout.map(function (sectionData, index) {
    return /*#__PURE__*/React__default["default"].createElement(DroppableSection, {
      disableChange: disableChange,
      index: index,
      key: sectionData.id,
      sections: sectionData,
      dndTargetKey: sectionData.id,
      disableDrag: isDragging,
      onDropItem: function onDropItem(e, target) {
        return handleDropItem(e, target, sectionData.id, '', 99999999, undefined);
      },
      onDragStart: function onDragStart(e) {
        handleDragSectionStart(e, sectionData.id);
      },
      onChangeSectionStyles: function onChangeSectionStyles(key, value) {
        return handleSectionStyles(sectionData.id, key, value);
      }
    }, sectionData.columns.map(function (cols, colIndex) {
      return /*#__PURE__*/React__default["default"].createElement(ResizableContainer, {
        isRow: true,
        resizable: true,
        key: colIndex,
        styles: {
          width: 1080
        }
      }, cols.map(function (columnData) {
        return /*#__PURE__*/React__default["default"].createElement(DroppableColumnContainer, {
          key: columnData.id,
          disableChange: disableChange,
          initialSize: initialSize,
          disableDrag: isDragging,
          isSection: isSectionDragged,
          styles: columnData.styles,
          className: columnData.className,
          dndTargetKey: columnData.id,
          width: columnData.width,
          currentColumLength: sectionData.columns.length || 1,
          onDropItem: function onDropItem(e, target) {
            return handleDropItem(e, target, sectionData.id, columnData.id, colIndex, undefined);
          },
          onResizeStart: handleResizeStart,
          onResize: function onResize(e, isInvert) {
            setResizedSectionId(sectionData.id);
            handleResize(e, columnData.id, sectionData.id, isInvert);
          }
        }, /*#__PURE__*/React__default["default"].createElement("div", {
          key: columnData.id,
          className: "rlb-col-inner  ".concat('')
        }, columnData.items.map(function (items) {
          return /*#__PURE__*/React__default["default"].createElement(DroppableColumnItem, {
            disableChange: disableChange,
            isSection: isSectionDragged,
            key: items[stableKey],
            dndTargetKey: items[stableKey],
            onDropItem: function onDropItem(e, target) {
              return handleDropItem(e, target, sectionData.id, columnData.id, colIndex, items[stableKey]);
            }
          }, /*#__PURE__*/React__default["default"].createElement(DraggableItem, {
            disableChange: disableChange,
            dndTargetKey: items[stableKey],
            onDragStart: function onDragStart(e) {
              handleDragStart(e, sectionData.id, columnData.id, colIndex, items[stableKey]);
            }
          }, renderComponent(items)));
        })));
      }));
    }));
  })));
};

exports.LayoutContainer = LayoutContainer;
