var findWidthPercentByPx = function findWidthPercentByPx(initWidthPx, initWidthPrc, currentWidth) {
  var w = currentWidth * initWidthPrc / initWidthPx;

  if (w < 15) {
    return 15;
  }

  if (w > 85) {
    return 85;
  }

  return w;
};

export { findWidthPercentByPx };
