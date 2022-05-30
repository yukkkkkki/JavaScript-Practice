/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 方法一：层序遍历
var levelOrder = function (root) {
  if (!root) return [];

  const res = [];
  const queue = [root];

  while (queue.length) {
    const first = queue.shift();
    res.push(first.val);

    first.left && queue.push(first.left);
    first.right && queue.push(first.right);
  }
  return res;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
