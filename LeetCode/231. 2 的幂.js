/**
 * @param {number} n
 * @return {boolean}
 */
// 方法一：二进制表示
// n & (n - 1)：将 n 二进制表示的最低位 1 移除。如果 n 是正整数并且 n & (n - 1) = 0，那么 n 就是 2 的幂
var isPowerOfTwo = function (n) {
  return n > 0 && (n & (n - 1)) === 0;
};
// n & (-n)：直接获取 n 二进制表示的最低位的 1
var isPowerOfTwo = function (n) {
  return n > 0 && (n & -n) === 0;
};
