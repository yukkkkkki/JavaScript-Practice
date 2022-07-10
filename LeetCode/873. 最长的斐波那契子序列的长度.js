/**
 * @param {number[]} arr
 * @return {number}
 */
// 方法一：动态规划
// 只有当 A[i] + A[j] == A[k] 时，两结点 (i, j) 和 (j, k) 才是连通的
// 设 longest[i, j] 是结束在 [i, j] 的最长路径
// 那么 如果 (i, j) 和 (j, k) 是连通的， longest[j, k] = longest[i, j] + 1。
var lenLongestFibSubseq = function (arr) {
  const n = arr.length;
  let map = new Map();
  for (let i = 0; i < n; i++) {
    map.set(arr[i], i);
  }

  const dp = new Array(n).fill(0).map(() => new Array(n).fill(0));
  let res = 2;

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      k = map.get(arr[i] - arr[j]);
      dp[i][j] = k < j ? dp[j][k] + 1 : 2;
      res = Math.max(res, dp[i][j]);
    }
  }

  return res >= 3 ? res : 0;
};
// 时间复杂度：O(n^2)
// 空间复杂度：O(nlogm) m 为 arr 中最大元素
