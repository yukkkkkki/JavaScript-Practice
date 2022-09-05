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
var longestUnivaluePath = function (root) {
  let res = 0; // 保存最长同值路径长度

  // 对根结点进行深度优先搜索
  // 对于当前搜索的结点 root，分别获取它左结点的最长同值有向路径长度 left，右结点的最长同值有向路径长度 right
  const dfs = (root) => {
    if (!root) return 0;

    let left = dfs(root.left);
    let right = dfs(root.right);
    let left1 = 0;
    let right1 = 0;

    if (root.left && root.left.val === root.val) {
      left1 = left + 1;
    }
    if (root.right && root.right.val === root.val) {
      right1 = right + 1;
    }

    res = Math.max(res, left1 + right1);
    return Math.max(left1, right1);
  };

  dfs(root);
  return res;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
