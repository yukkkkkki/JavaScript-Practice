/**
 * @param {number} n - a positive integer
 * @return {number}
 */
// 方法一：位运算
// (n - 1) & n 其预算结果恰为把 n 的二进制位中的最低位的 1 变为 0 之后的结果
var hammingWeight = function (n) {
  let count = 0;

  while (n) {
    count++;
    n = (n - 1) & n;
  }
  return count;
};
// 时间复杂度：O(logn)
// 空间复杂度：O(1)

// 方法二：循环检查给定整数 n 的二进制位的每一位是否为 1
var hammingWeight = function (n) {
  let count = 0;
  for (let i = 0; i < 32; i++) {
    if ((n & (1 << i)) !== 0) {
      count++;
    }
  }
  return count;
};
// 时间复杂度：O(k) k 是 int 型的二进制位数，k = 32
// 空间复杂度：O(1)
