/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
// 方法一：深度优先搜索 DFS
var makeConnected = function (n, connections) {
  if (connections.length < n - 1) return -1;

  const edges = new Map();
  for (const [x, y] of connections) {
    edges.get(x) ? edges.get(x).push(y) : edges.set(x, [y]);
    edges.get(y) ? edges.get(y).push(x) : edges.set(y, [x]);
  }
  const used = new Array(n).fill(0);

  const dfs = (i) => {
    used[i] = 1;
    if (edges.get(i)) {
      for (const v of edges.get(i)) {
        if (!used[v]) {
          dfs(v);
        }
      }
    }
  };

  let res = 0;
  for (let i = 0; i < n; i++) {
    if (!used[i]) {
      dfs(i);
      res++;
    }
  }
  return res - 1;
};
// 时间复杂度：O(n + m)
// 空间复杂度：O(n + m)
