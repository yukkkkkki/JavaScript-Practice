/**
 * @param {number[][]} graph
 * @return {number[]}
 */
// 方法一：深度优先搜索 + 三色标记法
var eventualSafeNodes = function (graph) {
  const n = graph.length;
  const color = new Array(n).fill(0);
  const res = [];
  for (let i = 0; i < n; i++) {
    if (safe(graph, color, i)) {
      res.push(i);
    }
  }
  return res;
};
const safe = (graph, color, x) => {
  if (color[x] > 0) return color[x] === 2;

  color[x] = 1;
  for (const y of graph[x]) {
    if (!safe(graph, color, y)) {
      return false;
    }
  }

  color[x] = 2;
  return true;
};
// 时间复杂度：O(n + m)
// 空间复杂度：O(n)

// 方法二：拓扑排序
// 若一个节点没有出边，则该节点是安全的
// 若一个节点出边相连的点都是安全的，则该节点也是安全的
// 因此，可以将图中所有边反向，得到一个反图，然后在反图上运行拓扑排序
var eventualSafeNodes = function (graph) {
  // 首先得到反图 rg 及其入度数组 inDeg
  // 入度：有向图的某个顶点作为终点的次数和
  // 反向图中「入度」为 0 的点集 x，其实就是原图中「出度」为 0 的节点
  const n = graph.length;

  const rg = new Array(n).fill(0).map(() => new Array());
  const inDeg = new Array(n).fill(0); // 反图的入度数组
  for (let x = 0; x < n; x++) {
    for (let y of graph[x]) {
      rg[y].push(x);
    }
    inDeg[x] = graph[x].length;
  }

  // 将所有入度为 0 的点加入队列
  const queue = [];
  for (let i = 0; i < n; i++) {
    if (inDeg[i] === 0) {
      queue.push(i);
    }
  }
  while (queue.length) {
    // 然后不断取出队首元素
    const y = queue.shift();
    for (const x of rg[y]) {
      // 将其出边相连的点的入度减一
      if (--inDeg[x] === 0) {
        queue.push(x);
      }
    }
  }

  // 循环结束后，所有入度为 0 的节点均为安全的
  const res = [];
  for (let i = 0; i < n; i++) {
    if (inDeg[i] === 0) res.push(i);
  }
  return res;
};
// 时间复杂度：O(n + m)
// 空间复杂度：O(n + m)
