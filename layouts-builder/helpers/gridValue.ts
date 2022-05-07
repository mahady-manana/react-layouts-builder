export const gridValue = (coef: number, n?: number) => {
  if (n === 0 || !n) {
    return undefined;
  }

  const q = n % coef;

  const r = coef - q;

  const f = r <= coef / 2 ? n + r : n - q;
  return f;
};
