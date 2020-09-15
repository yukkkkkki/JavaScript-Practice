// 给定一个整数数组，找出总和最大的连续数列，并返回总和。

// 示例：
// 输入： [-2,1,-3,4,-1,2,1,-5,4]
// 输出： 6
// 解释： 连续子数组 [4,-1,2,1] 的和最大，为 6。
/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一:动态规划
// 创建一个dp数组，里面保存着所有dp[i]的最大子序列和
// dp[i]的意思是以nums[i]为结束点的最大子序列和，
// 例如dp[3]的值为 [-2, 1, -3]的最大子序列和，为 -3 + 1 = -2
var maxSubArray = function (nums) {
  const n = nums.length;
  const dp = [];
  dp[0] = nums[0];
  dp[1] = nums[0];
  for (let i = 2; i <= n; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i - 1], nums[i - 1]);
  }
  return Math.max(...dp);
};

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
