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

export { findWidthPercentByPx };
