/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
// 方法一：递归 深度优先搜索
var maxDepth = function (root) {
  if (!root) return 0;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};
// 时间复杂度：O(n)
// 空间复杂度：O(height)

// 方法二：迭代 广度优先搜索
var maxDepth = function (root) {
  if (!root) return 0;

  let queue = [root];
  let res = 0;
  while (queue.length) {
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      let node = queue.shift();
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    res += 1;
  }

  return res;
};
// 时间复杂度：O(n)
// 空间复杂度：最坏情况 O(n)
