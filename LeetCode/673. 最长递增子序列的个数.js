// 给定一个未排序的整数数组，找到最长递增子序列的个数。

// 示例 1:
// 输入: [1,3,5,4,7]
// 输出: 2
// 解释: 有两个最长递增子序列，分别是 [1, 3, 4, 7] 和[1, 3, 5, 7]。

// 示例 2:
// 输入: [2,2,2,2,2]
// 输出: 5
// 解释: 最长递增子序列的长度是1，并且存在5个子序列的长度为1，因此输出5。

/**
 * @param {number[]} nums
 * @return {number}
 */

//  方法一：动态规划
// 思路：
// 假设对于nums[i] 结尾的序列，最长序列的长度 lengths[i]，具有改长度的序列的 counts[i]
// 当 i < j，且 A[i] < A[j]，将一个 A[j] 附加到以 A[i] 结尾的最长子序列上
// 如果这些序列比 length[j] 长，那么我们就知道我们有counts[i] 个长度为 length 的序列。
// 如果这些序列的长度与 length[j] 相等，那么我们就知道现在有 counts[i] 个额外的序列（即 counts[j]+=counts[i]）
var findNumberOfLIS = function (nums) {
  const n = nums.length;
  if (n <= 1) return n;
  const dp = new Array(n).fill(0);
  const counts = new Array(n).fill(1);
  let max = 0,
    res = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        if (dp[j] + 1 > dp[i]) {
          dp[i] = dp[j] + 1;
          counts[i] = counts[j];
        } else if (dp[j] + 1 == dp[i]) {
          counts[i] += counts[j];
        }
      }
    }
    max = Math.max(max, dp[i]);
  }
  for (let k = 0; k < n; k++) {
    if (dp[k] == max) res += counts[k];
  }
  return res;
};
// 时间复杂度: O(n^2); 空间复杂度: O(n)

// console.log(findNumberOfLIS([2, 1]));
