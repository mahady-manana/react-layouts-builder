export const findWidthPercentByPx = (
  initWidthPx: number,
  initWidthPrc: number,
  currentWidth: number,
  multi?: boolean,
) => {
  const w = (currentWidth * initWidthPrc) / initWidthPx;
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
