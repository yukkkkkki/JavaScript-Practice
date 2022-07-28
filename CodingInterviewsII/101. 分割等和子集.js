/**
 * @param {number[]} nums
 * @return {boolean}
 */
// 方法一：动态规划
// dp[i][j] 表示从数组的 [0, i] 下标范围内选取若干个正整数，是否存在一种选取方案使得被选取的正整数的和 === j

// 对于 i > 0 && j > 0：
// - 若 j >= nums[i]，nums[i] 可选也可不选，两种情况只要有一个为 true，就有 dp[i][j] = true
//   - 选，dp[i][j] = dp[i - 1][j]
//   - 不选，dp[i][j] = dp[i - 1][j - nums[i]]
// - 若 j < nums[i]，在选取的数字的和等于 j 的情况下无法选取当前的数字 nums[i]，因此 dp[i][j] = d[i - 1][j]
var canPartition = function (nums) {
  const n = nums.length;
  if (n < 2) return false;

  let sum = 0;
  let maxNum = 0;
  for (const num of nums) {
    sum += num;
    maxNum = maxNum > num ? maxNum : num;
  }
  if (sum & 1) return false;
  const target = Math.floor(sum / 2);
  if (maxNum > target) return false;

  const dp = new Array(n).fill(0).map(() => new Array(target + 1, false));
  // 边界情况：
  // 如果不选取任何正整数，则被选取的正整数等于 0
  // 因此对于 0 <= i < n，dp[i][0] = true
  for (let i = 0; i < n; i++) {
    dp[i][0] = true;
  }
  // 当 i == 0，只有一个正整数可以选取
  dp[0][nums[0]] = true;

  for (let i = 1; i < n; i++) {
    const num = nums[i];
    for (let j = 1; j <= target; j++) {
      if (j >= num) {
        dp[i][j] = dp[i - 1][j] | dp[i - 1][j - num];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  return dp[n - 1][target];
};

// 降维：
// dp[j] = dp[j] | dp[j - nums[i]]
var canPartition = function (nums) {
  const n = nums.length;
  if (n < 2) return false;
  let sum = 0;
  let maxNum = 0;
  for (const num of nums) {
    sum += num;
    maxNum = maxNum > num ? maxNum : num;
  }
  if (sum & 1) return false;
  const target = Math.floor(sum / 2);
  if (maxNum > target) return false;

  const dp = new Array(target + 1).fill(false);
  dp[0] = true;
  for (const num of nums) {
    for (let j = target; j >= num; j--) {
      dp[j] |= dp[j - num];
    }
  }

  return dp[target];
};
// 时间复杂度：O(n x target)
// 空间复杂度：O(targe)
