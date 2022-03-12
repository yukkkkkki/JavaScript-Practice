/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
// 方法一：迭代
var searchBST = function (root, val) {
  while (root) {
    if (val === root.val) {
      return root;
    }
    root = val < root.val ? root.left : root.right;
  }
  return null;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
