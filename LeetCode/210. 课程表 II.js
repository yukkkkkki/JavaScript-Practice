/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
// 拓扑排序
// 方法一：深度优先搜索 DFS
var findOrder = function (numCourses, prerequisites) {
  // 邻接链表
  const edges = {};
  for (let i = 0; i < numCourses; i++) {
    edges[i] = [];
  }
  for (var [first, second] of prerequisites) {
    edges[second].push(first);
  }

  let valid = true;
  const result = [];
  const visited = new Array(numCourses).fill(0);

  const dfs = (i) => {
    visited[i] = 1;

    for (let successor of edges[i]) {
      if (visited[successor] === 0) {
        dfs(successor);
      } else if (visited[successor] === 1) {
        valid = false;
      }
    }

    visited[i] = 2;
    result.unshift(i);
  };

  for (let i = 0; i < numCourses && valid; i++) {
    if (visited[i] === 0) dfs(i);
  }

  if (!valid) return [];
  return result;
};
