// 节点间通路。给定有向图，设计一个算法，找出两个节点之间是否存在一条路径。

// 示例1:
//  输入：n = 3, graph = [[0, 1], [0, 2], [1, 2], [1, 2]], start = 0, target = 2
//  输出：true

// 示例2:
//  输入：n = 5, graph = [[0, 1], [0, 2], [0, 4], [0, 4], [0, 1], [1, 3], [1, 4], [1, 3], [2, 3], [3, 4]], start = 0, target = 4
//  输出 true

/**
 * @param {number} n
 * @param {number[][]} graph
 * @param {number} start
 * @param {number} target
 * @return {boolean}
 */

// 方法一：邻接表 + BFS
var findWhetherExistsPath = function (n, graph, start, target) {
  const record = {};
  graph.forEach(([start, end]) => {
    if (record[start]) record[start].add(end);
    else record[start] = new Set([end]);
  });
  const isVisited = {};
  const queue = [start];
  let i = queue.length,
    front;

  while (i) {
    while (i--) {
      front = queue.pop();
      if (front === target) return true;
      if (isVisited[front]) continue;
      isVisited[front] = true;
      if (record[front]) {
        for (let i of record[front]) {
          queue.unshift(i);
        }
      }
    }
    i = queue.length;
  }
  return false;
};
