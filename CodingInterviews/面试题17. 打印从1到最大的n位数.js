/**
 * @param {number} n
 * @return {number[]}
 */
var printNumbers = function (n) {
  if (n === 0) return [];
  let result = [];
  for (let i = 1; i < Math.pow(10, n); i++) {
    result.push(i);
  }
  return result;
};

var printNumbers2 = function (n) {
  let max = 1;
  let x = 10;
  while (n) {
    if (n & 1) {
      max = max * x;
    }
    x = x * x;
    n = n >> 1;
  }

  const res = [];
  for (let i = 1; i < max; i++) {
    res.push(i);
  }
  return res;
};

var printNumbers3 = function (n) {
  const max = 10 ** n - 1;
  const res = [];
  for (let i = 1; i <= max; i++) {
    res.push(i);
  }
  return res;
};
