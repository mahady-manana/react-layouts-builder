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
      disableChange = _a.disableChange,
      imageWidth = _a.imageWidth,
      isImage = _a.isImage,
      oneCol = _a.oneCol,
      onDragStart = _a.onDragStart,
      onImageResizeFinished = _a.onImageResizeFinished;
  var containerRef = React.useRef(null);

  var _b = React.useState(0),
      width = _b[0],
      setWidth = _b[1];

  var _c = React.useState(0),
      finalWidth = _c[0],
      setFinalWidth = _c[1];

  var _d = React.useState(),
      initWidth = _d[0],
      setInitWidth = _d[1];

  var _e = React.useState(),
      initClientX = _e[0],
      setInitClientX = _e[1];

  var _f = React.useState(),
      direction = _f[0],
      setDirection = _f[1];

  var _g = React.useState(),
      percentPX = _g[0],
      setPercentPX = _g[1];

  var _h = React.useState(false),
      startResize = _h[0],
      setStartResize = _h[1];

  var _j = React.useState(500),
      waitBeforeUpdate = _j[0],
      setWaitBeforeUpdate = _j[1];

  React.useEffect(function () {
    if (imageWidth) {
      setWidth(imageWidth);
    }
  }, [imageWidth]);

  var _onMouseDown = function onMouseDown(e) {
    var _a, _b;

    if (!((_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.offsetWidth)) return;
    setInitWidth(imageWidth || 100);
    setStartResize(true);
    setInitClientX(e.clientX);
    var p1px = ((_b = containerRef.current) === null || _b === void 0 ? void 0 : _b.offsetWidth) / 100;
    setPercentPX(p1px);
  };

  var onMouseMouve = function onMouseMouve(e) {
    var newCX = e.clientX;

    if (initClientX && initWidth && startResize && percentPX && direction) {
      var diff = initClientX - newCX;
      var w = diff / percentPX;
      var dir = direction === 'left' ? w : -w;
      var isOneCol = oneCol ? dir * 2 : dir;

      var _final = initWidth + isOneCol;

      if (_final > 100) {
        setWidth(100);
        setFinalWidth(100);
      } else if (_final < 15) {
        setWidth(15);
        setFinalWidth(15);
      } else {
        setWidth(_final);
        setFinalWidth(_final);
      }
    }
  };

  var onMouseLeaveOrUp = function onMouseLeaveOrUp(e) {
    runIt();
  };

  var runIt = function runIt() {
    if (onImageResizeFinished && width && finalWidth) {
      onImageResizeFinished(width);
      setFinalWidth(0);
    }

    setInitWidth(0);
    setStartResize(false);
    setInitClientX(0);
    setPercentPX(0);
    setDirection(undefined);
  };

  React.useEffect(function () {
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
  return /*#__PURE__*/React__default["default"].createElement("div", {
    draggable: startResize ? false : !disableChange,
    onDragStart: onDragStart,
    className: classnames('rlb-draggable-container flex-grow', !disableChange ? 'draggable' : '', startResize ? 'resize-img' : ''),
    "data-draggable": dndTargetKey,
    "target-dnd-droppable": "".concat(dndTargetKey),
    ref: containerRef,
    onMouseMove: onMouseMouve,
    onMouseUp: onMouseLeaveOrUp,
    onMouseLeave: onMouseLeaveOrUp
  }, isImage ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "image_rlb",
    style: {
      width: "".concat(width || 100, "%"),
      margin: oneCol ? 'auto' : undefined
    }
  }, oneCol ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "image-resize imr-left",
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    style: {
      zIndex: startResize ? 999 : undefined
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "hand-image",
    onMouseDown: function onMouseDown(e) {
      setDirection('left');

      _onMouseDown(e);
    }
  })) : null, children, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "image-resize imr-right",
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    style: {
      zIndex: startResize ? 999 : undefined
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "hand-image",
    onMouseDown: function onMouseDown(e) {
      setDirection('right');

      _onMouseDown(e);
    }
  }))) : children);
};

exports.TargetPlaceEnum = void 0;

(function (TargetPlaceEnum) {
  TargetPlaceEnum["LEFT"] = "LEFT";
  TargetPlaceEnum["RIGHT"] = "RIGHT";
  TargetPlaceEnum["TOP"] = "TOP";
  TargetPlaceEnum["BOTTOM"] = "BOTTOM";
  TargetPlaceEnum["ROW_TOP"] = "ROW_TOP";
  TargetPlaceEnum["ROW_BOTTOM"] = "ROW_BOTTOM";
})(exports.TargetPlaceEnum || (exports.TargetPlaceEnum = {}));

exports.ILayoutTargetEnum = void 0;

(function (ILayoutTargetEnum) {
  ILayoutTargetEnum["ROW"] = "ROW";
  ILayoutTargetEnum["COL"] = "COL";
  ILayoutTargetEnum["ITEM"] = "ITEM";
})(exports.ILayoutTargetEnum || (exports.ILayoutTargetEnum = {}));

var DroppableSection = function DroppableSection(_a) {
  var children = _a.children,
      section = _a.section;
      _a.width;
      _a.resizable;
      _a.onDragStart;
      _a.onClickSection;
      _a.onResize;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: classnames('rlb-section rlb-section-container '),
    // draggable={false}
    // onDragStart={onDragStart}
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
  }, children));
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
      dndTargetKey = _a.dndTargetKey,
      disableChange = _a.disableChange,
      onDropItem = _a.onDropItem;

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
      onDropItem(e, exports.TargetPlaceEnum.ROW_TOP);
      setDroppableTarget('');
    },
    onDragLeave: handleDragOverLeave
  }) : null, /*#__PURE__*/React__default["default"].createElement("div", {
    className: classnames('rlb-section')
  }, children), !disableChange ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "".concat(isHoveredTargetClassName(droppableTarget === "".concat(dndTargetKey, "-bottom")), " bottom"),
    "target-droppable-row": "".concat(dndTargetKey, "-bottom"),
    onDragOver: handleDragOver,
    onDragLeave: handleDragOverLeave,
    onDrop: function onDrop(e) {
      onDropItem(e, exports.TargetPlaceEnum.ROW_BOTTOM);
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

    var reorder = place === exports.TargetPlaceEnum.LEFT ? [newColAdjustWidth, current] : [current, newColAdjustWidth];
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
          case exports.TargetPlaceEnum.TOP:
            return acc.concat([sourceItemKey, next]);

          case exports.TargetPlaceEnum.BOTTOM:
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
    case exports.TargetPlaceEnum.LEFT:
      return addToNewColumn(column, dest.columnId, source.itemKey, exports.TargetPlaceEnum.LEFT);

    case exports.TargetPlaceEnum.RIGHT:
      return addToNewColumn(column, dest.columnId, source.itemKey, exports.TargetPlaceEnum.RIGHT);

    case exports.TargetPlaceEnum.TOP:
      return addToColmunElement(column, dest.columnId, source.columnId, source.itemKey, dest.itemKey, place);

    case exports.TargetPlaceEnum.BOTTOM:
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
  var clean = removeItemFromSource(add, source, source.columnId === dest.columnId && (place === exports.TargetPlaceEnum.BOTTOM || place === exports.TargetPlaceEnum.TOP));
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

        if (place === exports.TargetPlaceEnum.ROW_BOTTOM) {
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

var ResizableContainer = function ResizableContainer(_a) {
  var type = _a.type,
      resizable = _a.resizable,
      children = _a.children,
      resizing = _a.resizing,
      _onMouseDown = _a.onMouseDown,
      width = _a.width,
      isLast = _a.isLast,
      isNextTo = _a.isNextTo;
  var columnRef = React.useRef(null);
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "rlb-content-container",
    ref: columnRef,
    style: {
      width: width,
      flexGrow: isNextTo ? 1 : undefined
    },
    "data-resizable-type": type
  }, children), resizable && !isLast ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "rlb-resize-handler",
    style: {
      opacity: resizing ? 1 : undefined
    },
    "data-resizable-type": type
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: 'resize-hand',
    onMouseDown: function onMouseDown(e) {
      var _a;

      e.preventDefault();
      e.stopPropagation();
      _onMouseDown && _onMouseDown(e.clientX, ((_a = columnRef.current) === null || _a === void 0 ? void 0 : _a.clientWidth) || 0);
    }
  })) : null);
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

var changeColumnWidth = function changeColumnWidth(layouts, container, cols) {
  return layouts.map(function (section) {
    if (section.id !== container.sectionId) return section;
    return __assign(__assign({}, section), {
      rows: section.rows.map(function (row) {
        if (row.id !== container.rowId) return row;
        var newCols = row.columns.map(function (col, index) {
          var findIndex = row.columns.findIndex(function (thicol) {
            return thicol.id === cols.colId;
          });
          var makeItGrid = row.columns.length % 2 === 0 ? gridValue(5, cols.width) : cols.width;
          console.log("makeItGrid", makeItGrid);
          if (!makeItGrid) return col;

          if (col.id === cols.colId) {
            return __assign(__assign({}, col), {
              width: Math.round(makeItGrid)
            });
          }

          if (index === findIndex + 1) {
            return __assign(__assign({}, col), {
              width: Math.round(cols.next)
            });
          }

          return col;
        });
        var full = row.columns.length > 1 ? keepRowFullWidth(newCols) : newCols;
        return __assign(__assign({}, row), {
          columns: full
        });
      })
    });
  });
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

var LayoutDropContainer = function LayoutDropContainer(_a) {
  var children = _a.children,
      disableChange = _a.disableChange,
      targetDROP = _a.targetDROP,
      setTargetDROP = _a.setTargetDROP,
      onDragOver = _a.onDragOver,
      onDragLeave = _a.onDragLeave,
      onDrop = _a.onDrop;
  var containerRef = React.useRef(null);

  var _b = React.useState(500),
      checkAnomalie = _b[0],
      setCheckAnomalie = _b[1];

  React.useEffect(function () {
    if (checkAnomalie > 10) {
      var timer = setTimeout(function () {
        setCheckAnomalie(function (prev) {
          return prev - 10;
        });
      }, 250);
      clearTimeout(timer);
    }

    if (checkAnomalie < 10) {
      setTargetDROP(undefined);
    }
  }, [checkAnomalie]);

  var handleDragOver = function handleDragOver(e) {
    e.preventDefault();
    setCheckAnomalie(500);
    var nearest = findNearestTarget(e.clientX, e.clientY);

    if (nearest) {
      setTargetDROP(nearest);
      onDragOver(nearest);
    } else {
      onDragOver(nearest);
      setTargetDROP(undefined);
    }
  };

  var findNearestTarget = function findNearestTarget(clientX, clientY) {
    //   console.log(clientY);
    var _a, _b, _c, _d;

    (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
    var height = (_b = containerRef.current) === null || _b === void 0 ? void 0 : _b.offsetHeight;
    var width = (_c = containerRef.current) === null || _c === void 0 ? void 0 : _c.offsetWidth;
    var boundingClient = (_d = containerRef.current) === null || _d === void 0 ? void 0 : _d.getBoundingClientRect();

    if (!height || !width || !(boundingClient === null || boundingClient === void 0 ? void 0 : boundingClient.left)) {
      return;
    }

    var demi = height / 2;
    var reference = clientY - boundingClient.top;
    var left = clientX - boundingClient.left;
    var shouldRight = width - left < 50 && width - left > 0;

    if (shouldRight) {
      return exports.TargetPlaceEnum.RIGHT;
    }

    if (left < 50 && left > 0) {
      return exports.TargetPlaceEnum.LEFT;
    }

    if (reference > demi) return exports.TargetPlaceEnum.BOTTOM;
    if (reference < demi) return exports.TargetPlaceEnum.TOP;
  };

  var onExit = function onExit(e) {
    onDragLeave();
    setTargetDROP(undefined);
  };

  var handleDrop = function handleDrop(e) {
    e.preventDefault();
    onDrop(e);
    setTargetDROP(undefined);
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    ref: containerRef,
    onDragOver: handleDragOver,
    onDragLeave: onExit,
    onDrop: handleDrop
  }, !disableChange ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "rbl-drop-item-indicator",
    style: {
      visibility: targetDROP === exports.TargetPlaceEnum.TOP ? 'visible' : 'hidden'
    }
  }) : null, children, !disableChange ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "rbl-drop-item-indicator",
    style: {
      visibility: targetDROP === exports.TargetPlaceEnum.BOTTOM ? 'visible' : 'hidden'
    }
  }) : null);
};

var LayoutRowContainer = function LayoutRowContainer(_a) {
  var disabled = _a.disabled,
      stableKey = _a.stableKey,
      columns = _a.columns,
      layouts = _a.layouts,
      sectionId = _a.sectionId,
      rowId = _a.rowId,
      imageSizeFnLoader = _a.imageSizeFnLoader,
      setActualLayout = _a.setActualLayout,
      renderComponent = _a.renderComponent,
      imageCheckerFn = _a.imageCheckerFn,
      onLayoutChange = _a.onLayoutChange,
      _onImageResizeFinished = _a.onImageResizeFinished;
  var containerRef = React.useRef(null);

  var _b = React.useState(false);
      _b[0];
      var setDragStart = _b[1];

  var _c = React.useState(),
      currentColumn = _c[0],
      setCurrentColumn = _c[1];

  var _d = React.useState(0);
      _d[0];
      _d[1];

  var _e = React.useState(false),
      resizeBegin = _e[0],
      setResizeBegin = _e[1];

  var _f = React.useState([]),
      widths = _f[0],
      setWidths = _f[1];

  var _g = React.useState(0),
      indexCol = _g[0],
      setIndexCol = _g[1];

  var _h = React.useState(),
      initClientX = _h[0],
      setInitClientX = _h[1];

  var _j = React.useState(),
      initWidth = _j[0],
      setInitWidth = _j[1];

  var _k = React.useState(),
      newWidth = _k[0],
      setNewWidth = _k[1];

  var _l = React.useState(),
      nextWidth = _l[0],
      setNextWidth = _l[1];

  var _m = React.useState(500),
      waitBeforeUpdate = _m[0],
      setWaitBeforeUpdate = _m[1]; // TARGET DROP STATE


  var _o = React.useState(),
      targetDROP = _o[0],
      setTargetDROP = _o[1]; // TARGET DESTINATION STATE


  var _p = React.useState({
    columnId: '',
    itemKey: '',
    sectionId: '',
    targetPlace: '',
    rowId: ''
  }),
      destination = _p[0],
      setDestination = _p[1];

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

  var _q = React.useState(false);
      _q[0];
      var setIsSectionDragged = _q[1];

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

    setDragStart(false);
    var newLayout = reorderLayout(layouts, source, destination, destination.targetPlace, layoutTarget);
    setIsSectionDragged(false);

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

  React.useEffect(function () {
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

  React.useEffect(function () {
    if (columns.length) {
      setWidths(columns.map(function (col) {
        return col.width;
      }));
    }
  }, [columns]); // DRAG EVENT

  var handleDragOverItem = function handleDragOverItem(destination) {
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

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: classnames('section-content flex', resizeBegin ? 'rbl-resizing' : ''),
    style: {
      width: '100%',
      margin: 'auto'
    },
    ref: containerRef,
    onMouseMove: onMouseMove,
    onMouseUp: onMouseUp,
    onMouseLeave: onMousLeave
  }, columns.map(function (column, index) {
    return /*#__PURE__*/React__default["default"].createElement(ResizableContainer, {
      width: "calc(".concat(widths[index], "% - ").concat(40 / columns.length, "px)"),
      key: column.id,
      isLast: columns.length === index + 1,
      isNextTo: index === indexCol + 1,
      resizable: true,
      colNumber: columns.length,
      onMouseDown: function onMouseDown(clientX, width) {
        setIndexCol(index);
        setCurrentColumn(column.id);

        _onMouseDown(clientX, width);
      },
      type: "column"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "rlb-flex"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "rbl-side-drop-indicator",
      style: styleSide(column.id, exports.TargetPlaceEnum.LEFT)
    }), /*#__PURE__*/React__default["default"].createElement("div", {
      key: column.id,
      className: "rlb-col-inner"
    }, column.items.map(function (items, index) {
      if (!items) return null;
      var isImage = imageCheckerFn ? imageCheckerFn(items) : false;
      return /*#__PURE__*/React__default["default"].createElement(LayoutDropContainer, {
        targetDROP: destination.itemKey === items[stableKey] ? targetDROP : undefined,
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
          handleDropItem(e, exports.ILayoutTargetEnum.ITEM);
        },
        onDragLeave: resetDrag,
        disableChange: disabled,
        key: index
      }, /*#__PURE__*/React__default["default"].createElement(DraggableItem, {
        isImage: isImage,
        disableChange: disabled || items['id'] === 'EMPTY_SECTION',
        imageWidth: imageSizeFnLoader ? imageSizeFnLoader(items) : undefined,
        oneCol: columns.length === 1,
        dndTargetKey: items[stableKey],
        onImageResizeFinished: function onImageResizeFinished(w) {
          return _onImageResizeFinished ? _onImageResizeFinished(items, w) : undefined;
        },
        onDragStart: function onDragStart(e) {
          handleDragStart(e, sectionId, column.id, rowId, items[stableKey]);
        }
      }, items['id'] === 'EMPTY_SECTION' && !disabled ? /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("p", null, "Drop or add block here...")) : null, items['id'] !== 'EMPTY_SECTION' ? renderComponent(items, {
        columnId: column.id,
        itemKey: items[stableKey],
        rowId: rowId,
        sectionId: sectionId
      }) : null));
    })), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "rbl-side-drop-indicator",
      style: styleSide(column.id, exports.TargetPlaceEnum.RIGHT)
    })));
  }));
};

var LayoutContainer = function LayoutContainer(_a) {
  var data = _a.data,
      renderComponent = _a.renderComponent,
      onLayoutChange = _a.onLayoutChange,
      stableKey = _a.stableDataKey,
      layouts = _a.layouts,
      imageSizeFnLoader = _a.imageSizeFnLoader,
      disableChange = _a.disableChange,
      _onClickSection = _a.onClickSection,
      staticComponent = _a.staticComponent,
      imageCheckerFn = _a.imageCheckerFn,
      onImageResizeFinished = _a.onImageResizeFinished;
  var containeRef = React.useRef(null);

  var _b = React.useState(false),
      runChange = _b[0],
      setRunChange = _b[1];

  var _c = React.useState([]),
      actualLayout = _c[0],
      setActualLayout = _c[1];

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
  }, [actualLayout, data]); // run layout update

  React.useEffect(function () {
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
    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, data.map(function (item, index) {
      return renderComponent(item, {}, index);
    }));
  }

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "m-auto"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "min-h-[100px] ",
    ref: containeRef
  }, renderableLayout.map(function (section, index) {
    var isPublic = disableChange ? false : section.container;
    return /*#__PURE__*/React__default["default"].createElement(DroppableSection, {
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
        dndTargetKey: row.id,
        onDropItem: function onDropItem(e, target) {
          return handleDropItem(e, target, section.id, '', row.id, undefined, exports.ILayoutTargetEnum.ROW);
        }
      }, /*#__PURE__*/React__default["default"].createElement(LayoutRowContainer, {
        stableKey: stableKey,
        layouts: actualLayout,
        columns: row.columns,
        sectionId: section.id,
        rowId: row.id,
        disabled: disableChange,
        renderComponent: renderComponent,
        setActualLayout: setActualLayout,
        onLayoutChange: onLayoutChange,
        imageCheckerFn: imageCheckerFn,
        imageSizeFnLoader: imageSizeFnLoader,
        onImageResizeFinished: onImageResizeFinished
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
