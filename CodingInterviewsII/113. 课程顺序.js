/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
// 方法一：拓扑排序
// 一开始把入度为 0的推进队列，bfs，把出度边的入度-1，然后如果为0就进队列~
var findOrder = function (numCourses, prerequisites) {
  const map = new Map();
  // 存储每个节点的入度
  const inDegrees = new Array(numCourses).fill(0);
  for (const [a, b] of prerequisites) {
    if (map.get(b)) {
      map.get(b).push(a);
    } else {
      map.set(b, [a]);
    }

    inDegrees[a]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    // 将所有入度为 0 的节点放入队列中
    if (inDegrees[i] === 0) queue.push(i);
  }

  const res = [];
  while (queue.length) {
    let cur = queue.shift();
    res.push(cur);

    for (let next of map.get(cur) || []) {
      inDegrees[next]--;
      // 如果相邻节点 v 的入度为 0，就可以选 v 对应的课程了
      if (inDegrees[next] === 0) {
        queue.push(next);
      }
    }
  }

  return res.length === numCourses ? res : [];
};
// 时间复杂度：O(n + m)
// 空间复杂度：O(n + m)
