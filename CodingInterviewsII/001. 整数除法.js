/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
// 方法一：减法代替除法
var divide = function (a, b) {
  if (a === 0) return 0;
  if (a === -Math.pow(2, 31) && b === -1) {
    return Math.pow(2, 31) - 1;
  }

  // 判断结果正负号
  let help = a * b > 0 ? false : true;
  a = Math.abs(a);
  b = Math.abs(b);
  let len = 0;
  let sum = a;
  while (sum >= b) {
    sum -= b;
    len++;
  }

  return help ? -len : len;
};
