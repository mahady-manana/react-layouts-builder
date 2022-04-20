export const gridValue = (m: number, n?: number) => {
  if (n === 0 || !n) {
    return undefined;
  }

  const q = n % m;

  const r = 20 - q;

  const f = r <= m / 2 ? n + r : n - q;
  return f;
};
