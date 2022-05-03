export const findWidthPercentByPx = (
  initWidthPx: number,
  initWidthPrc: number,
  currentWidth: number,
) => {
  const w = (currentWidth * initWidthPrc) / initWidthPx;
  if (w < 15) {
    return 15;
  }
  if (w > 85) {
    return 85;
  }
  return w;
};
