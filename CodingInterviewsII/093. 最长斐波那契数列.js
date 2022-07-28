/**
 * @param {number[]} arr
 * @return {number}
 */
// 方法一：动态规划
// 如果数组 arr 中存在三个下标 i、j、k 满足 arr[i] > arr[j] > arr[k]，且 arr[k] + arr[j] = arr[i]
// 则 arr[k]、arr[j] 和 arr[i] 三个元素组成一个斐波那契式子序列
// 由于 arr 严格递增，所以 arr[i] > arr[j] > arr[k] 等价于 i > j > k

// dp[j][i]：以 arr[j] 和 arr[i] 作为最后两个数字的斐波那契子序列的最大长度
// 当 dp[k][j] < 3，dp[j][i] = 3 (以 arr[k] 和 arr[j] 作为最后两个数字的斐波那契式子序列并不存在，但是以 arr[j] 和 arr[i] 作为最后两个数字的斐波那契式子序列存在)
// 当 dp[k][j] ≥ 3 时，dp[j][i] = dp[k][j] + 1

// dp[j][i] = max(dp[k][j] + 1, 3), 0 <= k < j
// dp[j][i] = 0, k < 0 or k >= j
var lenLongestFibSubseq = function (arr) {
  const indices = new Map();
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    indices.set(arr[i], i);
  }

  const dp = new Array(n).fill(0).map(() => new Array(n).fill(0));
  let res = 0;

  for (let i = 0; i < n; i++) {
    for (let j = n - 1; j >= 0; j--) {
      if (arr[j] * 2 <= arr[i]) {
        break;
      }

      if (indices.has(arr[i] - arr[j])) {
        const k = indices.get(arr[i] - arr[j]);
        dp[j][i] = Math.max(dp[k][j] + 1, 3);
        res = Math.max(res, dp[j][i]);
      }
    }
  }

  return res;
};
// 时间复杂度：O(n^2)
// 空间复杂度：O(n^2)
