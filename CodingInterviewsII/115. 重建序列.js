/**
 * @param {number[]} nums
 * @param {number[][]} sequences
 * @return {boolean}
 */
// 方法一：拓扑排序
var sequenceReconstruction = function (nums, sequences) {
  const n = nums.length;
  const indegrees = new Array(n + 1).fill(0);
  const graph = new Array(n + 1).fill(0).map(() => new Set());

  for (const sequence of sequences) {
    const size = sequence.length;
    for (let i = 1; i < size; i++) {
      const prev = sequence[i - 1];
      const next = sequence[i];
      if (graph[prev].add(next)) {
        indegrees[next]++;
      }
    }
  }

  const queue = [];
  for (let i = 1; i <= n; i++) {
    if (indegrees[i] === 0) {
      queue.push(i);
    }
  }

  while (queue.length) {
    if (queue.length > 1) return false;

    const num = queue.shift();
    const set = graph[num];

    for (const next of set) {
      indegrees[next]--;
      if (indegrees[next] === 0) {
        queue.push(next);
      }
    }
  }

  return true;
};
// 时间复杂度：O(n + m)
// 空间复杂度：O(n + m)
