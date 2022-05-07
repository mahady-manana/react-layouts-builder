var gridValue = function gridValue(coef, n) {
  if (n === 0 || !n) {
    return undefined;
  }

  var q = n % coef;
  var r = coef - q;
  var f = r <= coef / 2 ? n + r : n - q;
  return f;
};

export { gridValue };
