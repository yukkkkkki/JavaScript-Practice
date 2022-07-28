/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
// 方法一：深度优先搜索 DFS
// 从 0 号点出发，使用栈记录路径上的点
// 每次我们遍历到点 n - 1，就将栈中记录的路径加入到答案中
var allPathsSourceTarget = function (graph) {
  const stack = [];
  const res = [];

  const dfs = (graph, x, n) => {
    if (x === n) {
      res.push(stack.slice());
      return;
    }

    for (const y of graph[x]) {
      stack.push(y);
      dfs(graph, y, n);
      stack.pop();
    }
  };

  stack.push(0);
  dfs(graph, 0, graph.length - 1);
  return res;
};
// 时间复杂度：O(n x 2^n)
// 空间复杂度：O(n)
