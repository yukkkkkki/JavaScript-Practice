/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
// 方法一：动态规划
// dp[t][i] 表示通过恰好 t 次航班，从出发城市 src 到达城市 i 需要的最小花费
// dp[t][i] = min(dp[t - 1][j] + cost(j, i));  (j,i) ∈ flights
var findCheapestPrice = function (n, flights, src, dst, k) {
  const INF = 10000 * 101 + 1;
  const f = new Array(k + 2).fill(0).map(() => new Array(n).fill(INF));
  f[0][src] = 0;
  for (let t = 1; t <= k + 1; t++) {
    for (const flight of flights) {
      const j = flight[0];
      const i = flight[1];
      const cost = flight[2];

      f[t][i] = Math.min(f[t][i], f[t - 1][j] + cost);
    }
  }

  let res = INF;
  for (let t = 1; t <= k + 1; t++) {
    res = Math.min(res, f[t][dst]);
  }
  return res === INF ? -1 : res;
};

// 降维
var findCheapestPrice = function (n, flights, src, dst, k) {
  const INF = 10000 * 101 + 1;
  let f = new Array(n).fill(INF);
  f[src] = 0;
  let ans = INF;

  for (let t = 1; t <= k + 1; ++t) {
    const g = new Array(n).fill(INF);
    for (const flight of flights) {
      const j = flight[0];
      const i = flight[1];
      const cost = flight[2];
      g[i] = Math.min(g[i], f[j] + cost);
    }

    f = g;
    ans = Math.min(ans, f[dst]);
  }

  return ans == INF ? -1 : ans;
};
// 时间复杂度：O((m + n)k)
// 空间复杂度：O(nk)
