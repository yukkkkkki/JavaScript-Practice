/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
// 方法一：递归
var myPow = function (x, n) {
  if (n === 0) return 1;
  if (n === 1) return x;
  if (n === -1) return 1 / x;

  if (n % 2 === 0) {
    // n 为偶数时，myPow(x, n) = myPow(x, n/2) * myPow(x, n/2)
    let a = myPow(x, n / 2);
    return a * a;
  } else {
    // n 为奇数时：myPow(x, n) = myPow(x, (n - 1) / 2) * myPow(x, (n - 1) / 2) * x
    let b = myPow(x, (n - 1) / 2);
    return b * b * x;
  }
};
