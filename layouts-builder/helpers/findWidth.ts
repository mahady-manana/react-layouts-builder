export const findWidthPercentByPx = (
  initWidthPx: number,
  initWidthPrc: number,
  currentWidth: number,
  multi?: boolean,
) => {
  const w = (currentWidth * initWidthPrc) / initWidthPx;
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
