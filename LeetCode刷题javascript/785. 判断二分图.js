// 给定一个无向图graph，当这个图为二分图时返回true。

// 如果我们能将一个图的节点集合分割成两个独立的子集A和B，并使图中的每一条边的两个节点一个来自A集合，一个来自B集合，我们就将这个图称为二分图。

// graph将会以邻接表方式给出，graph[i]表示图中与节点i相连的所有节点。每个节点都是一个在0到graph.length-1之间的整数。这图中没有自环和平行边： graph[i] 中不存在i，并且graph[i]中没有重复的值。

// 示例 1:
// 输入: [[1,3], [0,2], [1,3], [0,2]]
// 输出: true
// 解释:
// 无向图如下:
// 0----1
// |    |
// |    |
// 3----2
// 我们可以将节点分成两组: {0, 2} 和 {1, 3}。

// 示例 2:
// 输入: [[1,2,3], [0,2], [0,1,3], [0,2]]
// 输出: false
// 解释:
// 无向图如下:
// 0----1
// | \  |
// |  \ |
// 3----2
// 我们不能将节点分割成两个独立的子集。

// 注意:
//     graph 的长度范围为 [1, 100]。
//     graph[i] 中的元素的范围为 [0, graph.length - 1]。
//     graph[i] 不会包含 i 或者有重复的值。
//     图是无向的: 如果j 在 graph[i]里边, 那么 i 也会在 graph[j]里边。

// 方法一
const isBipartite = (graph) => {
  const visited = new Array(graph.length); // undefined为未染色，1为蓝色，-1为黄色
  for (let i = 0; i < graph.length; i++) {
    // 遍历每个顶点
    if (visited[i]) continue; // 已经染了色的，跳过
    const queue = [i]; // 队列初始化推入顶点 i
    visited[i] = 1; // 染为蓝色
    while (queue.length) {
      // 遍历顶点 i 所有相邻的顶点
      const cur = queue.shift(); // 考察出列顶点
      const curColor = visited[cur]; // 出列顶点的颜色
      const neighborColor = -curColor; // 它的相邻顶点应该有的颜色
      for (let i = 0; i < graph[cur].length; i++) {
        // 给他们都上色
        const neighbor = graph[cur][i];
        if (visited[neighbor] == undefined) {
          // 还没上色
          visited[neighbor] = neighborColor; // 上色
          queue.push(neighbor); // 并推入队列
        } else if (visited[neighbor] != neighborColor) {
          // 染了，但不是对的颜色
          return false;
        }
      }
    }
  }
  return true; // 遍历完所有顶点，没有发现哪里不对
};
