import { EnumPosition } from '../interfaces/types.js';

var getCurrentHovered = function getCurrentHovered(clientX, clientY, containerRef, side) {
  var _a, _b, _c;

  var height = (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.offsetHeight;
  var width = (_b = containerRef.current) === null || _b === void 0 ? void 0 : _b.offsetWidth;
  var boundingClient = (_c = containerRef.current) === null || _c === void 0 ? void 0 : _c.getBoundingClientRect();

  if (!height || !width || !boundingClient) {
    return;
  }

  var demi = height / 2;
  var reference = clientY - boundingClient.top;
  var left = clientX - boundingClient.left;
  var spacing = width / 3;
  var shouldRight = width - left < spacing && width - left > 0;

  if (shouldRight && (side === null || side === void 0 ? void 0 : side.includes(EnumPosition.RIGHT))) {
    return EnumPosition.RIGHT;
  }

  if ((side === null || side === void 0 ? void 0 : side.includes(EnumPosition.LEFT)) && left < spacing && left > 0) {
    return EnumPosition.LEFT;
  }

  if ((side === null || side === void 0 ? void 0 : side.includes(EnumPosition.BOTTOM)) && reference > demi) return EnumPosition.BOTTOM;
  if ((side === null || side === void 0 ? void 0 : side.includes(EnumPosition.TOP)) && reference < demi) return EnumPosition.TOP;
};

export { getCurrentHovered };
