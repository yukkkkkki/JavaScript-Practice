/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
// 方法一：诸位颠倒
// 将 n 视作一个长为 32 的二进制串，从低位往高位枚举 n 的每一位，将其倒序添加到翻转结果 rev 中
var reverseBits = function (n) {
  let rev = 0;
  for (let i = 0; i < 32 && n > 0; i++) {
    rev |= (n & 1) << (31 - i);
    n >>>= 1;
  }
  return rev >>> 0;
};
// 时间复杂度：O(logn)
// 空间复杂度：O(1)
