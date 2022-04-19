/**
 *
 * @param hex
 * @returns
 */

var isValidHex = function isValidHex(hex) {
  return /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hex);
};
/**
 *
 * @param st
 * @param chunkSize
 * @returns
 */


var getChunksFromString = function getChunksFromString(st, chunkSize) {
  return st.match(new RegExp(".{".concat(chunkSize, "}"), 'g'));
};
/**
 *
 * @param hexStr
 * @returns
 */


var convertHexUnitTo256 = function convertHexUnitTo256(hexStr) {
  return parseInt(hexStr.repeat(2 / hexStr.length), 16);
};
/**
 *
 * @param a ed
 *
 * @param alpha
 * @returns
 */


var getAlphafloat = function getAlphafloat(a, alpha) {
  if (typeof a !== 'undefined') {
    return a / 255;
  }

  if (typeof alpha != 'number' || alpha < 0 || alpha > 1) {
    return 1;
  }

  return alpha;
};
/**
 *
 * @param hex
 * @param alpha
 * @returns
 */


var hexToRGBA = function hexToRGBA(hex, alpha) {
  if (alpha === void 0) {
    alpha = undefined;
  }

  if (!isValidHex(hex)) {
    return getRgbaViaString(hex); // stringToRgba
  }

  var chunkSize = Math.floor((hex.length - 1) / 3);
  var hexArr = getChunksFromString(hex.slice(1), chunkSize);

  if (hexArr !== null) {
    var _a = hexArr.map(convertHexUnitTo256),
        r = _a[0],
        g = _a[1],
        b = _a[2],
        a = _a[3];

    return {
      r: r,
      g: g,
      b: b,
      a: getAlphafloat(a, alpha)
    };
  }

  chunkSize = Math.floor((hex.length - 1) / 3);
  hexArr = getChunksFromString(hex.slice(1), chunkSize);

  if (hexArr !== null) {
    var _b = hexArr.map(convertHexUnitTo256),
        r = _b[0],
        g = _b[1],
        b = _b[2],
        a = _b[3];

    return {
      r: r,
      g: g,
      b: b,
      a: getAlphafloat(a, alpha)
    };
  }

  return null;
};
/**
 *
 * @param color
 * @returns
 */

function RgbaToString(color) {
  if (!color) {
    return '';
  }

  return 'Rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + color.a + ')';
}
function getRgbaViaString(color) {
  var RgbaRg = /^Rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;

  if (!RgbaRg.test(color)) {
    return null;
  }

  var match = RgbaRg.exec(color);

  if (match === null) {
    return null;
  }

  return {
    r: parseInt(match[1]),
    g: parseInt(match[2]),
    b: parseInt(match[3]),
    a: parseFloat(match[4])
  };
}

function componentToHex(c) {
  var hex = c.toString(16);

  if (hex.length == 1) {
    return '0' + hex;
  } else {
    if (hex.length > 2) {
      return hex.substring(2, 4);
    }

    return hex;
  }
}
/**
 *
 * @param color
 * @returns
 */


function RgbaToHex(color) {
  var rgbCol = color;

  if (typeof color === 'string') {
    var strRgbCol = getRgbaViaString(color);

    if (strRgbCol === null) {
      return null;
    }

    rgbCol = strRgbCol;
  }

  rgbCol = rgbCol;
  return '#' + componentToHex(rgbCol.r) + componentToHex(rgbCol.g) + componentToHex(rgbCol.b) + componentToHex(rgbCol.a);
}

export { RgbaToHex, RgbaToString, getRgbaViaString, hexToRGBA };
