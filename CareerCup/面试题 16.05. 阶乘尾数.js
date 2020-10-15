// 设计一个算法，算出 n 阶乘有多少个尾随零。

// 示例 1:
// 输入: 3
// 输出: 0
// 解释: 3! = 6, 尾数中没有零。

// 示例 2:
// 输入: 5
// 输出: 1
// 解释: 5! = 120, 尾数中有 1 个零.
/**
 * @param {number} n
 * @return {number}
 */
// 方法一：数学方法
var trailingZeroes = function (n) {
  let count = 0;
  while (n >= 5) {
    n = n / 5;
    count += n | 0;
  }
  return count;
};

console.log(trailingZeroes(0));
