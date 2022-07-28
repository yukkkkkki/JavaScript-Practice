/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：动态规划
// dp[i] = max(dp[i − 2] + nums[i], dp[i − 1])
var rob = function (nums) {
  if (nums.length === 0) return 0;
  const n = nums.length;
  if (n === 1) return nums[0];

  const dp = new Array(n);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < n; i++) {
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
  }
  return dp[n - 1];
};

// 方法二：降维
var rob = function (nums) {
  if (nums.length === 0) return 0;
  const n = nums.length;
  if (n === 1) return nums[0];

  let first = nums[0];
  let second = Math.max(nums[0], nums[1]);
  for (let i = 2; i < n; i++) {
    let tmp = second;
    second = Math.max(first + nums[i], second);
    first = tmp;
  }

  return second;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
