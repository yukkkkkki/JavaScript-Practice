/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：动态规划
// dp[i] 表示以第 i 个数结尾的「连续子数组的最大和」
// dp[0] = nums[0]
// if(nums[i] > 0) dp[i] = nums[i] + dp[i - 1];
// else dp[i] = nums[i]
var maxSubArray = function (nums) {
  var pre = nums[0];
  var max = nums[0];

  for (var i = 1; i < nums.length; i++) {
    pre = pre > 0 ? pre : 0;
    max = Math.max(max, pre + nums[i]);
    pre += nums[i];
  }

  return max;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)

// 改进
var maxSubArray = function (nums) {
  let res = nums[0];
  for (let i = 1; i < nums.length; ++i) {
    if (nums[i - 1] > 0) {
      nums[i] += nums[i - 1];
    }
    res = Math.max(res, nums[i]);
  }
  return res;
};

// reduce()
var maxSubArray = function (nums) {
  let max = -Infinity;
  nums.reduce((total, cur, i) => {
    if (total > 0) total += cur;
    else total = cur;
    max = max > total ? max : total;
    return total;
  }, 0);
  return max;
};
