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
 * @return {TreeNode}
 */
// 方法一：反序中序遍历
// 反序中序遍历该二叉搜索树，记录过程中的节点值之和，并不断更新当前遍历到的节点的节点值
var convertBST = function (root) {
  let sum = 0;

  const dfs = (root) => {
    if (!root) return;
    dfs(root.right);
    sum += root.val;
    root.val = sum;
    dfs(root.left);
  };

  dfs(root);
  return root;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
