/**
 * @param {number} n
 * @return {number}
 */
// 一个数是好数：
// 数中没有出现 3, 4, 7;
// 数中至少出现一次 2 或 5 或 6 或 9；
// 对于 0, 1, 8 则没有要求。

const check = [0, 0, 1, -1, -1, 1, 1, -1, 0, 1];
var rotatedDigits = function (n) {
  let res = 0;

  for (let i = 1; i <= n; i++) {
    const num = "" + i;
    let valid = true;
    let diff = false;

    for (let j = 0; j < num.length; j++) {
      const ch = num[j];
      if (check[ch.charCodeAt() - "0".charCodeAt()] === -1) {
        valid = false;
      } else if (check[ch.charCodeAt() - "0".charCodeAt()] === 1) {
        diff = true;
      }
    }

    if (valid && diff) res++;
  }

  return res;
};
