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
 * @return {number}
 */
// 方法一：深度优先搜索 DFS
var diameterOfBinaryTree = function (root) {
  let res = 1;

  const depth = (node) => {
    if (node === null) return 0;

    let L = depth(node.left);
    let R = depth(node.right);
    res = Math.max(res, L + R + 1);

    return Math.max(L, R) + 1;
  };

  depth(root);
  return res - 1;
};
// 时间复杂度：O(n);
// 空间复杂度：O(height)
