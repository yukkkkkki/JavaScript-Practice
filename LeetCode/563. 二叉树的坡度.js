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
// 方法一：深度优先搜索
// 递归出口：当前节点为空，返回 0
// 当前递归要做的事：求出当前树的坡度（左子树节点和 + 右子树节点和），累加到 res
var findTilt = function (root) {
  let result = 0;

  const dfs = (node) => {
    if (!node) return 0;

    const sumLeft = dfs(node.left);
    const sumRight = dfs(node.right);
    result += Math.abs(sumLeft - sumRight);
    return sumLeft + sumRight + node.val;
  };

  dfs(root);
  return result;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
