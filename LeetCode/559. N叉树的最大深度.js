// 给定一个 N 叉树，找到其最大深度。
// 最大深度是指从根节点到最远叶子节点的最长路径上的节点总数。

/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number}
 */
// 方法一：广度优先遍历 BFS
var maxDepth = function (root) {
  if (!root) return 0;
  let queue = [root];
  let level = 0;

  while (queue.length) {
    let count = queue.length;
    while (count--) {
      let node = queue.shift();
      if (node.children.length > 0) {
        queue = queue.concat(node.children);
      }
    }
    level++;
  }
  return level;
};

// 方法一：深度优先遍历 DFS
var maxDepth = function (root) {
  if (!root) return 0;
  if (!root.children) return 1;
  let level = 0;
  for (let i = 0; i < root.children.length; i++) {
    let cur = maxDepth(root.children[i]);
    level = Math.max(max, cur);
  }
  return level + 1;
};
