import React, { useRef, useState, useEffect } from 'react';

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
      dndTargetKey = _a.dndTargetKey;
      _a.disableDrag;
      var onDragStart = _a.onDragStart;
  var element = useRef(null);
  return /*#__PURE__*/React.createElement("div", {
    draggable: true,
    onDragStart: onDragStart,
    className: "flex-grow",
    "target-dnd-droppable": "".concat(dndTargetKey),
    ref: element
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
      dndTargetKey = _a.dndTargetKey;
      _a.disableDrag;
      var isSection = _a.isSection,
      onDropItem = _a.onDropItem;

  var _b = useState(),
      droppableTarget = _b[0],
      setDroppableTarget = _b[1];

  var handleDragOver = function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    var targetEl = e.currentTarget;
    var targetDom = targetEl.getAttribute("target-droppable-item");

    if (targetDom && !isSection) {
      setDroppableTarget(targetDom);
    }
  };

  var isHoveredTargetClassName = function isHoveredTargetClassName(conditions) {
    return conditions ? "border-2 rounded-sm border-dashed bg-gray-200 border-gray-500 text-center p-2 my-1" : "h-2";
  };

  var handleDragOverLeave = function handleDragOverLeave(e) {
    setDroppableTarget("");
  };

  var handleDropToTop = function handleDropToTop(e) {
    e.preventDefault();
    onDropItem(e, DropTargetPlaceEnum.TOP);
    setDroppableTarget("");
  };

  var handleDropToBottom = function handleDropToBottom(e) {
    e.preventDefault();
    onDropItem(e, DropTargetPlaceEnum.BOTTOM);
    setDroppableTarget("");
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "".concat(isHoveredTargetClassName(droppableTarget === "item-".concat(dndTargetKey, "-top"))),
    "target-droppable-item": "item-".concat(dndTargetKey, "-top"),
    onDragOver: handleDragOver,
    onDragLeave: handleDragOverLeave,
    onDrop: handleDropToTop
  }, droppableTarget === "item-".concat(dndTargetKey, "-top") ? "Add item to column..." : null), children, /*#__PURE__*/React.createElement("div", {
    className: "".concat(isHoveredTargetClassName(droppableTarget === "item-".concat(dndTargetKey, "-bottom"))),
    "target-droppable-item": "item-".concat(dndTargetKey, "-bottom"),
    onDragOver: handleDragOver,
    onDragLeave: handleDragOverLeave,
    onDrop: handleDropToBottom
  }, droppableTarget === "item-".concat(dndTargetKey, "-bottom") ? "Add item to column..." : null));
};

var DroppableSection = function DroppableSection(_a) {
  var children = _a.children,
      index = _a.index,
      dndTargetKey = _a.dndTargetKey,
      disableDrag = _a.disableDrag,
      onDropItem = _a.onDropItem,
      onDragStart = _a.onDragStart;

  var _b = useState(),
      droppableTarget = _b[0],
      setDroppableTarget = _b[1];

  var handleDragOver = function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    var targetEl = e.currentTarget;
    var targetDom = targetEl.getAttribute("target-droppable-section");

    if (targetDom && !disableDrag) {
      setDroppableTarget(targetDom);
    }
  };

  var isHoveredTargetClassName = function isHoveredTargetClassName(conditions) {
    return conditions ? "border-2 rounded-sm border-dashed border-gray-300 text-center p-4 my-1" : "h-5";
  };

  var handleDragOverLeave = function handleDragOverLeave(e) {
    setDroppableTarget("");
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "section hover:bg-gray-200",
    draggable: true,
    onDragStart: onDragStart
  }, index === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "".concat(isHoveredTargetClassName(droppableTarget === "".concat(dndTargetKey, "-top"))),
    "target-droppable-section": "".concat(dndTargetKey, "-top"),
    onDragOver: handleDragOver,
    onDrop: function onDrop(e) {
      onDropItem(e, DropTargetPlaceEnum.SECTION_TOP);
      setDroppableTarget("");
    },
    onDragLeave: handleDragOverLeave
  }, droppableTarget === "".concat(dndTargetKey, "-top") ? "Drop here as a section..." : null) : null, /*#__PURE__*/React.createElement("div", {
    className: "section-content"
  }, children), /*#__PURE__*/React.createElement("div", {
    className: "".concat(isHoveredTargetClassName(droppableTarget === "".concat(dndTargetKey, "-bottom"))),
    "target-droppable-section": "".concat(dndTargetKey, "-bottom"),
    onDragOver: handleDragOver,
    onDragLeave: handleDragOverLeave,
    onDrop: function onDrop(e) {
      onDropItem(e, DropTargetPlaceEnum.SECTION_BOTTOM);
      setDroppableTarget("");
    }
  }, droppableTarget === "".concat(dndTargetKey, "-bottom") ? "Drop here as a section..." : null));
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

var DroppableColumnContainer = function DroppableColumnContainer(_a) {
  var children = _a.children,
      dndTargetKey = _a.dndTargetKey,
      width = _a.width,
      isSection = _a.isSection,
      currentColumLength = _a.currentColumLength,
      initialSize = _a.initialSize,
      resizingWidth = _a.resizingWidth,
      disableDrag = _a.disableDrag,
      className = _a.className,
      styles = _a.styles,
      onDropItem = _a.onDropItem,
      onResize = _a.onResize,
      onResizeStart = _a.onResizeStart,
      onResizeEnd = _a.onResizeEnd;

  var _b = useState(),
      droppableTarget = _b[0],
      setDroppableTarget = _b[1];

  var columnRef = useRef(null);

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
    return conditions ? 'border-2 rounded-sm border-dashed flex items-center justify-center border-gray-500 w-[50%] mx-2' : 'w-4';
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

  var onDragStart = function onDragStart(e) {
    var _a;

    e.preventDefault();
    e.stopPropagation();
    if (initialSize) return;
    var columnWidth = ((_a = columnRef.current) === null || _a === void 0 ? void 0 : _a.clientWidth) || 1;
    var containerWidth = columnWidth * currentColumLength;
    var onePercentInPx = containerWidth / 100;
    var onePixelInPercent = 1 / onePercentInPx;
    onResizeStart(dndTargetKey, columnWidth, width, Math.round(onePixelInPercent * 100) / 100, e.clientX);
  };

  var handleResize = function handleResize(e) {
    e.preventDefault();
    e.stopPropagation();
    onDragStart(e);
    onResize(e);
  };

  var handleResizeLeft = function handleResizeLeft(e) {
    e.preventDefault();
    e.stopPropagation();
    onDragStart(e);
    onResize(e, true);
  };

  var handleDragEnd = function handleDragEnd() {
    onResizeEnd();
  };

  return /*#__PURE__*/React.createElement("div", {
    className: classnames('column flex relative', // `w-[${widthNumber}%]`,
    className),
    ref: columnRef,
    style: __assign(__assign({}, styles), {
      width: resizingWidth ? "".concat(resizingWidth, "%") : "".concat(width, "%")
    })
  }, !droppableTarget ? /*#__PURE__*/React.createElement("div", {
    className: "w-2 relative left-4 bottom-0 cursor-col-resize\topacity-0 hover:opacity-1 focus:bg-gray-800",
    draggable: true,
    onDrag: handleResizeLeft,
    onDragEnd: function onDragEnd() {
      handleDragEnd();
    }
  }) : null, /*#__PURE__*/React.createElement("div", {
    className: "".concat(isHoveredTargetClassNameSide(droppableTarget === "item-".concat(dndTargetKey, "-left"))),
    "target-droppable-item": "item-".concat(dndTargetKey, "-left"),
    onDragOver: disableDrag ? undefined : handleDragOver,
    onDragLeave: handleDragOverLeave,
    onDrop: handleDropToLeft
  }, droppableTarget === "item-".concat(dndTargetKey, "-left") ? 'Drop new column...' : null), children, /*#__PURE__*/React.createElement("div", {
    className: "".concat(isHoveredTargetClassNameSide(droppableTarget === "item-".concat(dndTargetKey, "-right"))),
    "target-droppable-item": "item-".concat(dndTargetKey, "-right"),
    onDragOver: handleDragOver,
    onDragLeave: handleDragOverLeave,
    onDrop: handleDropToRigth
  }, droppableTarget === "item-".concat(dndTargetKey, "-right") ? 'Drop new column...' : null), !droppableTarget ? /*#__PURE__*/React.createElement("div", {
    className: "w-2 relative right-4 bottom-0 cursor-col-resize\topacity-0 hover:opacity-1 focus:bg-gray-800",
    draggable: true,
    onDrag: handleResize,
    onDragEnd: function onDragEnd() {
      handleDragEnd();
    }
  }) : null);
};

var keepRowFullWidth = function keepRowFullWidth(columns) {
  var diffWidth = columns.reduce(function (acc, next) {
    return acc + next.width;
  }, 0);

  if (diffWidth !== 100) {
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

var removeEmptyColumn = function removeEmptyColumn(layouts) {
  return layouts.map(function (section) {
    var newColumns = section.columns.filter(function (col) {
      return (col.childIds.length || 0) > 0;
    });
    return __assign(__assign({}, section), {
      columns: newColumns
    });
  });
};

var removeEmptyLayout = function removeEmptyLayout(layouts) {
  var notEmptyCol = removeEmptyColumn(layouts);
  return notEmptyCol.filter(function (section) {
    return section.columns.length > 0;
  });
};

var addClassColmun = function addClassColmun(column, columnId, width, sibling) {
  var newColumns = column.map(function (col) {
    var _a;

    if (col.id === columnId) {
      return __assign(__assign({}, col), {
        width: width
      });
    }

    return __assign(__assign({}, col), {
      width: ((_a = sibling.find(function (sib) {
        return sib.colId === col.id;
      })) === null || _a === void 0 ? void 0 : _a.width) || col.width
    });
  });
  var checkedWidth = keepRowFullWidth(newColumns);
  return checkedWidth;
};

var changeColumnWidth = function changeColumnWidth(layouts, columnId, width, sibling) {
  var finalLayouts = layouts.map(function (section) {
    if (!section.columns.find(function (cl) {
      return cl.id === columnId;
    })) return section;

    var sectionModified = __assign(__assign({}, section), {
      columns: addClassColmun(section.columns, columnId, width, sibling)
    });

    return sectionModified;
  });
  return removeEmptyLayout(finalLayouts);
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
  return data.map(function (item, index) {
    var columns = [{
      childIds: [item[stableDataKey]],
      id: "column-".concat(v4()),
      order: 0,
      className: 'w-full',
      styles: {},
      width: 100
    }];
    var section = {
      className: '',
      id: "section-".concat(v4()),
      order: 0,
      columns: columns
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
  }

  var getNewData = data.filter(function (dt) {
    var isExist = currentLayouts.find(function (section) {
      var sectionExist = section.columns.find(function (col) {
        return col.childIds.includes(dt[stableDataKey]);
      });
      return sectionExist;
    });
    return !isExist;
  });
  var newLayouts = createNewLayout(getNewData, stableDataKey);
  return currentLayouts.concat(newLayouts);
};

var createRenderableLayout = function createRenderableLayout(data, layouts, key) {
  var dataLayout = layouts.map(function (layout) {
    var renderedLayout = {
      id: layout.id,
      order: layout.order,
      className: layout.className,
      columns: layout.columns.map(function (cols) {
        var renderedCol = {
          id: cols.id,
          order: cols.order,
          className: cols.className,
          items: data.filter(function (item) {
            return cols.childIds.includes(item[key]);
          }) || [],
          styles: cols.styles,
          width: cols.width
        };
        return renderedCol;
      }).filter(function (col) {
        return col.items.length > 0;
      })
    };
    return renderedLayout;
  }).filter(function (section) {
    return section.columns.length > 0;
  });
  return dataLayout;
};

var removeItemFromLayout = function removeItemFromLayout(layouts, source) {
  var layoutWithoutDraggedItem = layouts.map(function (section) {
    if (section.id !== source.sectionId) return section;

    var sectionModified = __assign(__assign({}, section), {
      columns: section.columns.map(function (col, index, columns) {
        var itemColumn = columns.find(function (column) {
          return column.childIds.find(function (child) {
            return child === source.itemKey;
          });
        });
        var hasChildren = (itemColumn === null || itemColumn === void 0 ? void 0 : itemColumn.childIds.length) === 0;
        var width = itemColumn === null || itemColumn === void 0 ? void 0 : itemColumn.width;
        var addWidth = !hasChildren && width ? Math.round(width / (columns.length - 1)) : 0;
        if (col.id !== source.columnId) return __assign(__assign({}, col), {
          width: col.width + addWidth
        });
        return __assign(__assign({}, col), {
          childIds: col.childIds.filter(function (child) {
            return child !== source.itemKey;
          }),
          width: col.width + addWidth
        });
      })
    });

    return sectionModified;
  });
  var removedEmpty = removeEmptyLayout(layoutWithoutDraggedItem);
  return removedEmpty;
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
      className: "w-full",
      width: newWidth - shouldRemoveFromRestWidth
    };

    var current = __assign(__assign({}, next), {
      width: next.width - shouldRemoveFromRestWidth
    });

    var reorder = place === DropTargetPlaceEnum.LEFT ? [newCol, current] : [current, newCol];
    return acc.concat(reorder);
  }, []);
  var checkedWidth = keepRowFullWidth(newCols);
  return checkedWidth;
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

var addNewSectionFromDrag = function addNewSectionFromDrag(layouts, source, dest, place) {
  var newLayouts = removeItemFromLayout(layouts, source);
  var finalLayouts = newLayouts.reduce(function (acc, section) {
    if (section.id !== dest.sectionId) {
      return acc.concat(section);
    }

    var id = new Date().getTime();
    var newSection = {
      className: "",
      id: id.toString(),
      order: 0,
      columns: [{
        childIds: [source.itemKey],
        id: id.toString(),
        order: 0,
        width: 100,
        className: "",
        styles: {}
      }]
    };
    return acc.concat(place === DropTargetPlaceEnum.SECTION_TOP ? [newSection, section] : [section, newSection]);
  }, []);
  return finalLayouts;
};
var reorderSection = function reorderSection(layouts, source, dest, place) {
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
    var finalLayouts_1 = reorderSection(layouts, source, dest, place);
    return removeEmptyLayout(finalLayouts_1);
  }

  if (place === DropTargetPlaceEnum.SECTION_BOTTOM || place === DropTargetPlaceEnum.SECTION_TOP) {
    var finalLayouts_2 = addNewSectionFromDrag(layouts, source, dest, place);
    return removeEmptyLayout(finalLayouts_2);
  }

  if (source.isSection) {
    return layouts;
  }

  var newLayouts = removeItemFromLayout(layouts, source);
  var finalLayouts = newLayouts.map(function (section) {
    if (section.id !== dest.sectionId) return section;

    var sectionModified = __assign(__assign({}, section), {
      columns: addItemToColumn(section.columns, source, dest, place)
    });

    return sectionModified;
  });
  return removeEmptyLayout(finalLayouts);
};

var LayoutContainer = function LayoutContainer(_a) {
  var data = _a.data,
      renderComponent = _a.renderComponent,
      onLayoutChange = _a.onLayoutChange,
      stableKey = _a.stableDataKey,
      layouts = _a.layouts,
      loading = _a.loading;
  var containeRef = useRef(null);

  var _b = useState(false),
      isDragging = _b[0],
      setIsDragging = _b[1];

  var _c = useState(false),
      disableDrag = _c[0],
      setDisableDrag = _c[1];

  var _d = useState([]),
      actualLayout = _d[0],
      setActualLayout = _d[1];

  var _e = useState(false),
      isSectionDragged = _e[0],
      setIsSectionDragged = _e[1];

  var _f = useState([]),
      renderableLayout = _f[0],
      setRenderableLayout = _f[1];

  var _g = useState(),
      initialSize = _g[0],
      setInitialSize = _g[1];

  var _h = useState(),
      currentColWidth = _h[0],
      setCurentColWidth = _h[1];

  var _j = useState(),
      resizedSectionId = _j[0],
      setResizedSectionId = _j[1];

  useEffect(function () {
    if (layouts) {
      setActualLayout(layouts);
    }
  }, [layouts]);
  useEffect(function () {
    if (layouts) {
      setActualLayout(layouts);
    }
  }, [layouts, loading]);
  useEffect(function () {
    var renderable = createRenderableLayout(data, actualLayout, stableKey);
    setRenderableLayout(renderable);
  }, [actualLayout, data, stableKey]); // create new layout if new data is added
  // Do not incldes 'stableKey and layouts and hooks-deps'

  useEffect(function () {
    var newLayouts = createLayout(data, stableKey, layouts);
    setActualLayout(newLayouts); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  useEffect(function () {
    if (actualLayout.length > 0) {
      onLayoutChange(actualLayout);
    }
  }, [actualLayout, onLayoutChange]);

  var handleDragStart = function handleDragStart(e, sectionId, columnId, itemkey) {
    e.stopPropagation();

    var itemKeyType = _typeof(itemkey);

    e.dataTransfer.setData('itemKey', itemkey);
    e.dataTransfer.setData('itemKeyType', itemKeyType);
    e.dataTransfer.setData('sectionId', sectionId);
    e.dataTransfer.setData('colmunId', columnId);
    setIsSectionDragged(false);
  }; // Drop item to create new column or setion or add item to column


  var handleDropItem = function handleDropItem(e, target, sectionId, columnId, itemKey) {
    var sourceItemKey = e.dataTransfer.getData('itemKey');
    var isSection = e.dataTransfer.getData('isSection');
    var sourceSectionId = e.dataTransfer.getData('sectionId');
    var sourceColumnKey = e.dataTransfer.getData('colmunId');
    var itemKeyType = e.dataTransfer.getData('itemKeyType');
    var source = {
      columnId: sourceColumnKey,
      itemKey: itemKeyType === 'number' ? parseFloat(sourceItemKey) : sourceItemKey,
      sectionId: sourceSectionId,
      isSection: !!isSection
    };
    var destination = {
      columnId: columnId,
      itemKey: itemKey,
      sectionId: sectionId,
      targetPlace: target
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

  var handleResizeEnd = function handleResizeEnd(cols, colId, initialWidth, colCount) {
    setIsDragging(false);
    var restWidth = cols.reduce(function (acc, next) {
      if (next.id === colId) return acc;
      return acc + next.width;
    }, 0);
    var diff = 100 - ((currentColWidth || 0) + restWidth);
    var shouldAdd = diff / (colCount - 1);
    var siblingsCols = cols.map(function (colm) {
      return {
        colId: colm.id,
        width: colm.width + shouldAdd
      };
    }).filter(function (col) {
      return col.colId !== colId;
    });
    var newsLayoutModified = changeColumnWidth(actualLayout, colId, currentColWidth || initialWidth, siblingsCols);
    setActualLayout(newsLayoutModified); // const layouts = addClassnameToColumn(
    //   actualLayout,
    //   colId,
    //   {
    //     className: `w-[${currentColWidth}%]`,
    //     styles: { width: `${currentColWidth}%` }
    //   },
    //   {
    //     className: `w-[${Math.round(restCol)}%]`,
    //     styles: { width: `${Math.round(restCol)}%` }
    //   }
    // )

    setInitialSize(undefined); // setActualLayout(layouts)

    setCurentColWidth(undefined);
    setResizedSectionId('');
  };

  var generateNewColumnWidth = function generateNewColumnWidth(cols, colId, currentWidth, colCount) {
    var restWidth = cols.reduce(function (acc, next) {
      if (next.id === colId) return acc;
      return acc + next.width;
    }, 0);
    var diff = 100 - (currentWidth + restWidth);
    var shouldAdd = diff / (colCount - 1);
    var colsWidth = cols.map(function (colm) {
      return {
        colId: colm.id,
        width: colm.id === colId ? currentWidth : colm.width + shouldAdd
      };
    });
    return colsWidth;
  };

  var handleDragSectionStart = function handleDragSectionStart(e, sectionId) {
    e.stopPropagation();
    e.dataTransfer.setData('sectionId', sectionId);
    e.dataTransfer.setData('isSection', 'section');
    setIsSectionDragged(true);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-[1080px] m-auto py-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "min-h-[100px] ",
    ref: containeRef
  }, renderableLayout.map(function (sectionData, index) {
    return /*#__PURE__*/React.createElement(DroppableSection, {
      index: index,
      key: sectionData.id,
      dndTargetKey: sectionData.id,
      disableDrag: isDragging,
      onDropItem: function onDropItem(e, target) {
        return handleDropItem(e, target, sectionData.id, '', undefined);
      },
      onDragStart: function onDragStart(e) {
        return handleDragSectionStart(e, sectionData.id);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "row flex w-full"
    }, sectionData.columns.map(function (columnData) {
      var _a;

      return /*#__PURE__*/React.createElement(DroppableColumnContainer, {
        initialSize: initialSize,
        disableDrag: isDragging,
        key: columnData.id,
        isSection: isSectionDragged,
        styles: columnData.styles,
        className: columnData.className,
        dndTargetKey: columnData.id,
        resizingWidth: resizedSectionId === sectionData.id ? (_a = generateNewColumnWidth(sectionData.columns, initialSize === null || initialSize === void 0 ? void 0 : initialSize.colId, currentColWidth || columnData.width, sectionData.columns.length).find(function (co) {
          return co.colId === columnData.id;
        })) === null || _a === void 0 ? void 0 : _a.width : undefined,
        width: columnData.width,
        currentColumLength: sectionData.columns.length || 1,
        onDropItem: function onDropItem(e, target) {
          return handleDropItem(e, target, sectionData.id, columnData.id, undefined);
        },
        onResizeStart: handleResizeStart,
        onResize: function onResize(e, isInvert) {
          setResizedSectionId(sectionData.id);
          handleResize(e, columnData.id, sectionData.id, isInvert);
        },
        onResizeEnd: function onResizeEnd() {
          return handleResizeEnd(sectionData.columns, columnData.id, columnData.width, sectionData.columns.length || 1);
        }
      }, /*#__PURE__*/React.createElement("div", {
        key: columnData.id,
        className: "column-container flex flex-col w-full  ".concat('')
      }, columnData.items.map(function (items) {
        return /*#__PURE__*/React.createElement(DroppableColumnItem, {
          disableDrag: disableDrag,
          isSection: isSectionDragged,
          key: items[stableKey],
          dndTargetKey: items[stableKey],
          currentColumLength: columnData.items.length || 1,
          onDropItem: function onDropItem(e, target) {
            return handleDropItem(e, target, sectionData.id, columnData.id, items[stableKey]);
          }
        }, /*#__PURE__*/React.createElement(DraggableItem, {
          disableDrag: disableDrag,
          dndTargetKey: items[stableKey],
          onDragStart: function onDragStart(e) {
            handleDragStart(e, sectionData.id, columnData.id, items[stableKey]);
          }
        }, renderComponent(items)));
      })));
    })));
  })));
};

export { LayoutContainer };
