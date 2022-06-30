/**
 * @param {number} n
 * @return {number[]}
 */
// 法一：Brian Kernighan 算法
// x = x & (x - 1) -> 将 x 的二进制表示的最后一个 1 变成 0
var countBits = function (n) {
  const bits = new Array(n + 1).fill(0);
  for (let i = 0; i <= n; i++) {
    bits[i] = countOnes(i);
  }
  return bits;
};
const countOnes = (x) => {
  let ones = 0;
  while (x > 0) {
    x &= x - 1;
    ones++;
  }
  return ones;
};
// 时间复杂度：O(nlogn)
// 空间复杂度：O(1)
