// 给定一个由正整数组成且不存在重复数字的数组，找出和为给定目标正整数的组合的个数。

// 示例:
// nums = [1, 2, 3]
// target = 4

// 所有可能的组合为：
// (1, 1, 1, 1)
// (1, 1, 2)
// (1, 2, 1)
// (1, 3)
// (2, 1, 1)
// (2, 2)
// (3, 1)

// 请注意，顺序不同的序列被视作不同的组合。

// 因此输出为 7。
// 进阶：
// 如果给定的数组中含有负数会怎么样？
// 问题会产生什么变化？
// 我们需要在题目中添加什么限制来允许负数的出现？

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

// 方法一：动态规划
// 思路：
// dp[i] 对于给定的由正整数组成且不存在重复数字的数组，和为 i 的组合的个数
// 状态转移方程：dp[i] = sum(dp[i - num] for num in nums and if i >= num)
var combinationSum4 = function (nums, target) {
  const dp = new Array(target + 1).fill(0);
  dp[0] = 1;
  for (let i = 1; i <= target; i++) {
    for (let num of nums) {
      if (num <= i) {
        dp[i] += dp[i - num];
      }
    }
  }
  return dp[target];
};
console.log(combinationSum4([1, 2, 3], 4));
