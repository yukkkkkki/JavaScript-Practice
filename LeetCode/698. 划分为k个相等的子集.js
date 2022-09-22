/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
// 方法一：状态压缩 + 记忆化搜索
var canPartitionKSubsets = function (nums, k) {
  const all = _.sum(nums);
  if (all % k !== 0) return false;
  let per = all / k;
  nums.sort((a, b) => a - b);
  let n = nums.length;
  if (nums[n - 1] > per) return false;
  const dp = new Array(1 << n).fill(true);

  const dfs = (s, p) => {
    if (s === 0) return true;
    if (!dp[s]) return dp[s];
    dp[s] = false;
    for (let i = 0; i < n; i++) {
      if (nums[i] + p > per) break;

      if (((s >> i) & 1) !== 0) {
        if (dfs(s ^ (1 << i), (p + nums[i]) % per)) {
          return true;
        }
      }
    }
    return false;
  };

  return dfs((1 << n) - 1, 0);
};
// 时间复杂度：O(n x 2^n)
// 空间复杂度：O(2^n)
