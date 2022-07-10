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
// 方法一：递归
var maxPathSum = function (root) {
  let maxSum = Number.MIN_SAFE_INTEGER;

  const dfs = (root) => {
    if (!root) return 0;

    const left = dfs(root.left); // 左子树提供的最大路径和
    const right = dfs(root.right); // 右子树提供的最大路径和
    // 当前子树内部的最大路径和
    const innerMaxSum = left + root.val + right;
    maxSum = Math.max(maxSum, innerMaxSum);
    // 当前子树对外提供的最大和
    const outputMaxSum = root.val + Math.max(0, left, right);
    return outputMaxSum < 0 ? 0 : outputMaxSum;
  };

  dfs(root);
  return maxSum;
};
// 时间复杂度：O(n)AA
// 空间复杂度：O(n)
