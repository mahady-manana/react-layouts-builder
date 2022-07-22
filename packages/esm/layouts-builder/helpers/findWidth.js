var findWidthPercentByPx = function findWidthPercentByPx(initWidthPx, initWidthPrc, currentWidth, multi) {
  var w = currentWidth * initWidthPrc / initWidthPx;

  if (multi && w < 5) {
    return 5;
  }

  if (multi && w > 95) {
    return 95;
  }

  if (w > 100) return 100;
  if (w < 5) return 5;
  return w;
};

export { findWidthPercentByPx };
