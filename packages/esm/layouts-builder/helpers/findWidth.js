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

export { findWidthPercentByPx };
