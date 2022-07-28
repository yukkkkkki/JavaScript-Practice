/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// 方法一：动态规划
// dp[i][j] 表示在数组 nums 的前 i 个数中选取元素，使得这些元素之和等于 j 的方案数
// if j < num，则不能选 num，dp[i][j] = dp[i - 1][j]
// if j >= num
//   - 选 num：dp[i][j] = dp[i - 1][j - num]
//   - 不选 num: dp[i][j] = dp[i - 1][j]
var findTargetSumWays = function (nums, target) {
  let sum = 0;
  for (const num of nums) {
    sum += num;
  }
  const diff = sum - target;
  if (diff < 0 || diff % 2 !== 0) return 0;

  const n = nums.length;
  const neg = diff / 2;
  const dp = new Array(n + 1).fill(0).map(() => new Array(neg + 1).fill(0));
  // 当没有任何元素可以选取时，元素和只能是 0，对应的方案数是 1
  dp[0][0] = 1;
  for (let i = 1; i <= n; i++) {
    const num = nums[i - 1];
    for (let j = 0; j <= neg; j++) {
      dp[i][j] = dp[i - 1][j];
      if (j >= num) {
        dp[i][j] += dp[i - 1][j - num];
      }
    }
  }

  return dp[n][neg];
};

// 优化：
// dp 的每一行的计算只和上一行有关，因此可以使用滚动数组的方式，去掉 dp 的第一个维度，将空间复杂度优化到 O(neg)
var findTargetSumWays = function (nums, target) {
  let sum = 0;
  for (const num of nums) {
    sum += num;
  }
  const diff = sum - target;
  if (diff < 0 || diff % 2 !== 0) return 0;

  const neg = diff / 2;
  const dp = new Array(neg + 1).fill(0);
  dp[0] = 1;
  for (const num of nums) {
    for (let j = neg; j >= num; j--) {
      dp[j] += dp[j - num];
    }
  }

  return dp[neg];
};
// 时间复杂度：O(n x (sum - target))
// 空间复杂度：O(sum - target)

// 方法二：回溯
var findTargetSumWays = function (nums, target) {
  let count = 0;

  const backTrack = (idx, sum) => {
    if (idx === nums.length) {
      if (sum === target) {
        count++;
      }
    } else {
      backTrack(idx + 1, sum + nums[idx]);
      backTrack(idx + 1, sum - nums[idx]);
    }
  };

  backTrack(0, 0);
  return count;
};
// 时间复杂度：O(n^2)
// 空间复杂度：O(n)
