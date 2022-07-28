/**
 * @param {number[][]} graph
 * @return {boolean}
 */
// 方法一：DFS 深度优先搜索
// 遍历一遍图，一边遍历一边染色，看看能不能用两种颜色给所有节点染色，且相邻节点的颜色都不相同
var isBipartite = function (graph) {
  // 记录图是否符合二分图性质
  let ok = true;
  let n = graph.length;
  // 记录图中节点的颜色，false 和 true 代表两种不同颜色
  let color = new Array(n).fill(false);
  // 记录图中节点是否被访问过
  let visited = new Array(n).fill(false);

  const dfs = (graph, v) => {
    // 如果已经确定不是二分图了，就不用浪费时间再递归遍历了
    if (!ok) return;
    visited[v] = true;

    for (let w of graph[v]) {
      if (!visited[w]) {
        /**
         * 相邻节点 w 没有被访问过
         * 那么应该给节点 w 涂上和节点 v 不同的颜色
         */
        color[w] = !color[v];
        // 继续遍历 w
        dfs(graph, w);
      } else {
        /**
         * 相邻节点 w 已经被访问过
         * 根据 v 和 w 的颜色判断是否是二分图
         */
        if (color[w] == color[v]) {
          ok = false;
        }
      }
    }
  };

  // 因为图不一定是联通的，可能存在多个子图
  // 所以要把每个节点都作为起点进行一次遍历
  // 如果发现任何一个子图不是二分图，整幅图都不算二分图
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      dfs(graph, i);
    }
  }

  return ok;
};
// 时间复杂度：O(n + m)
// 空间复杂度：O(n)

// 方法二：BFS 广度优先搜索
var isBipartite = function (graph) {
  const n = graph.length;
  let ok = true; // 记录图是否符合二分图性质
  // 记录图中节点的颜色，false 和 true 代表两种不同颜色
  let color = new Array(n).fill(false);
  // 记录图中节点是否被访问过
  let visited = new Array(n).fill(false);

  const bfs = (graph, start) => {
    let queue = [start];
    visited[start] = true;

    while (queue.length && ok) {
      let v = queue.shift();
      // 从节点 v 向所有相邻节点扩散
      for (let w of graph[v]) {
        if (!visited[w]) {
          // 相邻节点 w 没有被访问过；那么应该给节点 w 涂上和节点 v 不同的颜色
          color[w] = !color[v];
          // 标记 w 节点，并放入队列
          visited[w] = true;
          queue.push(w);
        } else {
          // 相邻节点 w 已经被访问过，根据 v 和 w 的颜色判断是否是二分图；若相同，则此图不是二分图
          if (color[w] == color[v]) ok = false;
        }
      }
    }
  };

  for (let v = 0; v < n; v++) {
    if (!visited[v]) bfs(graph, v);
  }

  return ok;
};
// 时间复杂度：O(n + m)
// 空间复杂度：O(n)
