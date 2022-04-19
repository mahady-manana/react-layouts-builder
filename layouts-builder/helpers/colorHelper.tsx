import { Rgba } from 'layouts-builder/interface/internalType';

/**
 * validate if a string is a json
 *
 *
 * @param item
 *
 * @returns
 */
export const isJson = (item: string) => {
  try {
    let jsonVal = JSON.parse(item);
    return typeof jsonVal === 'object' && jsonVal !== null;
  } catch (e) {
    return false;
  }
};
/**
 *
 * @param hex
 * @returns
 */
const isValidHex = (hex: string) =>
  /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hex);
/**
 *
 * @param st
 * @param chunkSize
 * @returns
 */
const getChunksFromString = (st: string, chunkSize: number) =>
  st.match(new RegExp(`.{${chunkSize}}`, 'g'));
/**
 *
 * @param hexStr
 * @returns
 */
const convertHexUnitTo256 = (hexStr: string) =>
  parseInt(hexStr.repeat(2 / hexStr.length), 16);
/**
 *
 * @param a ed
 *
 * @param alpha
 * @returns
 */
const getAlphafloat = (
  a: number | undefined,
  alpha: number | undefined,
) => {
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
export const hexToRGBA = (
  hex: string,
  alpha: number | undefined = undefined,
): Rgba | null => {
  if (!isValidHex(hex)) {
    return getRgbaViaString(hex);
    // stringToRgba
  }

  let chunkSize = Math.floor((hex.length - 1) / 3);
  let hexArr = getChunksFromString(hex.slice(1), chunkSize);

  if (hexArr !== null) {
    const [r, g, b, a] = hexArr.map(convertHexUnitTo256);
    return { r: r, g: g, b: b, a: getAlphafloat(a, alpha) };
  }
  chunkSize = Math.floor((hex.length - 1) / 3);
  hexArr = getChunksFromString(hex.slice(1), chunkSize);
  if (hexArr !== null) {
    const [r, g, b, a] = hexArr.map(convertHexUnitTo256);
    return { r: r, g: g, b: b, a: getAlphafloat(a, alpha) };
  }
  return null;
};
/**
 *
 * @param color
 * @returns
 */
export function RgbaToString(color: Rgba | null) {
  if (!color) {
    return '';
  }
  return (
    'Rgba(' +
    color.r +
    ',' +
    color.g +
    ',' +
    color.b +
    ',' +
    color.a +
    ')'
  );
}
/**
 * this does not handle % alpha
 *
 * @param color
 * @returns
 */
export function stringToRgba(color: string): Rgba | null {
  let RgbaRg =
    /^Rgba\((\d{0,3}),(\d{0,3}),(\d{0,3}),([\d\.]{0,3})\)$/i;
  if (!RgbaRg.test(color)) {
    return null;
  }

  let match: Array<string> | null = RgbaRg.exec(color);
  if (match === null) {
    return null;
  }
  return {
    r: parseInt(match[1]),
    g: parseInt(match[2]),
    b: parseInt(match[3]),
    a: parseInt(match[4]),
  };
}

export function getRgbaViaString(color: string): Rgba | null {
  let RgbaRg =
    /^Rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;

  if (!RgbaRg.test(color)) {
    return null;
  }

  let match: Array<string> | null = RgbaRg.exec(color);
  if (match === null) {
    return null;
  }
  return {
    r: parseInt(match[1]),
    g: parseInt(match[2]),
    b: parseInt(match[3]),
    a: parseFloat(match[4]),
  };
}

function componentToHex(c: number) {
  let hex = c.toString(16);
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
export function RgbaToHex(color: string | Rgba): string | null {
  let rgbCol = color;
  if (typeof color === 'string') {
    let strRgbCol = getRgbaViaString(color);

    if (strRgbCol === null) {
      return null;
    }
    rgbCol = strRgbCol;
  }
  rgbCol = rgbCol as Rgba;

  return (
    '#' +
    componentToHex(rgbCol.r) +
    componentToHex(rgbCol.g) +
    componentToHex(rgbCol.b) +
    componentToHex(rgbCol.a)
  );
}

/**
 * function to test if the string is url (begin with https or http) then with ://
 *
 * @param {String} url
 * @returns
 */
export const isValidUrl = (url: string): boolean => {
  return /^(https|http):\/\//.test(url);
};

export const isSecuredUrl = (url: string): boolean => {
  return /^(https):\/\//.test(url);
};

export const isValidPathUrl = (urlPath: string): boolean => {
  return /[\w\d\-\/]+$/.test(urlPath);
};

/**
 * Check if valid email address.
 * @param email Email address to validate
 * @returns true: valid email, false: invalid email
 */
export function isValidEmail(email: string): boolean {
  const emailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return emailPattern.test(email);
}
