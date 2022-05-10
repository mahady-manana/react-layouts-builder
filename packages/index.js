'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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

var DraggableItem = function DraggableItem(_a) {
  var children = _a.children,
      dndTargetKey = _a.dndTargetKey,
      disableChange = _a.disableChange;
      _a.onClick;
      var onDragStart = _a.onDragStart;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    draggable: !disableChange,
    onDragStart: onDragStart,
    className: classnames('rlb-draggable-container flex-grow', !disableChange ? 'draggable' : ''),
    "data-draggable": dndTargetKey,
    "target-dnd-droppable": "".concat(dndTargetKey)
  }, children);
};

exports.DropTargetPlaceEnum = void 0;

(function (DropTargetPlaceEnum) {
  DropTargetPlaceEnum["LEFT"] = "LEFT";
  DropTargetPlaceEnum["RIGHT"] = "RIGHT";
  DropTargetPlaceEnum["TOP"] = "TOP";
  DropTargetPlaceEnum["BOTTOM"] = "BOTTOM";
  DropTargetPlaceEnum["ROW_TOP"] = "ROW_TOP";
  DropTargetPlaceEnum["ROW_BOTTOM"] = "ROW_BOTTOM";
})(exports.DropTargetPlaceEnum || (exports.DropTargetPlaceEnum = {}));

exports.ILayoutTargetEnum = void 0;

(function (ILayoutTargetEnum) {
  ILayoutTargetEnum["ROW"] = "ROW";
  ILayoutTargetEnum["COL"] = "COL";
  ILayoutTargetEnum["ITEM"] = "ITEM";
})(exports.ILayoutTargetEnum || (exports.ILayoutTargetEnum = {}));

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
    onDropItem(e, exports.DropTargetPlaceEnum.TOP);
    setDroppableTarget('');
  };

  var handleDropToBottom = function handleDropToBottom(e) {
    e.preventDefault();
    onDropItem(e, exports.DropTargetPlaceEnum.BOTTOM);
    setDroppableTarget('');
  };

  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, !disableChange ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(isHoveredTargetClassName(droppableTarget === "".concat(dndTargetKey, "-top")), " top"),
    "target-droppable-item": "".concat(dndTargetKey, "-top"),
    onDragOver: handleDragOver,
    onDragLeave: handleDragOverLeave,
    onDrop: handleDropToTop
  }, droppableTarget === "".concat(dndTargetKey, "-top") ? 'Add item to column...' : null) : null, children, !disableChange ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(isHoveredTargetClassName(droppableTarget === "".concat(dndTargetKey, "-bottom")), " bottom"),
    "target-droppable-item": "".concat(dndTargetKey, "-bottom"),
    onDragOver: handleDragOver,
    onDragLeave: handleDragOverLeave,
    onDrop: handleDropToBottom
  }, droppableTarget === "".concat(dndTargetKey, "-bottom") ? 'Add item to column...' : null) : null);
};

var findWidthPercentByPx = function findWidthPercentByPx(initWidthPx, initWidthPrc, currentWidth, multi) {
  var w = currentWidth * initWidthPrc / initWidthPx;

  if (multi && w < 15) {
    return 15;
  }

  if (multi && w > 85) {
    return 85;
  }

  if (w > 100) return 100;
  if (w < 15) return 10;
  return w;
};

var gridValue = function gridValue(coef, n) {
  if (n === 0 || !n) {
    return undefined;
  }

  var q = n % coef;
  var r = coef - q;
  var f = r <= coef / 2 ? n + r : n - q;
  return f;
};

var ResizableContainer = function ResizableContainer(_a) {
  var isRow = _a.isRow,
      type = _a.type;
      _a.isCol;
      var colIndex = _a.colIndex,
      isSection = _a.isSection,
      resizable = _a.resizable,
      styles = _a.styles,
      children = _a.children,
      currentWidth = _a.currentWidth,
      noPadding = _a.noPadding,
      maxWidth = _a.maxWidth,
      colNumber = _a.colNumber,
      onResize = _a.onResize,
      onResizeColEnd = _a.onResizeColEnd,
      onResizeEnd = _a.onResizeEnd,
      onClick = _a.onClick;

  var _b = React.useState(0),
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
    var columnWidth = (_a = columnRef.current) === null || _a === void 0 ? void 0 : _a.offsetWidth;
    if (!columnWidth) return;
    setWidth(columnWidth);
    setInit({
      width: width || columnWidth || 0,
      clientX: e.clientX
    });
  };

  var handleResize = function handleResize(e, left) {
    var _a, _b;

    e.preventDefault();
    e.stopPropagation();
    onResizeStart(e);

    if (init.clientX && init.width) {
      if (e.clientX === 0) return;
      var diff = init.clientX - e.clientX;
      var needX2 = colNumber === 1 || colNumber && colNumber > 2 && colIndex !== 0 && colIndex !== colNumber - 1;
      console.log('needX2', needX2);
      var add = needX2 ? diff * 2 : diff * 1;
      var addition = left ? add : -add;
      var cWidth = init.width + addition;
      var widthNow = ((_a = styles === null || styles === void 0 ? void 0 : styles.width) === null || _a === void 0 ? void 0 : _a.includes('%')) ? parseFloat((_b = styles === null || styles === void 0 ? void 0 : styles.width) === null || _b === void 0 ? void 0 : _b.replace('%', '')) : styles === null || styles === void 0 ? void 0 : styles.width;
      var w = findWidthPercentByPx(init.width, widthNow, cWidth, (colNumber || 0) > 1);
      setWidth(w);
      onResize && onResize(w, init.width);
    }
  };

  var handleResizeEnd = function handleResizeEnd(e, left) {
    if (init.clientX && init.width) {
      var grid = colNumber && colNumber % 2 !== 0 ? 3 : 10;
      onResizeColEnd && onResizeColEnd(init.width, gridValue(grid, width));
      onResize && onResize(width, init.width, true);
      onResizeEnd && onResizeEnd(width);
      setInit(function (prev) {
        return {
          width: prev.width,
          clientX: 0
        };
      });
      setWidth(0);
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
      width: width ? "".concat(Math.round(width), "%") : styles === null || styles === void 0 ? void 0 : styles.width,
      maxWidth: maxWidth
    },
    "data-width": currentWidth,
    onClick: handleClick
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "rlb-resizable-inner",
    style: {
      maxWidth: isSection ? styles === null || styles === void 0 ? void 0 : styles.width : '100%'
    }
  }, resizable ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "rlb-resize-handler left",
    draggable: true,
    onDrag: function onDrag(e) {
      return handleResize(e, true);
    },
    onDragEnd: function onDragEnd(e) {
      handleResizeEnd();
    },
    "data-resizable-type": type
  }) : null, children, resizable ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "rlb-resize-handler right",
    draggable: true,
    onDrag: function onDrag(e) {
      return handleResize(e, false);
    },
    onDragEnd: function onDragEnd(e) {
      handleResizeEnd();
    },
    "data-resizable-type": type
  }) : null));
};

var DroppableSection = function DroppableSection(_a) {
  var children = _a.children,
      section = _a.section,
      width = _a.width,
      resizable = _a.resizable,
      onDragStart = _a.onDragStart,
      onClickSection = _a.onClickSection,
      onResize = _a.onResize;
  return /*#__PURE__*/React__default["default"].createElement(ResizableContainer, {
    isSection: true,
    resizable: resizable,
    noPadding: true,
    onClick: onClickSection,
    type: "container",
    onResizeEnd: onResize,
    styles: {
      width: width
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: classnames('rlb-section rlb-section-container '),
    draggable: false,
    onDragStart: onDragStart,
    style: {
      background: section.backgroundImage ? "url(".concat(section.backgroundImage, ")") : section.backgroundColor,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover'
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
    console.log('targetDom', targetDom);

    if (targetDom && !isSection) {
      setDroppableTarget(targetDom);
    }
  };

  var handleDragOverLeave = function handleDragOverLeave(e) {
    e.preventDefault();
    setDroppableTarget('');
  };

  var handleDropToLeft = function handleDropToLeft(e) {
    e.preventDefault();
    onDropItem(e, exports.DropTargetPlaceEnum.LEFT);
    setDroppableTarget('');
  };

  var handleDropToRigth = function handleDropToRigth(e) {
    e.preventDefault();
    onDropItem(e, exports.DropTargetPlaceEnum.RIGHT);
    setDroppableTarget('');
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: classnames('rlb-col', // `w-[${widthNumber}%]`,
    className),
    ref: columnRef
  }, !disableChange ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: classnames(droppableTarget === "".concat(dndTargetKey, "-left") ? 'rlb-droppable-side-hover' : '', 'ds-left rlb-droppable-side'),
    "target-droppable-item": "".concat(dndTargetKey, "-left"),
    onDragOver: handleDragOver,
    onDragLeave: handleDragOverLeave,
    onDrop: handleDropToLeft
  }) : null, children, !disableChange ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: classnames(droppableTarget === "".concat(dndTargetKey, "-right") ? 'rlb-droppable-side-hover' : '', 'ds-right rlb-droppable-side'),
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
      width: layout.width,
      container: layout.container,
      rows: layout.rows.map(function (_a) {
        var columns = _a.columns,
            id = _a.id,
            order = _a.order,
            width = _a.width,
            className = _a.className,
            isContainer = _a.isContainer;
        return {
          id: id,
          order: order,
          width: width,
          className: className,
          isContainer: !!isContainer,
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
      dndTargetKey = _a.dndTargetKey;
      _a.section;
      var disableChange = _a.disableChange;
      _a.width;
      _a.maxWidth;
      _a.onResize;
      var onDropItem = _a.onDropItem;
      _a.onDragStart;

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
    className: "".concat(isHoveredTargetClassName(droppableTarget === "".concat(dndTargetKey, "-top")), " top"),
    "target-droppable-row": "".concat(dndTargetKey, "-top"),
    onDragOver: handleDragOver,
    onDrop: function onDrop(e) {
      onDropItem(e, exports.DropTargetPlaceEnum.ROW_TOP);
      setDroppableTarget('');
    },
    onDragLeave: handleDragOverLeave
  }) : null, /*#__PURE__*/React__default["default"].createElement("div", {
    className: classnames('rlb-section'),
    draggable: !disableChange
  }, children), !disableChange ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(isHoveredTargetClassName(droppableTarget === "".concat(dndTargetKey, "-bottom")), " bottom"),
    "target-droppable-row": "".concat(dndTargetKey, "-bottom"),
    onDragOver: handleDragOver,
    onDragLeave: handleDragOverLeave,
    onDrop: function onDrop(e) {
      onDropItem(e, exports.DropTargetPlaceEnum.ROW_BOTTOM);
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
    width: 100,
    className: '',
    childIds: itemKey || ['EMPTY_SECTION']
  };
};

var keepRowFullWidth = function keepRowFullWidth(columns) {
  var diffWidth = columns.reduce(function (acc, next) {
    return acc + next.width;
  }, 0);

  if (diffWidth < 98 || diffWidth > 101) {
    var rest = 100 - diffWidth;
    var shouldAdd_1 = Math.round(rest / columns.length);
    return columns.map(function (col) {
      return __assign(__assign({}, col), {
        width: col.width + shouldAdd_1
      });
    });
  }

  return columns;
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

var removeItemFromSource = function removeItemFromSource(layouts, source, duplicate) {
  var finalLayouts = layouts.map(function (section) {
    if (section.id !== source.sectionId) {
      return section;
    }

    return __assign(__assign({}, section), {
      rows: section.rows.map(function (row) {
        if (row.id !== source.rowId) return row;
        var newColmuns = row.columns.map(function (col) {
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
        });
        var keepFullWidth = keepRowFullWidth(newColmuns);
        return __assign(__assign({}, row), {
          columns: keepFullWidth
        });
      })
    });
  });
  var noEmpty = removeEmptyLayout(finalLayouts);
  return noEmpty;
};

var addToNewColumn = function addToNewColumn(targetColumn, targetColumnId, sourceItemKey, place) {
  var newCols = targetColumn.reduce(function (acc, next) {
    var width = 100 / (targetColumn.length + 1);

    if (next.id !== targetColumnId) {
      return acc.concat(__assign(__assign({}, next), {
        width: width
      }));
    }

    var newCol = createNewColumn(sourceItemKey ? [sourceItemKey] : undefined);

    var newColAdjustWidth = __assign(__assign({}, newCol), {
      width: width
    });

    var current = __assign(__assign({}, next), {
      width: width
    });

    var reorder = place === exports.DropTargetPlaceEnum.LEFT ? [newColAdjustWidth, current] : [current, newColAdjustWidth];
    return acc.concat(reorder);
  }, []);
  var keepFullWidth = keepRowFullWidth(newCols);
  return keepFullWidth;
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
          case exports.DropTargetPlaceEnum.TOP:
            return acc.concat([sourceItemKey, next]);

          case exports.DropTargetPlaceEnum.BOTTOM:
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
  var keepFullWidth = keepRowFullWidth(newColumns);
  return keepFullWidth;
};

var addItemToColumn = function addItemToColumn(column, source, dest, place) {
  switch (place) {
    case exports.DropTargetPlaceEnum.LEFT:
      return addToNewColumn(column, dest.columnId, source.itemKey, exports.DropTargetPlaceEnum.LEFT);

    case exports.DropTargetPlaceEnum.RIGHT:
      return addToNewColumn(column, dest.columnId, source.itemKey, exports.DropTargetPlaceEnum.RIGHT);

    case exports.DropTargetPlaceEnum.TOP:
      return addToColmunElement(column, dest.columnId, source.columnId, source.itemKey, dest.itemKey, place);

    case exports.DropTargetPlaceEnum.BOTTOM:
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
  var clean = removeItemFromSource(add, source, source.columnId === dest.columnId && (place === exports.DropTargetPlaceEnum.BOTTOM || place === exports.DropTargetPlaceEnum.TOP));
  return clean;
};

var createNewRow = function createNewRow(itemkey, iscontianer) {
  var newColumn = createNewColumn(itemkey);
  return {
    id: v4(),
    width: 'auto',
    order: 0,
    className: '',
    columns: [newColumn],
    isContainer: iscontianer
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

        if (place === exports.DropTargetPlaceEnum.ROW_BOTTOM) {
          return acc.concat([nextRow, row]);
        }

        return acc.concat([row, nextRow]);
      }, [])
    });
  }, []);
  var clean = removeItemFromSource(newLayouts, source);
  return clean;
};

var reorderLayoutItem = function reorderLayoutItem(layouts, source, dest, place, target) {
  switch (target) {
    case exports.ILayoutTargetEnum.ROW:
      return addToNewRow(layouts, source, dest, place);

    case exports.ILayoutTargetEnum.COL:
      return addToColumn(layouts, source, dest, place);

    case exports.ILayoutTargetEnum.ITEM:
      return addToColumn(layouts, source, dest, place);
  }
};

var reorderLayout = function reorderLayout(layouts, source, dest, place, target) {
  // Do not run reorder if place doesnt change
  if (source.itemKey === dest.itemKey) return layouts;
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

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

var changeColumnWidth = function changeColumnWidth(layouts, container, cols) {
  return layouts.map(function (section) {
    if (section.id !== container.sectionId) return section;
    return __assign(__assign({}, section), {
      rows: section.rows.map(function (row) {
        if (row.id !== container.rowId) return row;
        var newCols = row.columns.map(function (col) {
          var makeItGrid = row.columns.length % 2 === 0 ? gridValue(10, cols.width) : cols.width;
          if (!makeItGrid) return col;

          if (col.id === cols.colId) {
            return __assign(__assign({}, col), {
              width: makeItGrid
            });
          }

          var rest = cols.init - makeItGrid;
          var add = rest / (row.columns.length - 1);
          return __assign(__assign({}, col), {
            width: Math.round(col.width + add)
          });
        });
        var full = row.columns.length > 1 ? keepRowFullWidth(newCols) : newCols;
        return __assign(__assign({}, row), {
          columns: full
        });
      })
    });
  });
};

var LayoutRowContainer = function LayoutRowContainer(_a) {
  var disabled = _a.disabled,
      stableKey = _a.stableKey,
      columns = _a.columns,
      layouts = _a.layouts,
      sectionId = _a.sectionId,
      rowId = _a.rowId,
      setActualLayout = _a.setActualLayout,
      renderComponent = _a.renderComponent,
      onFocusItem = _a.onFocusItem;
  var containerRef = React.useRef(null);

  var _b = React.useState(false);
      _b[0];
      var setDragStart = _b[1];

  var _c = React.useState(),
      currentColumn = _c[0],
      setCurrentColumn = _c[1];

  var _d = React.useState(0),
      addToWidth = _d[0],
      setAddToWidth = _d[1];

  var _e = React.useState(false),
      isSectionDragged = _e[0],
      setIsSectionDragged = _e[1];

  var handleDragStart = function handleDragStart(e, sectionId, columnId, rowId, itemkey) {
    e.stopPropagation();

    var itemKeyType = _typeof(itemkey);

    e.dataTransfer.setData('itemKey', itemkey);
    e.dataTransfer.setData('itemKeyType', itemKeyType);
    e.dataTransfer.setData('sectionId', sectionId);
    e.dataTransfer.setData('colmunId', columnId);
    e.dataTransfer.setData('rowId', rowId);
    setIsSectionDragged(false);
    setDragStart(true);
  }; //   // Drop item to create new column or setion or add item to column


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

    setDragStart(false);
    var newLayout = reorderLayout(layouts, source, destination, target, layoutTarget);
    setIsSectionDragged(false);

    if (newLayout) {
      setActualLayout(newLayout);
    }
  };

  var _onResize = function onResize(w) {
    var _a;

    (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.clientWidth;
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "section-content flex",
    style: {
      width: '100%',
      margin: 'auto'
    },
    ref: containerRef
  }, columns.map(function (column, index) {
    return /*#__PURE__*/React__default["default"].createElement(ResizableContainer, {
      isCol: true,
      colIndex: index,
      key: column.id,
      resizable: true,
      colNumber: columns.length,
      styles: {
        width: addToWidth && currentColumn !== column.id ? "".concat(Math.round(column.width + addToWidth), "%") : "".concat(Math.round(column.width), "%")
      },
      type: "column",
      currentWidth: Math.round(column.width),
      onResize: function onResize(w, init) {
        setCurrentColumn(column.id);

        _onResize();

        findWidthPercentByPx(init, column.width, w);
        var rest = column.width - w;
        var add = rest / (columns.length - 1);
        setAddToWidth(function (prev) {
          return Math.abs((prev || 0) - add) > 5 ? prev : add;
        });
      },
      onResizeColEnd: function onResizeColEnd(_init, _final) {
        setCurrentColumn(undefined);
        var newLayouts = changeColumnWidth(layouts, {
          sectionId: sectionId,
          rowId: rowId
        }, {
          width: _final,
          colId: column.id,
          init: column.width
        });
        setAddToWidth(0);
        setActualLayout(newLayouts); // handleFinishResize(w, column.id);
      }
    }, /*#__PURE__*/React__default["default"].createElement(DroppableColumnContainer, {
      key: column.id,
      disableChange: disabled,
      //   isSection={isSectionDragged} TO DO
      styles: column.styles,
      className: column.className,
      dndTargetKey: column.id,
      width: column.width,
      currentColumLength: 1,
      onDropItem: function onDropItem(e, target) {
        return handleDropItem(e, target, sectionId, column.id, rowId, undefined, exports.ILayoutTargetEnum.COL);
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      key: column.id,
      className: "rlb-col-inner"
    }, column.items.map(function (items, index) {
      if (!items) return null;
      return /*#__PURE__*/React__default["default"].createElement(DroppableColumnItem, {
        disableChange: disabled,
        isSection: isSectionDragged,
        key: index,
        dndTargetKey: items[stableKey],
        onDropItem: function onDropItem(e, target) {
          return handleDropItem(e, target, sectionId, column.id, rowId, items[stableKey], exports.ILayoutTargetEnum.ITEM);
        }
      }, /*#__PURE__*/React__default["default"].createElement(DraggableItem, {
        disableChange: disabled || items['id'] === 'EMPTY_SECTION',
        dndTargetKey: items[stableKey],
        onDragStart: function onDragStart(e) {
          handleDragStart(e, sectionId, column.id, rowId, items[stableKey]);
        },
        onClick: function onClick() {
          onFocusItem && onFocusItem({
            sectionId: sectionId,
            columnId: column.id,
            itemKey: items[stableKey],
            rowId: rowId,
            isSection: false
          });
        }
      }, items['id'] === 'EMPTY_SECTION' && !disabled ? /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("p", null, "Drop or add block here...")) : null, items['id'] !== 'EMPTY_SECTION' ? renderComponent(items, {
        columnId: column.id,
        itemKey: items[stableKey],
        rowId: rowId,
        sectionId: sectionId
      }) : null));
    }))));
  }));
};

var LayoutContainer = function LayoutContainer(_a) {
  var data = _a.data,
      renderComponent = _a.renderComponent,
      onLayoutChange = _a.onLayoutChange,
      stableKey = _a.stableDataKey,
      layouts = _a.layouts,
      disableChange = _a.disableChange,
      _onClickSection = _a.onClickSection;
      _a.onFocusItem;
  var containeRef = React.useRef(null);

  var _b = React.useState([]),
      actualLayout = _b[0],
      setActualLayout = _b[1];

  var _c = React.useState(false);
      _c[0];
      var setIsSectionDragged = _c[1];

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
  }, [actualLayout]); // Drop item to create new column or setion or add item to column

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
    className: "m-auto"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "min-h-[100px] ",
    ref: containeRef
  }, renderableLayout.map(function (section, index) {
    var isPublic = disableChange ? false : section.container;
    return /*#__PURE__*/React__default["default"].createElement(DroppableSection, {
      index: index,
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
      return /*#__PURE__*/React__default["default"].createElement(DroppableRow, {
        disableChange: row.isContainer || disableChange,
        index: rowIndex,
        key: row.id,
        section: section,
        maxWidth: section.width,
        width: row.width,
        dndTargetKey: row.id,
        onDropItem: function onDropItem(e, target) {
          return handleDropItem(e, target, section.id, '', row.id, undefined, exports.ILayoutTargetEnum.ROW);
        },
        onDragStart: function onDragStart(e) {
          handleDragSectionStart(e, section.id);
        },
        onResize: function onResize(width) {
          return handleResizeRow(width, section.id, row.id);
        }
      }, /*#__PURE__*/React__default["default"].createElement(LayoutRowContainer, {
        stableKey: stableKey,
        layouts: actualLayout,
        columns: row.columns,
        sectionId: section.id,
        rowId: row.id,
        disabled: disableChange,
        renderComponent: renderComponent,
        setActualLayout: setActualLayout
      }));
    }));
  })));
};

var createNewSection = function createNewSection(itemKey, isContainer, defaultWidth) {
  var row = createNewRow(itemKey);
  return {
    id: v4(),
    className: '',
    order: 0,
    backgroundColor: '',
    backgroundImage: '',
    width: defaultWidth || '100%',
    rows: [row],
    container: isContainer
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

var createLayout = function createLayout(data, stableDataKey, currentLayouts, options) {
  if (!currentLayouts || (currentLayouts === null || currentLayouts === void 0 ? void 0 : currentLayouts.length) === 0) {
    var layouts = data.map(function (dataItem) {
      return createNewSection([dataItem[stableDataKey]], options === null || options === void 0 ? void 0 : options.isContainer, options === null || options === void 0 ? void 0 : options.width);
    });
    return layouts; // const newSections = createNewSection(
    //   data.map((dt) => dt[stableDataKey]),
    // );
    // return [newSections];
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

var addToRow = function addToRow(layouts, sectionId, itemId) {
  var newLayouts = layouts.map(function (section) {
    if (section.id !== sectionId) {
      return section;
    }

    var row = createNewRow([itemId]);
    return __assign(__assign({}, section), {
      rows: section.rows.concat(row)
    });
  }, []);
  return newLayouts;
};

var addToItem = function addToItem(layouts, itemKey, dest, bottom) {
  var add = layouts.map(function (layout) {
    if (layout.id !== dest.sectionId) return layout;
    return __assign(__assign({}, layout), {
      rows: layout.rows.map(function (row) {
        if (row.id !== dest.rowId) return row;
        return __assign(__assign({}, row), {
          columns: row.columns.map(function (col) {
            if (col.id !== dest.columnId) {
              return col;
            }

            return __assign(__assign({}, col), {
              childIds: col.childIds.reduce(function (acc, next) {
                if (next === dest.itemKey) {
                  if (bottom) return acc.concat(next, itemKey);
                  return acc.concat(itemKey, next);
                }

                return acc.concat(next);
              }, [])
            });
          })
        });
      })
    });
  });
  return add;
};

exports.LayoutContainer = LayoutContainer;
exports.addToItem = addToItem;
exports.addToRow = addToRow;
exports.changeSectionStyles = changeSectionStyles;
exports.createLayout = createLayout;
exports.createNewSection = createNewSection;
exports.removeItemFromLayout = removeItemFromSource;
