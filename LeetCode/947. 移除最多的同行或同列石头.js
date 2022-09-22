/**
 * @param {number[][]} stones
 * @return {number}
 */
// 方法一：深度优先搜索 DFS
// 把石子看作「点」，石子间的同行或同列关系看作「边」
// 如果两个石子同属某一行或某一列，我们就认为这两个石子之间有一条边
// 只需要统计整张图中有多少个极大连通子图
// 最终能够留下来的点的数量，即为连通块的数量
var removeStones = function (stones) {
  const n = stones.length;
  const vis = new Set();

  // 首先枚举计算任意两点间的连通性
  const edge = {};
  for (const [i, [x1, y1]] of stones.entries()) {
    for (const [j, [x2, y2]] of stones.entries()) {
      if (x1 === x2 || y1 === y2) {
        edge[i] ? edge[i].push(j) : (edge[i] = [j]);
      }
    }
  }

  // 计算连通块的数量
  const dfs = (x) => {
    vis.add(x);
    for (let y of edge[x]) {
      if (!vis.has(y)) dfs(y);
    }
  };

  let num = 0;
  for (let i = 0; i < n; i++) {
    if (!vis.has(i)) {
      num++;
      dfs(i);
    }
  }

  // 删去的点的最大数量 = 总点数 - 连通块的数量
  return n - num;
};
// 时间复杂度：O(n^2)
// 空间复杂度：O(n^2)
