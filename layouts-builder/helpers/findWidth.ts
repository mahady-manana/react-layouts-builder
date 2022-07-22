export const findWidthPercentByPx = (
  initWidthPx: number,
  initWidthPrc: number,
  currentWidth: number,
  multi?: boolean,
) => {
  const w = (currentWidth * initWidthPrc) / initWidthPx;
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
