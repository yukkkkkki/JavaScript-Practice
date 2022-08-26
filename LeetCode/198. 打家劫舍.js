/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：动态规划
// 偷窃第 k 间房屋，那么就不能偷窃第 k-1 间房屋，偷窃总金额为前 k-2 间房屋的最高总金额与第 k 间房屋的金额之和
// 不偷窃第 k 间房屋，偷窃总金额为前 k−1 间房屋的最高总金额
// dp[i] 前 i 间房屋能偷窃到的最高总金额
// 状态转移方程：dp[n] = MAX(dp[n - 1], dp[n - 2] + num[n])
var rob = function (nums) {
  const n = nums.length;
  if (n == 0) return 0;
  if (n === 1) return nums[0];

  const dp = new Array(n);
  // 只有一间房屋，则偷窃该房屋
  dp[0] = nums[0];
  // 只有两间房屋，选择其中金额较高的房屋进行偷窃
  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < n; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }

  return dp[n - 1];
};
// 时间复杂度：O(n)
// 时间复杂度：O(1)

// 方法二：动态规划降维
// 把 dp[i-1] 和 dp[i-2] 换成用两个数表示
var rob = function (nums) {
  const n = nums.length;
  if (n === 0) return 0;
  if (n === 1) return nums[0];

  let preMax = nums[0];
  let curMax = Math.max(nums[0], nums[1]);
  let res = curMax;

  for (let i = 2; i < n; i++) {
    let temp = curMax;
    curMax = Math.max(nums[i] + preMax, curMax);
    preMax = temp;
    res = Math.max(curMax, res);
  }
  return res;
};
