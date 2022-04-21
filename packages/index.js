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

var DefaultDragIcon = function DefaultDragIcon() {
  return /*#__PURE__*/React__default["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "#444"
  }, /*#__PURE__*/React__default["default"].createElement("path", {
    d: "M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
  }));
};

var DraggableItem = function DraggableItem(_a) {
  var children = _a.children,
      dndTargetKey = _a.dndTargetKey,
      disableChange = _a.disableChange,
      onDragStart = _a.onDragStart;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    draggable: !disableChange,
    onDragStart: onDragStart,
    className: classnames('rlb-draggable-container flex-grow', !disableChange ? 'draggable' : ''),
    "data-draggable": dndTargetKey,
    "target-dnd-droppable": "".concat(dndTargetKey)
  }, /*#__PURE__*/React__default["default"].createElement("span", {
    className: "rlb-drag-icon"
  }, /*#__PURE__*/React__default["default"].createElement(DefaultDragIcon, null)), children);
};

var DropTargetPlaceEnum;

(function (DropTargetPlaceEnum) {
  DropTargetPlaceEnum["LEFT"] = "LEFT";
  DropTargetPlaceEnum["RIGHT"] = "RIGHT";
  DropTargetPlaceEnum["TOP"] = "TOP";
  DropTargetPlaceEnum["BOTTOM"] = "BOTTOM";
  DropTargetPlaceEnum["ROW_TOP"] = "ROW_TOP";
  DropTargetPlaceEnum["ROW_BOTTOM"] = "ROW_BOTTOM";
})(DropTargetPlaceEnum || (DropTargetPlaceEnum = {}));

var ILayoutTargetEnum;

(function (ILayoutTargetEnum) {
  ILayoutTargetEnum["ROW"] = "ROW";
  ILayoutTargetEnum["COL"] = "COL";
  ILayoutTargetEnum["ITEM"] = "ITEM";
})(ILayoutTargetEnum || (ILayoutTargetEnum = {}));

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
      type = _a.type,
      resizable = _a.resizable,
      styles = _a.styles,
      children = _a.children,
      currentWidth = _a.currentWidth,
      noPadding = _a.noPadding,
      maxWidth = _a.maxWidth,
      onResize = _a.onResize,
      onClick = _a.onClick;

  var _b = React.useState(),
      width = _b[0],
      setWidth = _b[1];

  var _c = React.useState({
    width: 0,
    clientX: 0
  }),
      init = _c[0],
      setInit = _c[1];

  var columnRef = React.useRef(null);

  var onResizeStart = function onResizeStart(e) {
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
    onResizeStart(e);

    if (init.clientX && init.width) {
      var diff = init.clientX - e.clientX;
      var add = diff * 2;
      var addition = left ? add : -add;
      var currentWidth_1 = init.width + addition;
      setWidth(currentWidth_1);
      onResize && onResize(currentWidth_1);
    }
  };

  var handleResizeEnd = function handleResizeEnd(e, left) {
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
      onResize && onResize(finalWidth);
    }
  };

  var handleClick = function handleClick(e) {
    e.preventDefault();

    if (onClick) {
      onClick();
    }
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: classnames('rlb-resizable-container', resizable ? 'resizable' : '', noPadding ? 'no-padding' : '', isRow ? 'flex' : ''),
    ref: columnRef,
    style: {
      width: gridValue(50, width) || (styles === null || styles === void 0 ? void 0 : styles.width),
      maxWidth: maxWidth
    },
    "data-width": currentWidth,
    onClick: handleClick
  }, resizable ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "rlb-resize-handler left",
    draggable: true,
    onDrag: function onDrag(e) {
      return handleResize(e, true);
    },
    onDragEnd: function onDragEnd(e) {
      handleResizeEnd(e, true);
    },
    "data-resizable-type": type
  }) : null, children, resizable ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "rlb-resize-handler right",
    draggable: true,
    onDrag: function onDrag(e) {
      return handleResize(e, false);
    },
    onDragEnd: function onDragEnd(e) {
      handleResizeEnd(e, false);
    },
    "data-resizable-type": type
  }) : null);
};

var DroppableSection = function DroppableSection(_a) {
  var children = _a.children,
      section = _a.section,
      resizable = _a.resizable,
      onDragStart = _a.onDragStart,
      onClickSection = _a.onClickSection,
      onResize = _a.onResize;
  return /*#__PURE__*/React__default["default"].createElement(ResizableContainer, {
    resizable: resizable,
    noPadding: true,
    onClick: onClickSection,
    type: "container",
    onResize: onResize
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: classnames('rlb-section rlb-section-container '),
    draggable: false,
    onDragStart: onDragStart,
    style: {
      background: section.backgroundImage ? "url(".concat(section.backgroundImage, ") no-repeat center") : section.backgroundColor,
      backgroundSize: 'cover',
      paddingBlock: (section.spacing || 0) * 8
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "rlb-section-content",
    style: {
      width: section.width,
      margin: 'auto'
    }
  }, children)));
};

var DroppableColumnContainer = function DroppableColumnContainer(_a) {
  var children = _a.children,
      dndTargetKey = _a.dndTargetKey,
      isSection = _a.isSection,
      className = _a.className,
      disableChange = _a.disableChange,
      onDropItem = _a.onDropItem;

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
    className: "".concat(isHoveredTargetClassNameSide(droppableTarget === "".concat(dndTargetKey, "-left"))),
    "target-droppable-item": "".concat(dndTargetKey, "-left"),
    onDragOver: handleDragOver,
    onDragLeave: handleDragOverLeave,
    onDrop: handleDropToLeft
  }) : null, children, !disableChange ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(isHoveredTargetClassNameSide(droppableTarget === "".concat(dndTargetKey, "-right"))),
    "target-droppable-item": "".concat(dndTargetKey, "-right"),
    onDragOver: handleDragOver,
    onDragLeave: handleDragOverLeave,
    onDrop: handleDropToRigth
  }) : null);
};

var createRenderableLayout = function createRenderableLayout(data, layouts, key) {
  var dataLayout = layouts.map(function (layout) {
    var renderedLayout = {
      id: layout.id,
      order: layout.order,
      className: layout.className,
      backgroundColor: layout.backgroundColor,
      backgroundImage: layout.backgroundImage,
      contentWidth: layout.contentWidth,
      spacing: layout.spacing,
      width: layout.width,
      rows: layout.rows.map(function (_a) {
        var columns = _a.columns,
            id = _a.id,
            order = _a.order,
            width = _a.width,
            className = _a.className;
        return {
          id: id,
          order: order,
          width: width,
          className: className,
          columns: columns.map(function (_a) {
            var childIds = _a.childIds,
                id = _a.id,
                order = _a.order,
                width = _a.width,
                className = _a.className;
            return {
              id: id,
              className: className,
              width: width,
              order: order,
              items: childIds.map(function (itemKey) {
                if (itemKey === 'EMPTY_SECTION' && childIds.length <= 1) return {
                  id: 'EMPTY_SECTION'
                };
                return data.find(function (dt) {
                  return dt[key] === itemKey;
                });
              })
            };
          })
        };
      })
    };
    return renderedLayout;
  });
  return dataLayout;
};

var DroppableRow = function DroppableRow(_a) {
  var children = _a.children,
      index = _a.index,
      dndTargetKey = _a.dndTargetKey,
      section = _a.section,
      disableChange = _a.disableChange,
      width = _a.width,
      maxWidth = _a.maxWidth,
      onResize = _a.onResize,
      onDropItem = _a.onDropItem,
      onDragStart = _a.onDragStart;

  var _b = React.useState(),
      droppableTarget = _b[0],
      setDroppableTarget = _b[1];

  var handleDragOver = function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    var targetEl = e.currentTarget;
    var targetDom = targetEl.getAttribute('target-droppable-row');

    if (targetDom && !disableChange) {
      setDroppableTarget(targetDom);
    }
  };

  var isHoveredTargetClassName = function isHoveredTargetClassName(conditions) {
    return conditions ? 'rlb-droppable-section hover' : 'rlb-droppable-section';
  };

  var handleDragOverLeave = function handleDragOverLeave(e) {
    setDroppableTarget('');
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "relative"
  }, index === 0 && !disableChange ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(isHoveredTargetClassName(droppableTarget === "".concat(dndTargetKey, "-top"))),
    "target-droppable-row": "".concat(dndTargetKey, "-top"),
    onDragOver: handleDragOver,
    onDrop: function onDrop(e) {
      onDropItem(e, DropTargetPlaceEnum.ROW_TOP);
      setDroppableTarget('');
    },
    onDragLeave: handleDragOverLeave
  }) : null, /*#__PURE__*/React__default["default"].createElement(ResizableContainer, {
    isRow: true,
    resizable: !disableChange,
    styles: {
      width: width
    },
    onResize: onResize,
    currentWidth: width,
    maxWidth: maxWidth
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: classnames('rlb-section'),
    draggable: !disableChange,
    onDragStart: onDragStart,
    style: {
      paddingBlock: (section.spacing || 0) * 8
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "section-content flex",
    style: {
      width: '100%',
      margin: 'auto'
    }
  }, children))), !disableChange ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(isHoveredTargetClassName(droppableTarget === "".concat(dndTargetKey, "-bottom"))),
    "target-droppable-row": "".concat(dndTargetKey, "-bottom"),
    onDragOver: handleDragOver,
    onDragLeave: handleDragOverLeave,
    onDrop: function onDrop(e) {
      onDropItem(e, DropTargetPlaceEnum.ROW_BOTTOM);
      setDroppableTarget('');
    }
  }) : null);
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

var createNewColumn = function createNewColumn(itemKey) {
  return {
    id: v4(),
    order: 0,
    width: 1080,
    className: '',
    childIds: itemKey || ['EMPTY_SECTION']
  };
};

var removeItemFromSource = function removeItemFromSource(layouts, source, duplicate) {
  var finalLayouts = layouts.map(function (section) {
    if (section.id !== source.sectionId) {
      return section;
    }

    return __assign(__assign({}, section), {
      rows: section.rows.map(function (row) {
        if (row.id !== source.rowId) return row;
        return __assign(__assign({}, row), {
          columns: row.columns.map(function (col) {
            if (col.id !== source.columnId) return col;
            return __assign(__assign({}, col), {
              childIds: col.childIds.filter(function (id) {
                if (!id) return true;
                if (duplicate) return id !== 'DUPLICATE';
                return id !== source.itemKey;
              })
            });
          }).filter(function (col) {
            return col.childIds.length > 0;
          })
        });
      })
    });
  });
  return finalLayouts;
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

    var newCol = createNewColumn(sourceItemKey ? [sourceItemKey] : undefined);

    var current = __assign(__assign({}, next), {
      width: next.width - shouldRemoveFromRestWidth
    });

    var reorder = place === DropTargetPlaceEnum.LEFT ? [newCol, current] : [current, newCol];
    return acc.concat(reorder);
  }, []);
  return newCols;
};

var addToColmunElement = function addToColmunElement(targetColumn, targetColumnId, sourceColumnId, sourceItemKey, targetItemKey, targetPlace) {
  var newColumns = targetColumn.map(function (col) {
    if (col.id !== targetColumnId) {
      return col;
    }

    var newColItems = col.childIds.map(function (k) {
      return sourceColumnId === targetColumnId && k === sourceItemKey ? 'DUPLICATE' : k;
    }).reduce(function (acc, next) {
      if (next === targetItemKey) {
        switch (targetPlace) {
          case DropTargetPlaceEnum.TOP:
            return acc.concat([sourceItemKey, next]);

          case DropTargetPlaceEnum.BOTTOM:
            return acc.concat([next, sourceItemKey]);

          default:
            return acc.concat(next);
        }
      }

      return acc.concat(next);
    }, []);

    var newCol = __assign(__assign({}, col), {
      childIds: newColItems
    });

    return newCol;
  }, []);
  return newColumns;
};

var addItemToColumn = function addItemToColumn(column, source, dest, place) {
  switch (place) {
    case DropTargetPlaceEnum.LEFT:
      return addToNewColumn(column, dest.columnId, source.itemKey, DropTargetPlaceEnum.LEFT);

    case DropTargetPlaceEnum.RIGHT:
      return addToNewColumn(column, dest.columnId, source.itemKey, DropTargetPlaceEnum.RIGHT);

    case DropTargetPlaceEnum.TOP:
      return addToColmunElement(column, dest.columnId, source.columnId, source.itemKey, dest.itemKey, place);

    case DropTargetPlaceEnum.BOTTOM:
      return addToColmunElement(column, dest.columnId, source.columnId, source.itemKey, dest.itemKey, place);
  }
};
var addToColumn = function addToColumn(layouts, source, dest, place) {
  var add = layouts.map(function (layout) {
    if (layout.id !== dest.sectionId) return layout;
    return __assign(__assign({}, layout), {
      rows: layout.rows.map(function (row) {
        if (row.id !== dest.rowId) return row;
        return __assign(__assign({}, row), {
          columns: addItemToColumn(row.columns, source, dest, place) || []
        });
      })
    });
  });
  var clean = removeItemFromSource(add, source, source.columnId === dest.columnId && (place === DropTargetPlaceEnum.BOTTOM || place === DropTargetPlaceEnum.TOP));
  return clean;
};

var createNewRow = function createNewRow(itemkey) {
  var newColumn = createNewColumn(itemkey);
  return {
    id: v4(),
    width: 1080,
    order: 0,
    className: '',
    columns: [newColumn]
  };
};

var addToNewRow = function addToNewRow(layouts, source, dest, place) {
  var newLayouts = layouts.map(function (section) {
    if (section.id !== dest.sectionId) {
      return section;
    }

    var row = createNewRow([source.itemKey]);
    return __assign(__assign({}, section), {
      rows: section.rows.reduce(function (acc, nextRow) {
        if (nextRow.id !== dest.rowId) return acc.concat(nextRow);

        if (place === DropTargetPlaceEnum.ROW_BOTTOM) {
          return acc.concat([nextRow, row]);
        }

        return acc.concat([row, nextRow]);
      }, [])
    });
  }, []);
  var clean = removeItemFromSource(newLayouts, source);
  return clean;
};

var removeEmptyLayout = function removeEmptyLayout(layouts) {
  var noEmptyChild = layouts.map(function (section) {
    return __assign(__assign({}, section), {
      rows: section.rows.map(function (row) {
        return __assign(__assign({}, row), {
          columns: row.columns.map(function (col) {
            return __assign(__assign({}, col), {
              childIds: col.childIds.filter(function (id) {
                return id;
              })
            });
          })
        });
      })
    });
  });
  var noEmptyColumn = noEmptyChild.map(function (section) {
    return __assign(__assign({}, section), {
      rows: section.rows.map(function (row) {
        return __assign(__assign({}, row), {
          columns: row.columns.filter(function (col) {
            return col.childIds.length > 0;
          })
        });
      })
    });
  });
  var noEmptyRow = noEmptyColumn.map(function (section) {
    return __assign(__assign({}, section), {
      rows: section.rows.filter(function (row) {
        return row.columns.length > 0;
      })
    });
  });
  var noEmptySection = noEmptyRow.filter(function (section) {
    return section.rows.length > 0;
  });
  return noEmptySection;
};

// import { ILayoutSection, ILayoutColumn } from '../interface';
//   layouts: ILayoutSection[],
//   source: SourceType,
//   dest: DestinationType,
//   place: DropTargetPlaceEnum,
// ) => {
//   if (
//     source.isSection &&
//     (place === DropTargetPlaceEnum.SECTION_BOTTOM ||
//       place === DropTargetPlaceEnum.SECTION_TOP)
//   ) {
//     const finalLayouts = reorderRow(layouts, source, dest, place);
//     const removeOldItem = finalLayouts.map((layout) => ({
//       ...layout,
//       columns: layout.columns.map((cols, index) => {
//         if (index === source.columnIndex) {
//           return removeItemFromSource(
//             cols,
//             source.columnId,
//             source.itemKey,
//           );
//         }
//         return cols;
//       }),
//     }));
//     return removeEmptyLayout(removeOldItem);
//   }
//   if (
//     place === DropTargetPlaceEnum.SECTION_BOTTOM ||
//     place === DropTargetPlaceEnum.SECTION_TOP
//   ) {
//     const removeOldItem = layouts.map((layout) => {
//       if (layout.id === source.sectionId) {
//         return {
//           ...layout,
//           columns: layout.columns.map((cols, index) => {
//             if (index === source.columnIndex) {
//               return removeItemFromSource(
//                 cols,
//                 source.columnId,
//                 source.itemKey,
//               );
//             }
//             return cols;
//           }),
//         };
//       }
//       return layout;
//     });
//     const finalLayouts = addToNewRow(
//       removeOldItem,
//       source,
//       dest,
//       place,
//     );
//     return removeEmptyLayout(finalLayouts);
//   }
//   if (source.isSection) {
//     return layouts;
//   }
//   const finalLayouts = layouts.map((section) => {
//     if (section.id !== dest.sectionId) return section;
//     const newCols = section.columns[dest.columnIndex];
//     if (!newCols) return section;
//     const sectionModified = {
//       ...section,
//       columns: section.columns.map((cols, index) => {
//         if (index === dest.columnIndex) {
//           const add = addItemToColumn(cols, source, dest, place);
//           return removeItemFromSource(
//             add,
//             source.columnId,
//             source.itemKey,
//           );
//         }
//         return cols;
//       }),
//     };
//     return sectionModified;
//   });
//   const removeOldItem = finalLayouts.map((layout) => {
//     if (layout.id === source.sectionId) {
//       return {
//         ...layout,
//         columns: layout.columns.map((cols, index) => {
//           console.log(source);
//           if (index === source.columnIndex) {
//             return removeItemFromSource(
//               cols,
//               source.columnId,
//               source.itemKey,
//             );
//           }
//           return cols;
//         }),
//       };
//     }
//     return layout;
//   });
//   return removeEmptyLayout(removeOldItem);
// };

var reorderLayoutItem = function reorderLayoutItem(layouts, source, dest, place, target) {
  switch (target) {
    case ILayoutTargetEnum.ROW:
      return addToNewRow(layouts, source, dest, place);

    case ILayoutTargetEnum.COL:
      return addToColumn(layouts, source, dest, place);

    case ILayoutTargetEnum.ITEM:
      return addToColumn(layouts, source, dest, place);
  }
};

var reorderLayout = function reorderLayout(layouts, source, dest, place, target) {
  var ordered = reorderLayoutItem(layouts, source, dest, place, target);

  if (ordered) {
    var removeEmpty = removeEmptyLayout(ordered);
    return removeEmpty;
  }

  return layouts;
};

var changeRowWidth = function changeRowWidth(layouts, inputs) {
  return layouts.map(function (section) {
    if (section.id !== inputs.sectionId) return section;
    return __assign(__assign({}, section), {
      rows: section.rows.map(function (row) {
        if (row.id !== inputs.rowId) return row;
        return __assign(__assign({}, row), {
          width: inputs.width
        });
      })
    });
  });
};

var changeSectionStyles = function changeSectionStyles(currentLayouts, sectionId, styles) {
  return currentLayouts.map(function (section) {
    if (section.id !== sectionId) return section;
    return __assign(__assign({}, section), styles);
  });
};

var LayoutContainer = function LayoutContainer(_a) {
  var data = _a.data,
      renderComponent = _a.renderComponent,
      onLayoutChange = _a.onLayoutChange,
      stableKey = _a.stableDataKey,
      layouts = _a.layouts,
      disableChange = _a.disableChange,
      _onClickSection = _a.onClickSection;
  var containeRef = React.useRef(null);

  var _b = React.useState([]),
      actualLayout = _b[0],
      setActualLayout = _b[1];

  var _c = React.useState(false),
      isSectionDragged = _c[0],
      setIsSectionDragged = _c[1];

  var _d = React.useState([]),
      renderableLayout = _d[0],
      setRenderableLayout = _d[1];

  React.useEffect(function () {
    if (layouts && layouts.length > 0) {
      setActualLayout(layouts);
    }
  }, [layouts]);
  React.useEffect(function () {
    if (actualLayout.length > 0) {
      var renderable = createRenderableLayout(data, actualLayout, stableKey);
      setRenderableLayout(renderable);
    }
  }, [actualLayout, data]);
  React.useEffect(function () {
    if (actualLayout.length > 0) {
      onLayoutChange(actualLayout);
    }
  }, [actualLayout]);

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

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "m-auto py-4"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "min-h-[100px] ",
    ref: containeRef
  }, renderableLayout.map(function (section, index) {
    return /*#__PURE__*/React__default["default"].createElement(DroppableSection, {
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

        if (layout && _onClickSection && !disableChange) {
          _onClickSection(layout);
        }
      },
      onResize: function onResize(width) {
        return handleResizeSection(width, section.id);
      }
    }, section.rows.map(function (row, rowIndex) {
      return /*#__PURE__*/React__default["default"].createElement(DroppableRow, {
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
        return /*#__PURE__*/React__default["default"].createElement(ResizableContainer, {
          key: column.id,
          // resizable={row.columns.length > 1}
          styles: {
            width: "".concat(Math.round(width), "%")
          },
          type: "column",
          currentWidth: Math.round(width)
        }, /*#__PURE__*/React__default["default"].createElement(DroppableColumnContainer, {
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
        }, /*#__PURE__*/React__default["default"].createElement("div", {
          key: column.id,
          className: "rlb-col-inner  ".concat('')
        }, column.items.map(function (items, index) {
          if (!items) return null;
          return /*#__PURE__*/React__default["default"].createElement(DroppableColumnItem, {
            disableChange: disableChange,
            isSection: isSectionDragged,
            key: index,
            dndTargetKey: items[stableKey],
            onDropItem: function onDropItem(e, target) {
              return handleDropItem(e, target, section.id, column.id, row.id, items[stableKey], ILayoutTargetEnum.ITEM);
            }
          }, /*#__PURE__*/React__default["default"].createElement(DraggableItem, {
            disableChange: disableChange || items['id'] === 'EMPTY_SECTION',
            dndTargetKey: items[stableKey],
            onDragStart: function onDragStart(e) {
              handleDragStart(e, section.id, column.id, row.id, items[stableKey]);
            }
          }, items['id'] === 'EMPTY_SECTION' && !disableChange ? /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("p", null, "Drop or add block here...")) : null, items['id'] !== 'EMPTY_SECTION' ? renderComponent(items) : null));
        }))));
      }));
    }));
  })));
};

var createNewSection = function createNewSection(itemKey) {
  var row = createNewRow(itemKey);
  return {
    id: v4(),
    className: '',
    order: 0,
    backgroundColor: '',
    backgroundImage: '',
    width: '100%',
    rows: [row]
  };
};

//   data: any[],
//   stableDataKey: string,
// ): ILayoutSection[] => {
//   return [uuidv4()].map((id: any, index: number) => {
//     const columns: ILayoutColumn[] = [
//       {
//         childIds: data.map((item) => item[stableDataKey]),
//         id: `column-${uuidv4()}`,
//         order: 0,
//         className: 'w-full',
//         width: 100,
//       },
//     ];
//     const section: ILayoutSection = {
//       className: '',
//       id: `section-${uuidv4()}`,
//       order: 0,
//       columns: [columns],
//       contentWidth: 1080,
//       width: '100%',
//       spacing: 2,
//     };
//     return section;
//   });
// };

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
    var newSections = createNewSection(data.map(function (dt) {
      return dt[stableDataKey];
    }));
    return [newSections];
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

exports.LayoutContainer = LayoutContainer;
exports.changeSectionStyles = changeSectionStyles;
exports.createLayout = createLayout;
exports.createNewSection = createNewSection;
