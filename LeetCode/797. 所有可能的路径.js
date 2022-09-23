/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
// 方法一：深度优先搜索
// 从 0 号点出发，使用栈记录路径上的点
// 每次我们遍历到点 n-1，就将栈中记录的路径加入到答案中
var allPathsSourceTarget = function (graph) {
  const res = [];
  const n = graph.length - 1;

  const dfs = (path, x) => {
    if (x === n) {
      res.push(path.slice());
      return;
    }

    for (const y of graph[x]) {
      path.push(y);
      dfs(path, y);
      path.pop();
    }
  };

  dfs([0], 0);
  return res;
};
// 时间复杂度：O(n x 2^n)
// 空间复杂度：O(n)

// allPathsSourceTarget([[1, 2], [3], [3], []]);
