'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

/******************************************************************************
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

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

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
      styles: layout.styles,
      rows: layout.rows.map(function (_a) {
        var columns = _a.columns,
            id = _a.id,
            order = _a.order,
            width = _a.width,
            className = _a.className,
            isContainer = _a.isContainer,
            styles = _a.styles;
        return {
          id: id,
          order: order,
          width: width,
          styles: styles,
          className: className,
          isContainer: !!isContainer,
          columns: columns.map(function (_a) {
            var childIds = _a.childIds,
                id = _a.id,
                order = _a.order,
                width = _a.width,
                className = _a.className,
                styles = _a.styles;
            return {
              id: id,
              className: className,
              width: width,
              styles: styles,
              order: order,
              items: childIds.map(function (itemKey) {
                if (itemKey === 'EMPTY_SECTION' && childIds.length <= 1) return {
                  id: 'EMPTY_SECTION'
                };
                return data.find(function (dt) {
                  var _a;

                  return itemKey !== null && (dt[key] === itemKey || ((_a = dt[key]) === null || _a === void 0 ? void 0 : _a.toString()) === itemKey.toString());
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

var DraggableItem$1 = function DraggableItem(_a) {
  var children = _a.children,
      dndTargetKey = _a.dndTargetKey,
      disableChange = _a.disableChange,
      sizes = _a.sizes,
      isImage = _a.isImage,
      oneCol = _a.oneCol,
      isMobile = _a.isMobile,
      isCenter = _a.isCenter,
      isButton = _a.isButton,
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

  var _g = React.useState(0),
      height = _g[0],
      setHeight = _g[1];

  var _h = React.useState(0),
      finalHeight = _h[0],
      setFinalHeight = _h[1];

  var _j = React.useState(),
      initHeight = _j[0],
      setInitHeight = _j[1];

  var _k = React.useState(0),
      initClientY = _k[0],
      setInitClientY = _k[1];

  var _l = React.useState(),
      percentPX = _l[0],
      setPercentPX = _l[1];

  var _m = React.useState(false),
      startResize = _m[0],
      setStartResize = _m[1];

  var _o = React.useState(500),
      waitBeforeUpdate = _o[0],
      setWaitBeforeUpdate = _o[1];

  React.useEffect(function () {
    if (sizes === null || sizes === void 0 ? void 0 : sizes.width) {
      setWidth(sizes.width);
    }
  }, [sizes === null || sizes === void 0 ? void 0 : sizes.width]);
  React.useEffect(function () {
    if (sizes === null || sizes === void 0 ? void 0 : sizes.height) {
      setHeight(sizes.height);
    }
  }, [sizes === null || sizes === void 0 ? void 0 : sizes.height]);

  var _onMouseDown = function onMouseDown(e, isBottom) {
    var _a, _b;

    if (!((_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.offsetWidth)) return;

    if (isBottom) {
      var h = containerRef.current.offsetHeight;
      setInitHeight((sizes === null || sizes === void 0 ? void 0 : sizes.height) || h);
      setInitClientY(e.clientY);
      return;
    }

    setInitWidth((sizes === null || sizes === void 0 ? void 0 : sizes.width) || 100);
    setStartResize(true);
    setInitClientX(e.clientX);
    var p1px = ((_b = containerRef.current) === null || _b === void 0 ? void 0 : _b.offsetWidth) / 100;
    setPercentPX(p1px);
  };

  var onMouseMouve = function onMouseMouve(e) {
    var newCX = e.clientX;
    var newCY = e.clientY;

    if (direction === 'vertical' && initHeight) {
      var diff = initClientY - newCY;

      var _final = initHeight - diff;

      if (_final < 100) {
        setHeight(100);
        setFinalHeight(100);
      } else {
        setHeight(_final);
        setFinalHeight(_final);
      }

      return;
    }

    if (initClientX && initWidth && startResize && percentPX && direction) {
      var diff = initClientX - newCX;
      var w = diff / percentPX;
      var dir = direction === 'left' ? w : -w;
      var isOneCol = oneCol || isCenter ? dir * 2 : dir;

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
      onImageResizeFinished({
        width: width
      });
      setFinalWidth(0);
    }

    if (onImageResizeFinished && height && finalHeight) {
      onImageResizeFinished({
        height: height
      });
      setFinalHeight(0);
    }

    setInitWidth(0);
    setStartResize(false);
    setInitClientX(0);
    setPercentPX(0);
    setDirection(undefined);
    setInitClientY(0);
    setInitHeight(0);
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
  var imageSize = React.useCallback(function () {
    var _a, _b;

    var img = document.querySelector("#rbl_image_".concat(dndTargetKey, " img"));

    if (img && height && !isMobile) {
      if (img) {
        (_a = img === null || img === void 0 ? void 0 : img.style) === null || _a === void 0 ? void 0 : _a.setProperty('max-height', "".concat(height, "px"));
        (_b = img === null || img === void 0 ? void 0 : img.style) === null || _b === void 0 ? void 0 : _b.setProperty('object-fit', "cover");
      }
    }
  }, [height, isMobile]);
  React.useEffect(function () {
    imageSize();
  }, [imageSize]);
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: classnames('rlb-draggable-container flex-grow', !disableChange ? 'draggable' : '', startResize ? 'resize-img' : '', isMobile ? 'image_no_max_h' : ''),
    "data-draggable": dndTargetKey,
    "data-draggable-id": dndTargetKey,
    "target-dnd-droppable": "".concat(dndTargetKey),
    ref: containerRef,
    onMouseMove: onMouseMouve,
    onMouseUp: onMouseLeaveOrUp,
    onMouseLeave: onMouseLeaveOrUp,
    id: "rbl_image_".concat(dndTargetKey)
  }, isImage || isButton ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "image_rlb",
    style: {
      width: isMobile ? '100%' : "".concat(width || 100, "%"),
      maxHeight: height && !isMobile ? (height || (sizes === null || sizes === void 0 ? void 0 : sizes.height) || 0) + 30 : undefined,
      margin: oneCol || isCenter ? 'auto' : undefined
    }
  }, !disableChange && oneCol && !isMobile ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "image-resize imr-left",
    onClick: function onClick(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    style: {
      zIndex: startResize ? 999 : undefined
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "hand-image",
    onMouseDown: function onMouseDown(e) {
      e.preventDefault();
      setDirection('left');

      _onMouseDown(e);
    }
  })) : null, !disableChange && !isButton && !isMobile ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "image-resize-bottom",
    onClick: function onClick(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    style: {
      zIndex: startResize ? 999 : undefined
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "hand-image",
    onMouseDown: function onMouseDown(e) {
      e.preventDefault();
      setDirection('vertical');

      _onMouseDown(e, true);
    }
  })) : null, children, !disableChange && !isMobile ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "image-resize imr-right",
    onClick: function onClick(e) {
      e.preventDefault();
      e.stopPropagation();
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
  })) : null) : children);
};

exports.TargetPlaceEnum = void 0;

(function (TargetPlaceEnum) {
  TargetPlaceEnum["LEFT"] = "LEFT";
  TargetPlaceEnum["RIGHT"] = "RIGHT";
  TargetPlaceEnum["TOP"] = "TOP";
  TargetPlaceEnum["BOTTOM"] = "BOTTOM";
  TargetPlaceEnum["ROW_TOP"] = "ROW_TOP";
  TargetPlaceEnum["ROW_BOTTOM"] = "ROW_BOTTOM";
  TargetPlaceEnum["SECTION_TOP"] = "SECTION_TOP";
  TargetPlaceEnum["SECTION_BOTTOM"] = "SECTION_BOTTOM";
})(exports.TargetPlaceEnum || (exports.TargetPlaceEnum = {}));

exports.ILayoutTargetEnum = void 0;

(function (ILayoutTargetEnum) {
  ILayoutTargetEnum["SECTION"] = "SECTION";
  ILayoutTargetEnum["ROW"] = "ROW";
  ILayoutTargetEnum["COL"] = "COL";
  ILayoutTargetEnum["ITEM"] = "ITEM";
})(exports.ILayoutTargetEnum || (exports.ILayoutTargetEnum = {}));

var ResizableContainerComponent = function ResizableContainerComponent(_a) {
  var type = _a.type,
      resizable = _a.resizable,
      children = _a.children,
      resizing = _a.resizing,
      width = _a.width,
      isLast = _a.isLast,
      isNextTo = _a.isNextTo,
      colNumber = _a.colNumber,
      _onMouseDown = _a.onMouseDown;
  var columnRef = React.useRef(null);
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "rlb-content-container",
    ref: columnRef,
    style: {
      width: colNumber > 1 ? width : '100%',
      flexGrow: isNextTo ? 1 : undefined
    },
    "data-resizable-type": type
  }, children), !isLast ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "rlb-resize-handler",
    style: {
      opacity: resizing ? 1 : undefined
    },
    "data-resizable-type": type,
    onClick: function onClick(e) {
      e.stopPropagation();
      e.preventDefault();
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: resizable ? 'resize-hand' : 'rbl-no-action',
    onMouseDown: function onMouseDown(e) {
      var _a;

      e.preventDefault();
      e.stopPropagation();
      _onMouseDown && _onMouseDown(e.clientX, ((_a = columnRef.current) === null || _a === void 0 ? void 0 : _a.clientWidth) || 0);
    }
  })) : null);
};

var ResizableContainer = /*#__PURE__*/React__default["default"].memo(ResizableContainerComponent);

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

  var keepKolClean = function keepKolClean(columns) {
    var cols = columns.filter(function (col) {
      return col.childIds.length > 0;
    });
    var keepWidth = keepRowFullWidth(cols);
    return keepWidth;
  };

  var noEmptyColumn = noEmptyChild.map(function (section) {
    return __assign(__assign({}, section), {
      rows: section.rows.map(function (row) {
        return __assign(__assign({}, row), {
          columns: keepKolClean(row.columns)
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
              var _a;

              if (!id) return true;
              if (duplicate) return id !== 'DUPLICATE';
              return source.itemKey !== null && id.toString() !== ((_a = source.itemKey) === null || _a === void 0 ? void 0 : _a.toString());
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
      return sourceColumnId === targetColumnId && k.toString() === sourceItemKey.toString() ? 'DUPLICATE' : k;
    }).reduce(function (acc, next) {
      if (next.toString() === targetItemKey.toString()) {
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

var createNewSection = function createNewSection(itemKey, isContainer, defaultWidth) {
  var row = createNewRow(itemKey);
  return {
    id: v4(),
    className: '',
    order: 0,
    backgroundColor: '',
    backgroundImage: '',
    width: defaultWidth || '100%',
    defaultWidth: defaultWidth,
    rows: [row],
    container: isContainer
  };
};

var addToNewSection = function addToNewSection(layouts, source, dest, place) {
  var newLayouts = layouts.reduce(function (section, next) {
    var _a;

    if (next.id === dest.sectionId) {
      var newSection = createNewSection([source.itemKey], false, (_a = layouts[0]) === null || _a === void 0 ? void 0 : _a.defaultWidth);

      if (place === exports.TargetPlaceEnum.ROW_TOP) {
        return __spreadArray(__spreadArray([], section, true), [newSection, next], false);
      }

      return __spreadArray(__spreadArray([], section, true), [next, newSection], false);
    }

    return __spreadArray(__spreadArray([], section, true), [next], false);
  }, []);
  var clean = removeItemFromSource(newLayouts, source);
  return clean;
};

var reorderLayoutItem = function reorderLayoutItem(layouts, source, dest, place, target) {
  switch (target) {
    case exports.ILayoutTargetEnum.ROW:
      return addToNewSection(layouts, source, dest, place);

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
          var makeItGrid = row.columns.length % 2 === 0 ? gridValue(2, cols.width) : cols.width;
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

  if (multi && w < 1) {
    return 1;
  }

  if (multi && w > 99) {
    return 99;
  }

  if (w > 100) return 100;
  if (w < 1) return 1;
  return w;
};

var AppContext = /*#__PURE__*/React.createContext({});
var LayoutProvider = function LayoutProvider(_a) {
  var children = _a.children;

  var _b = React.useState(),
      source = _b[0],
      setSource = _b[1];

  var _c = React.useState([]),
      currentLayouts = _c[0],
      setCurrentLayouts = _c[1];

  var _d = React.useState(),
      destination = _d[0],
      setDestination = _d[1];

  var _e = React.useState(false),
      isDragStart = _e[0],
      setIsDragStart = _e[1];

  var _f = React.useState({
    init: [],
    current: []
  }),
      point = _f[0],
      setPoint = _f[1];

  var onDragStart = function onDragStart(id) {// setSourceId(id);
  };

  var onDragEnd = function onDragEnd() {// setSourceId(undefined);
  };

  var context = React.useMemo(function () {
    return {
      source: source,
      destination: destination,
      point: point,
      isDragStart: isDragStart,
      currentLayouts: currentLayouts,
      setCurrentLayouts: setCurrentLayouts,
      setIsDragStart: setIsDragStart,
      setPoint: setPoint,
      setSource: setSource,
      setDestination: setDestination,
      onDragStart: onDragStart,
      onDragEnd: onDragEnd
    };
  }, [source, destination, point, isDragStart, currentLayouts]);
  return /*#__PURE__*/React__default["default"].createElement(AppContext.Provider, {
    value: context
  }, children);
};

var LayoutDropContainer = function LayoutDropContainer(_a) {
  var children = _a.children,
      disableChange = _a.disableChange,
      targetDROP = _a.targetDROP,
      disableSide = _a.disableSide,
      setTargetDROP = _a.setTargetDROP,
      onDragOver = _a.onDragOver,
      onDragLeave = _a.onDragLeave,
      onDrop = _a.onDrop;
  var containerRef = React.useRef(null);
  var activeDropRef = React.useRef(null);

  var _b = React.useState(0),
      initY = _b[0],
      setInitY = _b[1];

  var _c = React.useState(500),
      checkAnomalie = _c[0],
      setCheckAnomalie = _c[1];

  var setIsDragStart = React.useContext(AppContext).setIsDragStart;
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

    if (disableChange) {
      return;
    }

    if (!initY) {
      setInitY(e.clientY);
    }

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
    var _a, _b, _c;

    var height = (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.offsetHeight;
    var width = (_b = containerRef.current) === null || _b === void 0 ? void 0 : _b.offsetWidth;
    var boundingClient = (_c = containerRef.current) === null || _c === void 0 ? void 0 : _c.getBoundingClientRect();

    if (!height || !width || !(boundingClient === null || boundingClient === void 0 ? void 0 : boundingClient.left)) {
      return;
    }

    var demi = height / 2;
    var reference = clientY - boundingClient.top;
    var left = clientX - boundingClient.left;
    var shouldRight = width - left < 50 && width - left > 0;

    if (shouldRight && !disableSide) {
      return exports.TargetPlaceEnum.RIGHT;
    }

    if (left < 50 && left > 0 && !disableSide) {
      return exports.TargetPlaceEnum.LEFT;
    }

    if (reference > demi) return exports.TargetPlaceEnum.BOTTOM;
    if (reference < demi) return exports.TargetPlaceEnum.TOP;
  };

  var onExit = function onExit(e) {
    if (disableChange) {
      return;
    }

    onDragLeave();
    setTargetDROP(undefined);
  };

  var handleDrop = function handleDrop(e) {
    e.preventDefault();

    if (disableChange) {
      return;
    }

    onDrop(e);
    setIsDragStart(false);
    setTargetDROP(undefined);
    var el = document.getElementById('clonedElement');
    el === null || el === void 0 ? void 0 : el.remove();
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    ref: containerRef,
    onDragOver: handleDragOver,
    onDragLeave: onExit,
    onDrop: handleDrop,
    className: disableChange ? 'rbl-vert-spacing' : 'rbl-relative'
  }, !disableChange ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "rbl-drop-item-indicator top",
    style: {
      visibility: targetDROP === exports.TargetPlaceEnum.TOP ? 'visible' : 'hidden'
    },
    ref: targetDROP === exports.TargetPlaceEnum.TOP ? activeDropRef : null
  }) : null, children, !disableChange ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "rbl-drop-item-indicator bottom",
    style: {
      visibility: targetDROP === exports.TargetPlaceEnum.BOTTOM ? 'visible' : 'hidden'
    },
    ref: targetDROP === exports.TargetPlaceEnum.BOTTOM ? activeDropRef : null
  }) : null);
};

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
  var containerRef = React.useRef(null);

  var _b = React.useState(),
      currentColumn = _b[0],
      setCurrentColumn = _b[1];

  var _c = React.useState(false),
      resizeBegin = _c[0],
      setResizeBegin = _c[1];

  var _d = React.useState([]),
      widths = _d[0],
      setWidths = _d[1];

  var _e = React.useState(0),
      indexCol = _e[0],
      setIndexCol = _e[1];

  var _f = React.useState(),
      initClientX = _f[0],
      setInitClientX = _f[1];

  var _g = React.useState(),
      initWidth = _g[0],
      setInitWidth = _g[1];

  var _h = React.useState(),
      newWidth = _h[0],
      setNewWidth = _h[1];

  var _j = React.useState(),
      nextWidth = _j[0],
      setNextWidth = _j[1];

  var _k = React.useState(500),
      waitBeforeUpdate = _k[0],
      setWaitBeforeUpdate = _k[1];

  var _l = React.useContext(AppContext),
      source = _l.source,
      setSource = _l.setSource,
      setIsDragStart = _l.setIsDragStart; // TARGET DROP STATE


  var _m = React.useState(),
      targetDROP = _m[0],
      setTargetDROP = _m[1]; // TARGET DESTINATION STATE


  var _o = React.useState({
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

    if (layoutTarget !== exports.ILayoutTargetEnum.ROW && !destination.itemKey) {
      // this is used to prevent drag resize to create new item
      return;
    }

    setDragActive(false);

    var destinationPlace = function destinationPlace() {
      if (colNb === 'SINGLE' && destination.targetPlace !== exports.TargetPlaceEnum.LEFT && destination.targetPlace !== exports.TargetPlaceEnum.RIGHT) {
        if (destination.targetPlace === exports.TargetPlaceEnum.BOTTOM) {
          return exports.TargetPlaceEnum.ROW_BOTTOM;
        }

        return exports.TargetPlaceEnum.ROW_TOP;
      }

      return destination.targetPlace;
    };

    var targetedLayout = colNb === 'SINGLE' && destination.targetPlace !== exports.TargetPlaceEnum.LEFT && destination.targetPlace !== exports.TargetPlaceEnum.RIGHT ? exports.ILayoutTargetEnum.ROW : layoutTarget;
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

  var columnsComonent = React__default["default"].useMemo(function () {
    return columns.map(function (column, index) {
      return /*#__PURE__*/React__default["default"].createElement(ResizableContainer, {
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
      }, /*#__PURE__*/React__default["default"].createElement("div", {
        className: "rlb-flex rbl-relative rbl-col-container",
        style: column.styles,
        onClick: function onClick(e) {
          return handleclickCol(e, column.id);
        }
      }, !disabled && !isMobile ? /*#__PURE__*/React__default["default"].createElement("div", {
        className: "rbl-side-drop-indicator left",
        style: styleSide(column.id, exports.TargetPlaceEnum.LEFT)
      }) : null, /*#__PURE__*/React__default["default"].createElement("div", {
        key: column.id,
        className: "rlb-col-inner"
      }, column.items.map(function (items, index) {
        var _a;

        if (!items) return null;
        var isImage = imageCheckerFn ? imageCheckerFn(items) : false;
        return /*#__PURE__*/React__default["default"].createElement(LayoutDropContainer, {
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

            handleDropItem(e, exports.ILayoutTargetEnum.ITEM, columns.length === 1 && column.items.length === 1 ? 'SINGLE' : 'MULTI');
            (_a = document.getElementById('clonedGhost')) === null || _a === void 0 ? void 0 : _a.remove();
          },
          onDragLeave: resetDrag,
          disableChange: disabled,
          key: index
        }, /*#__PURE__*/React__default["default"].createElement(DraggableItem$1, {
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
      })), !disabled && !isMobile ? /*#__PURE__*/React__default["default"].createElement("div", {
        className: "rbl-side-drop-indicator right",
        style: styleSide(column.id, exports.TargetPlaceEnum.RIGHT)
      }) : null));
    });
  }, [columns, targetDROP, widths, renderComponent]);
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("div", null, needTop && dragActive ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "rbl-drop-row-container",
    onDragOver: function onDragOver(e) {
      e.preventDefault();
      setTargetDROP(exports.TargetPlaceEnum.ROW_TOP);
      handleDragOverItem({
        columnId: '',
        itemKey: undefined,
        sectionId: sectionId,
        targetPlace: exports.TargetPlaceEnum.ROW_TOP,
        rowId: rowId
      });
    },
    onDragLeave: function onDragLeave(e) {
      e.preventDefault();
      setTargetDROP(undefined);
    },
    onDrop: function onDrop(e) {
      handleDropItem(e, exports.ILayoutTargetEnum.ROW);
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "rbl-drop-row-indicator",
    style: {
      visibility: targetDROP === exports.TargetPlaceEnum.ROW_TOP ? 'visible' : 'hidden'
    }
  })) : null, /*#__PURE__*/React__default["default"].createElement("div", {
    className: classnames('section-content', resizeBegin ? 'rbl-resizing' : '', isMobile ? 'column-container-mobile' : 'column-container'),
    style: {
      width: '100%',
      margin: 'auto'
    },
    ref: containerRef,
    onMouseMove: onMouseMove,
    onMouseUp: onMouseUp,
    onMouseLeave: onMousLeave
  }, columnsComonent), isLastSection && (needRowTarget === null || needRowTarget === void 0 ? void 0 : needRowTarget.bottom) && dragActive ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "rbl-drop-row-container",
    onDragOver: function onDragOver(e) {
      e.preventDefault();
      setTargetDROP(exports.TargetPlaceEnum.ROW_BOTTOM);
      handleDragOverItem({
        columnId: '',
        itemKey: undefined,
        sectionId: sectionId,
        targetPlace: exports.TargetPlaceEnum.ROW_BOTTOM,
        rowId: rowId
      });
    },
    onDragLeave: function onDragLeave(e) {
      e.preventDefault();
      setTargetDROP(undefined);
    },
    onDrop: function onDrop(e) {
      handleDropItem(e, exports.ILayoutTargetEnum.ROW);
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "rbl-drop-row-indicator",
    style: {
      visibility: targetDROP === exports.TargetPlaceEnum.ROW_BOTTOM ? 'visible' : 'hidden'
    }
  })) : null));
}; // export const LayoutRowContainer = React.memo(
//   LayoutRowContainerComponent,
// );

var needRowTarget = function needRowTarget(layouts, currentRow, _a) {
  // check row length
  var _b, _c;

  var rows = _a.rows,
      rowIndex = _a.rowIndex,
      sectionIndex = _a.sectionIndex;
  var needIT = currentRow.columns.length > 1;
  var topSiblingRow = rows[rowIndex - 1];
  var bottomSiblingRow = rows[rowIndex + 1];
  var topSectionRows = ((_b = layouts[sectionIndex - 1]) === null || _b === void 0 ? void 0 : _b.rows) || [];
  var bottomSectionRows = ((_c = layouts[sectionIndex + 1]) === null || _c === void 0 ? void 0 : _c.rows) || [];
  var topRow = topSiblingRow || topSectionRows[topSectionRows.length - 1];
  var bottomRow = bottomSiblingRow || bottomSectionRows[0];
  var topOk = topRow ? topRow.columns.length > 1 : needIT;
  var bottomOk = bottomRow ? bottomRow.columns.length > 1 : needIT;
  return {
    top: topOk,
    bottom: bottomOk
  };
};

function useSimpleDebounce(value, delay) {
  var _a = React.useState(value),
      debouncedValue = _a[0],
      setDebouncedValue = _a[1];

  React.useEffect(function () {
    var timer = setTimeout(function () {
      setDebouncedValue(value);
    }, delay || 500);
    return function () {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debouncedValue;
}

var useContainerIdentifier = function useContainerIdentifier() {
  var isSectionContainer = function isSectionContainer(section) {
    if (section.container) {
      return true;
    }

    return section.rows.every(function (row) {
      return row.columns.length > 1;
    });
  };

  var isColumnContainer = function isColumnContainer(cols) {
    return cols.items.length > 1;
  };

  return {
    isSectionContainer: isSectionContainer,
    isColumnContainer: isColumnContainer
  };
};

var checkNotFoundData = function checkNotFoundData(layouts, data, key) {
  var hasNotFound = false;
  var noNotFoundChild = layouts.map(function (section) {
    return __assign(__assign({}, section), {
      rows: section.rows.map(function (row) {
        return __assign(__assign({}, row), {
          columns: row.columns.map(function (col) {
            return __assign(__assign({}, col), {
              childIds: col.childIds.map(function (id) {
                var isFound = data.find(function (dt) {
                  var _a;

                  return ((_a = dt[key]) === null || _a === void 0 ? void 0 : _a.toString()) === id.toString();
                });

                if (isFound) {
                  return id;
                }

                hasNotFound = true;
                return '';
              })
            });
          })
        });
      })
    });
  });
  var cleanLayouts = removeEmptyLayout(noNotFoundChild);

  if (hasNotFound) {
    return {
      layouts: cleanLayouts,
      update: true
    };
  }

  return {
    layouts: cleanLayouts,
    update: false
  };
};

if (typeof window !== 'undefined') {
  Promise.resolve().then(function () { return require('./polyfill-1e83fa0f.js'); });
}

var LayoutContainer = function LayoutContainer(_a) {
  var data = _a.data,
      stableKey = _a.stableDataKey,
      layouts = _a.layouts,
      disableChange = _a.disableChange,
      isMobile = _a.isMobile,
      maxWidth = _a.maxWidth,
      ssr = _a.ssr,
      renderComponent = _a.renderComponent,
      onLayoutChange = _a.onLayoutChange,
      imageSizeFnLoader = _a.imageSizeFnLoader,
      imageCheckerFn = _a.imageCheckerFn,
      onImageResizeFinished = _a.onImageResizeFinished,
      onClickColumn = _a.onClickColumn,
      onClickSection = _a.onClickSection;
  var containeRef = React.useRef(null);

  var _b = React.useState(false),
      runChange = _b[0],
      setRunChange = _b[1];

  var _c = React.useState([]),
      actualLayout = _c[0],
      setActualLayout = _c[1];

  var isSectionContainer = useContainerIdentifier().isSectionContainer;

  var _d = React.useState(false),
      dragActive = _d[0],
      setDragActive = _d[1];

  var setCurrentLayouts = React.useContext(AppContext).setCurrentLayouts;

  var _e = React.useState([]),
      renderableLayout = _e[0],
      setRenderableLayout = _e[1];

  var _f = React.useState(),
      position = _f[0],
      setPosition = _f[1];

  var debounced = useSimpleDebounce(position, 500);
  React.useEffect(function () {
    var checkScroll = function checkScroll() {
      return __awaiter(void 0, void 0, void 0, function () {
        var winH, container;
        return __generator(this, function (_a) {
          winH = window.innerHeight;
          container = document.getElementById('container_layout_scroll');

          if (debounced) {
            if (debounced.y < 150 && container) {
              container.scroll({
                behavior: 'smooth',
                top: debounced.y - winH / 2,
                left: debounced.x
              });
            }

            if (debounced.y > winH - 150 && container) {
              container.scroll({
                behavior: 'smooth',
                top: debounced.y + winH / 2,
                left: debounced.x
              });
            }
          }

          return [2
          /*return*/
          ];
        });
      });
    };

    setTimeout(function () {
      checkScroll();
    }, 200);
  }, [debounced]);
  React.useEffect(function () {
    if (layouts && layouts.length > 0) {
      setActualLayout(layouts);
    }
  }, [layouts]);
  React.useEffect(function () {
    if (actualLayout.length > 0) {
      var cleanLayout = checkNotFoundData(actualLayout, data, stableKey);
      var renderable = createRenderableLayout(data, cleanLayout.layouts, stableKey);
      setCurrentLayouts(cleanLayout.layouts);
      setRenderableLayout(renderable);
    }
  }, [actualLayout, data]); // run layout update

  React.useEffect(function () {
    if (runChange) {
      onLayoutChange(actualLayout);
      setRunChange(false);
    }
  }, [runChange]);

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

  var getLayout = function getLayout() {
    if (!ssr) {
      return renderableLayout;
    }

    var cleanLayout = checkNotFoundData(layouts || [], data, stableKey);
    var renderable = createRenderableLayout(data, cleanLayout.layouts, stableKey);
    return renderable;
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "rlb-main-container m-auto",
    style: {
      maxWidth: maxWidth
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "min-h-[100px]",
    ref: containeRef,
    onDragOver: handleDragOverContainer,
    id: "layout_container"
  }, getLayout().map(function (section, sectionIndex) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      key: section.id,
      className: "rlb-section rlb-section-container"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "rlb-section-content",
      style: __assign({
        width: section.width,
        maxWidth: '100%',
        margin: 'auto'
      }, section.styles || {})
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: classnames(isSectionContainer(section) ? 'py-2' : '', section.className),
      onClick: function onClick(e) {
        return handleClickSection(section);
      }
    }, section.rows.map(function (row, rowIndex) {
      return /*#__PURE__*/React__default["default"].createElement(LayoutRowContainer, {
        isMobile: isMobile,
        key: row.id,
        stableKey: stableKey,
        dragActive: dragActive,
        layouts: actualLayout,
        columns: row.columns,
        sectionId: section.id,
        rowId: row.id,
        disabled: disableChange,
        isLastSection: renderableLayout.length === sectionIndex + 1,
        isFirstSection: sectionIndex === 0,
        needRowTarget: needRowTarget(renderableLayout, row, {
          rows: section.rows,
          sectionIndex: sectionIndex,
          rowIndex: rowIndex
        }),
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
      var _a;

      return createNewSection([(_a = dataItem[stableDataKey]) === null || _a === void 0 ? void 0 : _a.toString()], options === null || options === void 0 ? void 0 : options.isContainer, options === null || options === void 0 ? void 0 : options.width);
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

var changeSectionStyles = function changeSectionStyles(currentLayouts, sectionId, styles) {
  return currentLayouts.map(function (section) {
    if (section.id !== sectionId) return section;
    return __assign(__assign({}, section), styles);
  });
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
                var _a;

                if (dest.itemKey !== null && next.toString() === ((_a = dest.itemKey) === null || _a === void 0 ? void 0 : _a.toString())) {
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

var findSourceLayout = function findSourceLayout(layouts, itemId) {
  var source = {};
  var find = layouts.find(function (section) {
    var row = section.rows.find(function (row) {
      var cols = row.columns.find(function (col) {
        var isit = col.childIds.find(function (id) {
          return id.toString() === (itemId === null || itemId === void 0 ? void 0 : itemId.toString());
        });
        return isit;
      });
      source.columnId = cols === null || cols === void 0 ? void 0 : cols.id;
      return cols;
    });
    source.rowId = row === null || row === void 0 ? void 0 : row.id;
    return row;
  });
  source.sectionId = find === null || find === void 0 ? void 0 : find.id;
  if (!find) return;
  source.itemKey = itemId;
  if (!source.columnId || !source.sectionId || !source.rowId) return;
  return source;
};

var DraggableItem = function DraggableItem(_a) {
  var draggableId = _a.draggableId,
      children = _a.children;

  var _b = React.useContext(AppContext),
      currentLayouts = _b.currentLayouts,
      _onDragStart = _b.onDragStart,
      setSource = _b.setSource,
      setIsDragStart = _b.setIsDragStart;

  var draggableAttributes = {
    draggable: true,
    draggableid: draggableId,
    onDragStart: function onDragStart(e) {
      e.stopPropagation();

      _onDragStart(draggableId);

      setIsDragStart(true);
      var source = findSourceLayout(currentLayouts, draggableId);

      if (source) {
        setSource(source);
      }

      var div = document.querySelector("div[data-draggable-id=\"".concat(draggableId, "\"]"));
      var cloned = div === null || div === void 0 ? void 0 : div.cloneNode(true);
      cloned === null || cloned === void 0 ? void 0 : cloned.setAttribute('id', 'clonedElement');
      document.body.appendChild(cloned);
      e.dataTransfer.setDragImage(cloned, 0, 0);
    },
    onDragEnd: function onDragEnd(e) {
      e.preventDefault();
      e.stopPropagation();
      setIsDragStart(false);
      var el = document.getElementById('clonedElement');
      el === null || el === void 0 ? void 0 : el.remove();
    }
  };
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, children({
    draggableProps: draggableAttributes,
    handleProps: {}
  }));
};

var useContainerStyles = function useContainerStyles() {
  var changeSectionContainerStyles = function changeSectionContainerStyles(layouts, source, styles) {
    return layouts.map(function (layout) {
      if (layout.id === source.sectionId) {
        return __assign(__assign({}, layout), {
          styles: styles
        });
      }

      return layout;
    });
  };

  var changeColumnContainerStyles = function changeColumnContainerStyles(layouts, _a, styles) {
    var sectionId = _a.sectionId,
        rowId = _a.rowId,
        colId = _a.colId;
    return layouts.map(function (layout) {
      if (layout.id === sectionId) {
        return __assign(__assign({}, layout), {
          rows: layout.rows.map(function (row) {
            if (row.id === rowId) {
              return __assign(__assign({}, row), {
                columns: row.columns.map(function (col) {
                  if (col.id === colId) {
                    return __assign(__assign({}, col), {
                      styles: styles
                    });
                  }

                  return col;
                })
              });
            }

            return row;
          })
        });
      }

      return layout;
    });
  };

  return {
    changeSectionContainerStyles: changeSectionContainerStyles,
    changeColumnContainerStyles: changeColumnContainerStyles
  };
};

exports.AppContext = AppContext;
exports.DraggableItem = DraggableItem;
exports.LayoutContainer = LayoutContainer;
exports.LayoutProvider = LayoutProvider;
exports.addToItem = addToItem;
exports.addToRow = addToRow;
exports.changeSectionStyles = changeSectionStyles;
exports.createLayout = createLayout;
exports.createNewSection = createNewSection;
exports.removeItemFromLayout = removeItemFromSource;
exports.useContainerStyles = useContainerStyles;
