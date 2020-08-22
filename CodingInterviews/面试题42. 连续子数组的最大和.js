// 面试题42. 连续子数组的最大和

// 输入一个整型数组，数组里有正数也有负数。数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。

// 要求时间复杂度为O(n)

// 示例1:
// 输入: nums = [-2,1,-3,4,-1,2,1,-5,4]
// 输出: 6
// 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。

// 动态规划
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
