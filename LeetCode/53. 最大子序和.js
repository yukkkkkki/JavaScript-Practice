/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：暴力破解
// 从数组最左边开始于数组右边数据依次相加，将相加之后数据进行比较，比较之后最大值为最终结果
var maxSubArray = function (nums) {
  let sum = 0;
  let maxNumber = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      sum = 0;
      for (let k = i; k <= j; k++) {
        sum += nums[k];
      }
      if (sum > maxNumber) maxNumber = sum;
    }
  }
  return maxNumber;
};
// 时间复杂度：O(n^3); 空间复杂度：O(1)

// 方法二：动态规划法
// f(i)：以第 i 个数结尾的「连续子数组的最大和」
// 状态转移方程：f(i) = max{f(i−1) + nums[i]​, nums[i​]}
// 考虑到 f(i) 只和 f(i−1) 相关，于是我们可以只用一个变量 pre 来维护对于当前 f(i) 的 f(i−1) 的值是多少，从而让空间复杂度降低到 O(1)，这有点类似「滚动数组」的思想。
var maxSubArray = function (nums) {
  let dp = [];
  dp[0] = nums[0];
  let max = dp[0];

  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
    max = Math.max(dp[i], max);
  }

  return max;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)

// 动态规划降维
var maxSubArray = function (nums) {
  let res = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i - 1] > 0) nums[i] += nums[i - 1];
    res = Math.max(res, nums[i]);
  }
  return res;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
