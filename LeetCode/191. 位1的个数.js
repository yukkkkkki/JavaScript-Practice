/**
 * @param {number} n - a positive integer
 * @return {number}
 */
// 方法一：循环检查二进制位
var hammingWeight = function (n) {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    // 让 n 与 2^i 进行与运算，当且仅当 n 的第 i 位为 1 时，运算结果不为 00
    if ((n & (1 << i)) !== 0) {
      result++;
    }
  }
  return result;
};
// 时间复杂度：O(K) k 是 int 型的二进制位数
// 空间复杂度：O(1)

// 方法二：位运算优化
var hammingWeight = function (n) {
  let result = 0;
  while (n) {
    // n = n & (n - 1) 其运算结果恰为把 n 的二进制位中的最低位的 1 变为 0 之后的结果。
    n &= n - 1;
    result++;
  }
  return result;
};
// 时间复杂度：O(logn)
// 空间复杂度：O(1)
