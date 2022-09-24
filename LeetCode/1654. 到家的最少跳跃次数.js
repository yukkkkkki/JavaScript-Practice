/**
 * @param {number[]} forbidden
 * @param {number} a
 * @param {number} b
 * @param {number} x
 * @return {number}
 */
// 方法一：BFS
var minimumJumps = function (forbidden, a, b, x) {
  forbidden = new Set(forbidden);
  const queue = [[0, 0, false]];
  while (queue.length) {
    const [node, level, jumpLeft] = queue.shift();

    // 根据题意剪枝
    // 1. 不在forbidden(也可能是访问过的位置)
    // 2. 位置是负数时
    // 3. 位置大于等于 （x的最大值 + a的最大值 + b的最大值）时
    if (forbidden.has(node) || node < 0 || node > 5999) continue;

    forbidden.add(node);
    if (node === x) return level;

    if (!jumpLeft) queue.push([node - b, level + 1, true]);
    queue.push([node + a, level + 1, false]);
  }

  return -1;
};
// 作者：546641464
// 链接：https://leetcode.cn/problems/minimum-jumps-to-reach-home/solution/js-bfs-su-du-chao-100-by-546641464-knlf/
