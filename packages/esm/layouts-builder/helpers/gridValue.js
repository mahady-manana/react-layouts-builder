var gridValue = function gridValue(m, n) {
  if (n === 0 || !n) {
    return undefined;
  }

  var q = n % m;
  var r = 20 - q;
  var f = r <= m / 2 ? n + r : n - q;
  return f;
};

export { gridValue };
