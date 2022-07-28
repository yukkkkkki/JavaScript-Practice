/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：动态规划
// 状态方程：dp[i] = max(dp[i − 2] + nums[i], dp[i − 1])
// 边界条件：
// dp[start] = nums[start] // 只有一间房屋，则偷窃该房屋
// dp[start + 1] = max(nums[start], nums[start + 1]) // 只有两间房屋，偷窃其中金额较高的房屋
var rob = function (nums) {
  const n = nums.length;
  if (n === 1) {
    return nums[0];
  } else if (n === 2) {
    return Math.max(nums[0], nums[1]);
  }

  return Math.max(robRange(nums, 0, n - 2), robRange(nums, 1, n - 1));
};

const robRange = (nums, start, end) => {
  let first = nums[start];
  let second = Math.max(nums[start], nums[start + 1]);

  for (let i = start + 2; i <= end; i++) {
    const tmp = second;
    second = Math.max(first + nums[i], second);
    first = tmp;
  }

  return second;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
