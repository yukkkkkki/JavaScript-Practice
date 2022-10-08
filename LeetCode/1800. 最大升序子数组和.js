/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：动态规划
// dp[i]：表示以 nums[i] 为结尾的最长升序子数组的元素和
// 当 nums[i] > nums[i - 1]，dp[i] = dp[i - 1] + nums[i]
// 当 nums[i] <= nums[i - 1]，dp[i] = nums[i]
var maxAscendingSum = function (nums) {
  let res = 0;
  let l = 0;

  while (l < nums.length) {
    let curSum = nums[l++];
    while (l < nums.length && nums[l] > nums[l - 1]) {
      curSum += nums[l++];
    }
    res = Math.max(res, curSum);
  }

  return res;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
