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
  let maxChildDepth = 0;

  while (queue.length) {
    let count = queue.length;
    while (count--) {
      let node = queue.shift();
      if (node.children.length > 0) {
        queue = queue.concat(node.children);
      }
    }
    maxChildDepth++;
  }
  return maxChildDepth;
};
// 时间复杂度：O(n)


// 方法一：深度优先遍历 DFS
// 在计算当前 N 叉树的最大深度时，可以先递归计算出其每个子树的最大深度
// 然后在 O(1) 的时间内计算出当前 N 叉树的最大深度。递归在访问到空节点时退出
var maxDepth = function (root) {
  if (!root) return 0;
  if (!root.children) return 1;

  let maxChildDepth = 0;
  for (let i = 0; i < root.children.length; i++) {
    let cur = maxDepth(root.children[i]);
    maxChildDepth = Math.max(maxChildDepth, cur);
  }

  return maxChildDepth + 1;
};
// 时间复杂度：O(n)
// 空间复杂度：O(height)
