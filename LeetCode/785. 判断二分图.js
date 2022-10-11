/**
 * @param {number[][]} graph
 * @return {boolean}
 */
// 方法一：BFS
const isBipartite = (graph) => {
  const n = graph.length;
  const visited = new Array(n); // undefined为未染色，1为蓝色，-1为黄色

  // 遍历每个顶点
  for (let i = 0; i < n; i++) {
    if (visited[i]) continue; // 已经染了色的，跳过
    const queue = [i]; // 队列初始化推入顶点 i
    visited[i] = 1; // 染为蓝色

    while (queue.length) {
      // 遍历顶点 i 所有相邻的顶点
      const cur = queue.shift(); // 考察出列顶点
      const curColor = visited[cur]; // 出列顶点的颜色
      const neighborColor = -curColor; // 它的相邻顶点应该有的颜色

      for (let i = 0; i < graph[cur].length; i++) {
        const neighbor = graph[cur][i]; // 给他们都上色

        // 还没上色
        if (visited[neighbor] == undefined) {
          visited[neighbor] = neighborColor; // 上色
          queue.push(neighbor); // 并推入队列
        } else if (visited[neighbor] != neighborColor) {
          return false; // 染了，但不是对的颜色
        }
      }
    }
  }

  return true; // 遍历完所有顶点，没有发现哪里不对
};
